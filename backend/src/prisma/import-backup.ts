import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import fs from 'node:fs'
import path from 'node:path'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaMariaDb(connectionString)
const prisma = new PrismaClient({ adapter })

async function main() {
    try {
        console.log('Checking if database already contains data...')
        
        // Check if there is already data in the users table to prevent double-importing
        const userCount = await prisma.user.count().catch(() => 0)
        if (userCount > 0) {
            console.log('Database already has data. Skipping backup import.')
            return
        }

        const backupPath = path.join(__dirname, '../../../my_database_backup.sql')
        if (!fs.existsSync(backupPath)) {
            console.log(`Backup file not found at ${backupPath}. Skipping import.`)
            return
        }

        console.log('Reading database backup file...')
        const sql = fs.readFileSync(backupPath, 'utf8')

        // Clean comments and format SQL statements
        console.log('Cleaning and parsing SQL statements...')
        const cleanSql = sql
            .split('\n')
            .filter((line) => {
                const trimmed = line.trim()
                return !trimmed.startsWith('--') && !trimmed.startsWith('#')
            })
            .join('\n')
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments

        const statements = cleanSql
            .split(';')
            .map((stmt) => stmt.trim())
            .filter((stmt) => {
                if (stmt.length === 0) return false
                const upper = stmt.toUpperCase()
                if (upper.startsWith('LOCK TABLES') || upper.startsWith('UNLOCK TABLES')) {
                    return false
                }
                if (upper.includes('INSERT INTO `_PRISMA_MIGRATIONS`') || upper.includes('INSERT INTO _PRISMA_MIGRATIONS')) {
                    return false
                }
                return true
            })

        // Column mappings corresponding to the layout of the SQL dump file.
        // This ensures compatibility even if columns are reordered or added by migrations.
        const tableColumns: Record<string, string[]> = {
            _CheckpointToVolunteer: ['A', 'B'],
            _PermissionToRole: ['A', 'B'],
            _StageToVolunteer: ['A', 'B'],
            addresses: ['id', 'street', 'address', 'city', 'state', 'zipCode', 'country_id', 'type'],
            age_categories: ['id', 'name', 'created_at', 'updated_at', 'deleted_at'],
            checkpoints: ['id', 'name', 'description', 'created_at', 'updated_at', 'deleted_at', 'stage_category_id', 'is_start', 'is_end'],
            companies: ['id', 'name', 'short_name', 'email', 'address_id', 'phone', 'vat_registered', 'pan_no', 'vat_no', 'image_id'],
            countries: ['id', 'name', 'abbr', 'code', 'created_at', 'updated_at'],
            event_runners: ['id', 'bib', 'created_at', 'updated_at', 'deleted_at', 'club_name', 'emergency_contact_name', 'emergency_contact_no', 'want_lunch', 'personal_id', 'event_id', 'stage_category_id', 'stage_id'],
            events: ['id', 'name', 'slug', 'start', 'end', 'excerpt', 'description', 'created_at', 'updated_at', 'deleted_at', 'image_id', 'map_file_id'],
            genders: ['id', 'name'],
            images: ['id', 'file_name', 'description', 'created_at', 'updated_at'],
            payments: ['id', 'amount', 'method', 'status', 'created_at', 'updated_at', 'deleted_at', 'stage_category_id', 'runner_id', 'image_id'],
            permissions: ['id', 'name', 'description', 'created_at', 'updated_at', 'deleted_at'],
            personals: ['id', 'first_name', 'middle_name', 'last_name', 'email', 'date_of_birth', 'phone_number', 'created_at', 'updated_at', 'deleted_at', 'country_id', 'age_category_id', 'size_id', 'image_id', 'gender_id'],
            ranks: ['id', 'position', 'runner_id', 'stage_category_id', 'gender_id', 'created_at'],
            roles: ['id', 'name', 'description', 'publish', 'created_at', 'updated_at', 'deleted_at'],
            sizes: ['id', 'name', 'description', 'created_at', 'updated_at', 'deleted_at'],
            stage_categories: ['id', 'name', 'excerpt', 'description', 'distance', 'difficulty', 'location', 'start', 'end', 'created_at', 'updated_at', 'deleted_at', 'bib_range', 'stage_id', 'map_file_id'],
            stage_category_payments: ['id', 'amount', 'description', 'created_at', 'updated_at', 'deleted_at', 'type', 'stage_category_id', 'image_id'],
            stages: ['id', 'name', 'excerpt', 'description', 'location', 'created_at', 'updated_at', 'deleted_at', 'event_id', 'image_id'],
            users: ['id', 'password', 'created_at', 'updated_at', 'deleted_at', 'personal_id', 'role_id', 'companyId'],
            volunteer_on_checkpoints: ['id', 'timer', 'volunteer_id', 'runner_id', 'checkpoint_id', 'created_at'],
            volunteers: ['id', 'description', 'created_at', 'updated_at', 'deleted_at', 'personal_id']
        };

        console.log(`Executing ${statements.length} SQL statements to import backup...`)
        
        // Run all statements in an interactive transaction to guarantee they share the same database connection session.
        await prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe("SET sql_mode = '';")
            await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;')
            
            for (let i = 0; i < statements.length; i++) {
                let statement = statements[i]
                
                // Rewrite INSERT statements to define column names explicitly to bypass column order/count mismatch issues
                const insertRegex = /^INSERT\s+INTO\s+[`"']?(\w+)[`"']?\s+VALUES/i
                const match = statement.match(insertRegex)
                if (match) {
                    const tableName = match[1]
                    const cols = tableColumns[tableName]
                    if (cols) {
                        const formattedCols = cols.map(c => `\`${c}\``).join(', ')
                        statement = statement.replace(
                            new RegExp(`(INSERT\\s+INTO\\s+[\`"']?${tableName}[\`"']?\\s+)VALUES`, 'i'),
                            `$1(${formattedCols}) VALUES`
                        )
                    }
                }

                try {
                    await tx.$executeRawUnsafe(statement)
                } catch (err) {
                    console.error(`Error executing statement ${i + 1}/${statements.length}:`, err.message)
                    console.error('Statement:', statement)
                    throw err
                }
            }

            await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;')
        }, {
            timeout: 60000 // 60 seconds timeout
        })

        console.log('Database backup imported successfully.')
    } catch (error) {
        console.error('Error importing backup:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
