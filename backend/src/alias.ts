import moduleAlias from 'module-alias'
import path from 'node:path'

// Register the @ alias dynamically to point to the current directory (src or dist/src)
moduleAlias.addAlias('@', __dirname)
