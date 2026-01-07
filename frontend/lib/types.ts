import * as Icons from 'lucide-vue-next'

export type Leaflet = typeof import('leaflet')

type APISort<T> = {
    order: "asc" | "desc"
    field: keyof typeof T
}

export const paymentMethods = ['PAY_AT_VENUE', 'QR'] as const
export const paymentTypes = ['NATIONAL', 'INTERNATIONAL'] as const
type AddressType = 'BILLING' | 'SHIPPING' | 'PERMANENT_ADDRESS'
type StageDifficulty = 'moderate' | 'easy' | 'difficult'
export type PaymentMethod = typeof paymentMethods[number]
export type PaymentType = typeof paymentTypes[number]
export const paymentStatus = ['PENDING', 'COMPLETED', 'FAILED'] as const
export type PaymentStatus = typeof paymentStatus[number]

export type APIQuery<T> = {
    s: string
    sort?: APISort<T>
}

export type APIParam = {
    total_page: number
    total: number
    current: number
    per_page: number
}

export type APIRequest<T> = APIParam & {
    data: T
}

export type Gender = {
    id: string
    name: string
}

export type Menu = {
    title: string
    slug: string
    icon?: keyof typeof Icons
    path: string
    hidden?: boolean
    disabled?: boolean
    role?: string
    permissions: string | string[]
    subMenu?: Menu[]
}

export type Personal = {
    id: string
    first_name?: string
    middle_name?: string
    last_name?: string
    email: string
    date_of_birth?: string
    gender_id: string
    phone_number?: string
    created_at: Date
    updated_at?: Date
    country_id?: string
    age_category_id?: string
    size_id?: string
    image_id?: string

    age_category: AgeCategory
    avatar: Image
    country: Country
    gender: Gender
    runners: EventRunner[]
    volunteers: Volunteer[]
    checkpoints: Checkpoint[]
}

export type AgeCategory = {
    id: string
    name: string
    created_at: Date
    updated_at?: Date
    personal: Personal[]
}

export type Image = {
    id: string
    file_name: string
    description: string
    created_at: Date
    updated_at?: Date
    personal: Personal[]
}

export type Country = {
    id: string
    name: string
    abbr: string
    code: string
    created_at: Date
    updated_at?: Date
}

export type TrailRace = {
    id: string
    name: string
    slug: string
    start: string
    end: string
    excerpt: string
    description: string
    created_at: string
    updated_at?: string
    deleted_at?: string
    image_id?: string
    thumbnail?: Image
    map_file_id?: string
    map_file?: Image
    volunteers: Volunteer[]
    checkpoints: Checkpoint[]
    stages: Stage[]
    runners: EventRunner[]
}

export type Checkpoint = {
    id: string
    name: string
    is_start: boolean
    is_end: boolean
    created_at: string
    updated_at: string
    deleted_at: string
    stage_id: string
    stage: Stage
    stage_category_id: string
    stage_category: StageCategory
    runners: EventRunner[]
    volunteers: Volunteer[]
    volunteer_on_checkpoints: VolunteerCheckpoint[]
}

export type Stage = {
    id: string
    name: string
    excerpt: string
    description: string
    distance: string
    difficulty: StageDifficulty
    location: string
    start: string
    end: string
    created_at: string
    updated_at: string
    deleted_at: string
    event_id: string
    event: TrailRace
    map_file_id: string
    map_file: Image
    image_id: string
    thumbnail: Image
    runners: EventRunner[]
    volunteers: Volunteer[]
    stage_categories: StageCategory[]
}

export type EventRunner = {
    id: string
    bib: string
    created_at: string
    updated_at: string
    deleted_at: string
    emergency_contact_name: string
    emergency_contact_no: string
    want_lunch: boolean
    personal_id: string
    club_name: string
    personal: Personal
    event: TrailRace
    stage_id: string
    stage: Stage
    tshirt_size: TShirtSize
    checkpoints: Checkpoint[]
    payments: Payment[]
    volunteer_on_checkpoints: VolunteerCheckpoint[]
    stage_category_id: string
    stage_category: StageCategory
}

export type Payment = {
    id: string
    amount: number
    method: PaymentMethod
    status: PaymentStatus
    created_at: string
    updated_at: string
    deleted_at: string
    runner_id: string
    runner: EventRunner
    stage_category_id: string
    stage_category: StageCategory
    image_id: string
    screenshot: Image
}

export type Volunteer = {
    id: string
    description: string
    created_at: string
    updated_at: string
    deleted_at: string
    personal_id: string
    personal: Personal
    checkpoints: Checkpoint[]
    stages: Stage[]
}

export type User = {
    id: string
    personal: Personal
    role: Role
}

export type Token = {
    accessToken: string
    refreshToken: string
}

export type Role = {
    id: string
    name: string
    description: string
    permissions: Permission[]
}

export type Permission = {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
    deleted_at: string
}

type Address = {
    id: string
    street: string
    address: string
    city: string
    state: string
    zipCode: string
    country_id: string
    country: Country
    type: AddressType
}

export type Company = {
    id: string
    short_name: string
    name: string
    address: Address
    email: string
    image_id: string
    logo: Image
    phone: string
    vat_registered: boolean
    pan_no: string
    vat_no: string
    users: User[]
}

export type TShirtSize = {
    id: string
    name: string
    created_at: string
    updated_at?: string
    deleted_at?: string
}

export type VolunteerCheckpoint = {
    id: string
    timer: string
    volunteer_id: string
    volunteer: Volunteer
    runner_id: string
    runner: EventRunner
    checkpoint_id: string
    checkpoint: Checkpoint
}

export type StageCategory = {
    id: string
    name: string
    excerpt: string
    description: string
    distance: string
    difficulty: string
    location: string
    start: string
    end: string
    bib_range: string
    created_at: string
    updated_at: string
    deleted_at: string
    stage_id: string
    stage: Stage
    map_file_id: string
    map_file: Image
    checkpoints: Checkpoint[]
    runners: EventRunner[]
    payment: StageCategoryPayment[]
    payments: Payment[]
}

export type Newsletter = {
    id: string
    email: string
    subscribed_at: string
    deleted_at?: string
    user_id?: string
    user?: Personal
}

export type Sponsor = {
    id: string
    name: string
    description: string
    url: string
    thumbnail_id: string
    thumbnail: Image
    created_at: string
    updated_at: string
    deleted_at: string
    event_id: string
    event: TrailRace
    sponsor_type_id: string
    sponsorType: SponsorType
}

export type SponsorType = {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
    deleted_at: string
    sponsors: Sponsor[]
}

export type StageCategoryPayment = {
    id: string
    amount: string
    type: PaymentType
    created_at: string
    updated_at: string
    deleted_at: string
    stage_category_id: string
    stage_category: StageCategory
    image_id: string
    screenshot: Image
}
