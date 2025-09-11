import * as Icons from 'lucide-vue-next'

export type Leaflet = typeof import('leaflet')

type APISort<T> = {
    order: "asc" | "desc"
    field: keyof typeof T
}

type AddressType = 'BILLING' | 'SHIPPING' | 'PERMANENT_ADDRESS'

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
    created_at: string
    updated_at: string
    deleted_at: string
    event_id: string
    event: TrailRace
    runners: EventRunner[]
}

export type Stage = {
    id: string
    name: string
    created_at: string
    updated_at: string
    deleted_at: string
    event_id: string
    event: TrailRace
    map_file_id: string
    map_file: Image
    runners: EventRunner[]
}

export type EventRunner = {}

export type Volunteer = {}

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
}

type Address = {
    id: string
    street: string
    address: string
    city: string
    state: string
    zipCode: string
    countryId: string
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