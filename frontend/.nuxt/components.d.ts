
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AuthUser': typeof import("../components/AuthUser.vue")['default']
    'DatePickerDup': typeof import("../components/DatePicker-dup.vue")['default']
    'DatePicker': typeof import("../components/DatePicker.vue")['default']
    'UserInfo': typeof import("../components/UserInfo.vue")['default']
    'Brand': typeof import("../components/brand.vue")['default']
    'Icon': typeof import("../components/icon.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'Badge': typeof import("../components/ui/badge/index")['Badge']
    'Avatar': typeof import("../components/ui/avatar/index")['Avatar']
    'AvatarFallback': typeof import("../components/ui/avatar/index")['AvatarFallback']
    'AvatarImage': typeof import("../components/ui/avatar/index")['AvatarImage']
    'Button': typeof import("../components/ui/button/index")['Button']
    'Calendar': typeof import("../components/ui/calendar/index")['Calendar']
    'CalendarCell': typeof import("../components/ui/calendar/index")['CalendarCell']
    'CalendarCellTrigger': typeof import("../components/ui/calendar/index")['CalendarCellTrigger']
    'CalendarGrid': typeof import("../components/ui/calendar/index")['CalendarGrid']
    'CalendarGridBody': typeof import("../components/ui/calendar/index")['CalendarGridBody']
    'CalendarGridHead': typeof import("../components/ui/calendar/index")['CalendarGridHead']
    'CalendarGridRow': typeof import("../components/ui/calendar/index")['CalendarGridRow']
    'CalendarHeadCell': typeof import("../components/ui/calendar/index")['CalendarHeadCell']
    'CalendarHeader': typeof import("../components/ui/calendar/index")['CalendarHeader']
    'CalendarHeading': typeof import("../components/ui/calendar/index")['CalendarHeading']
    'CalendarNextButton': typeof import("../components/ui/calendar/index")['CalendarNextButton']
    'CalendarPrevButton': typeof import("../components/ui/calendar/index")['CalendarPrevButton']
    'Checkbox': typeof import("../components/ui/checkbox/index")['Checkbox']
    'Combobox': typeof import("../components/ui/combobox/index")['Combobox']
    'ComboboxAnchor': typeof import("../components/ui/combobox/index")['ComboboxAnchor']
    'ComboboxEmpty': typeof import("../components/ui/combobox/index")['ComboboxEmpty']
    'ComboboxGroup': typeof import("../components/ui/combobox/index")['ComboboxGroup']
    'ComboboxInput': typeof import("../components/ui/combobox/index")['ComboboxInput']
    'ComboboxItem': typeof import("../components/ui/combobox/index")['ComboboxItem']
    'ComboboxItemIndicator': typeof import("../components/ui/combobox/index")['ComboboxItemIndicator']
    'ComboboxList': typeof import("../components/ui/combobox/index")['ComboboxList']
    'ComboboxSeparator': typeof import("../components/ui/combobox/index")['ComboboxSeparator']
    'ComboboxViewport': typeof import("../components/ui/combobox/index")['ComboboxViewport']
    'ComboboxCancel': typeof import("../components/ui/combobox/index")['ComboboxCancel']
    'ComboboxTrigger': typeof import("../components/ui/combobox/index")['ComboboxTrigger']
    'Dialog': typeof import("../components/ui/dialog/index")['Dialog']
    'DialogClose': typeof import("../components/ui/dialog/index")['DialogClose']
    'DialogContent': typeof import("../components/ui/dialog/index")['DialogContent']
    'DialogDescription': typeof import("../components/ui/dialog/index")['DialogDescription']
    'DialogFooter': typeof import("../components/ui/dialog/index")['DialogFooter']
    'DialogHeader': typeof import("../components/ui/dialog/index")['DialogHeader']
    'DialogOverlay': typeof import("../components/ui/dialog/index")['DialogOverlay']
    'DialogScrollContent': typeof import("../components/ui/dialog/index")['DialogScrollContent']
    'DialogTitle': typeof import("../components/ui/dialog/index")['DialogTitle']
    'DialogTrigger': typeof import("../components/ui/dialog/index")['DialogTrigger']
    'Input': typeof import("../components/ui/input/index")['Input']
    'Label': typeof import("../components/ui/label/index")['Label']
    'Menubar': typeof import("../components/ui/menubar/index")['Menubar']
    'MenubarCheckboxItem': typeof import("../components/ui/menubar/index")['MenubarCheckboxItem']
    'MenubarContent': typeof import("../components/ui/menubar/index")['MenubarContent']
    'MenubarGroup': typeof import("../components/ui/menubar/index")['MenubarGroup']
    'MenubarItem': typeof import("../components/ui/menubar/index")['MenubarItem']
    'MenubarLabel': typeof import("../components/ui/menubar/index")['MenubarLabel']
    'MenubarMenu': typeof import("../components/ui/menubar/index")['MenubarMenu']
    'MenubarRadioGroup': typeof import("../components/ui/menubar/index")['MenubarRadioGroup']
    'MenubarRadioItem': typeof import("../components/ui/menubar/index")['MenubarRadioItem']
    'MenubarSeparator': typeof import("../components/ui/menubar/index")['MenubarSeparator']
    'MenubarShortcut': typeof import("../components/ui/menubar/index")['MenubarShortcut']
    'MenubarSub': typeof import("../components/ui/menubar/index")['MenubarSub']
    'MenubarSubContent': typeof import("../components/ui/menubar/index")['MenubarSubContent']
    'MenubarSubTrigger': typeof import("../components/ui/menubar/index")['MenubarSubTrigger']
    'MenubarTrigger': typeof import("../components/ui/menubar/index")['MenubarTrigger']
    'DropdownMenu': typeof import("../components/ui/dropdown-menu/index")['DropdownMenu']
    'DropdownMenuCheckboxItem': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuCheckboxItem']
    'DropdownMenuContent': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuContent']
    'DropdownMenuGroup': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuGroup']
    'DropdownMenuItem': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuItem']
    'DropdownMenuLabel': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuLabel']
    'DropdownMenuRadioGroup': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioGroup']
    'DropdownMenuRadioItem': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioItem']
    'DropdownMenuSeparator': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSeparator']
    'DropdownMenuShortcut': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuShortcut']
    'DropdownMenuSub': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSub']
    'DropdownMenuSubContent': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubContent']
    'DropdownMenuSubTrigger': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubTrigger']
    'DropdownMenuTrigger': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuTrigger']
    'DropdownMenuPortal': typeof import("../components/ui/dropdown-menu/index")['DropdownMenuPortal']
    'NavigationMenu': typeof import("../components/ui/navigation-menu/index")['NavigationMenu']
    'NavigationMenuContent': typeof import("../components/ui/navigation-menu/index")['NavigationMenuContent']
    'NavigationMenuIndicator': typeof import("../components/ui/navigation-menu/index")['NavigationMenuIndicator']
    'NavigationMenuItem': typeof import("../components/ui/navigation-menu/index")['NavigationMenuItem']
    'NavigationMenuLink': typeof import("../components/ui/navigation-menu/index")['NavigationMenuLink']
    'NavigationMenuList': typeof import("../components/ui/navigation-menu/index")['NavigationMenuList']
    'NavigationMenuTrigger': typeof import("../components/ui/navigation-menu/index")['NavigationMenuTrigger']
    'NavigationMenuViewport': typeof import("../components/ui/navigation-menu/index")['NavigationMenuViewport']
    'Pagination': typeof import("../components/ui/pagination/index")['Pagination']
    'PaginationContent': typeof import("../components/ui/pagination/index")['PaginationContent']
    'PaginationEllipsis': typeof import("../components/ui/pagination/index")['PaginationEllipsis']
    'PaginationFirst': typeof import("../components/ui/pagination/index")['PaginationFirst']
    'PaginationItem': typeof import("../components/ui/pagination/index")['PaginationItem']
    'PaginationLast': typeof import("../components/ui/pagination/index")['PaginationLast']
    'PaginationNext': typeof import("../components/ui/pagination/index")['PaginationNext']
    'PaginationPrevious': typeof import("../components/ui/pagination/index")['PaginationPrevious']
    'Popover': typeof import("../components/ui/popover/index")['Popover']
    'PopoverAnchor': typeof import("../components/ui/popover/index")['PopoverAnchor']
    'PopoverContent': typeof import("../components/ui/popover/index")['PopoverContent']
    'PopoverTrigger': typeof import("../components/ui/popover/index")['PopoverTrigger']
    'Select': typeof import("../components/ui/select/index")['Select']
    'SelectContent': typeof import("../components/ui/select/index")['SelectContent']
    'SelectGroup': typeof import("../components/ui/select/index")['SelectGroup']
    'SelectItem': typeof import("../components/ui/select/index")['SelectItem']
    'SelectItemText': typeof import("../components/ui/select/index")['SelectItemText']
    'SelectLabel': typeof import("../components/ui/select/index")['SelectLabel']
    'SelectScrollDownButton': typeof import("../components/ui/select/index")['SelectScrollDownButton']
    'SelectScrollUpButton': typeof import("../components/ui/select/index")['SelectScrollUpButton']
    'SelectSeparator': typeof import("../components/ui/select/index")['SelectSeparator']
    'SelectTrigger': typeof import("../components/ui/select/index")['SelectTrigger']
    'SelectValue': typeof import("../components/ui/select/index")['SelectValue']
    'Separator': typeof import("../components/ui/separator/index")['Separator']
    'Sheet': typeof import("../components/ui/sheet/index")['Sheet']
    'SheetClose': typeof import("../components/ui/sheet/index")['SheetClose']
    'SheetContent': typeof import("../components/ui/sheet/index")['SheetContent']
    'SheetDescription': typeof import("../components/ui/sheet/index")['SheetDescription']
    'SheetFooter': typeof import("../components/ui/sheet/index")['SheetFooter']
    'SheetHeader': typeof import("../components/ui/sheet/index")['SheetHeader']
    'SheetTitle': typeof import("../components/ui/sheet/index")['SheetTitle']
    'SheetTrigger': typeof import("../components/ui/sheet/index")['SheetTrigger']
    'Sidebar': typeof import("../components/ui/sidebar/index")['Sidebar']
    'SidebarContent': typeof import("../components/ui/sidebar/index")['SidebarContent']
    'SidebarFooter': typeof import("../components/ui/sidebar/index")['SidebarFooter']
    'SidebarGroup': typeof import("../components/ui/sidebar/index")['SidebarGroup']
    'SidebarGroupAction': typeof import("../components/ui/sidebar/index")['SidebarGroupAction']
    'SidebarGroupContent': typeof import("../components/ui/sidebar/index")['SidebarGroupContent']
    'SidebarGroupLabel': typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']
    'SidebarHeader': typeof import("../components/ui/sidebar/index")['SidebarHeader']
    'SidebarInput': typeof import("../components/ui/sidebar/index")['SidebarInput']
    'SidebarInset': typeof import("../components/ui/sidebar/index")['SidebarInset']
    'SidebarMenu': typeof import("../components/ui/sidebar/index")['SidebarMenu']
    'SidebarMenuAction': typeof import("../components/ui/sidebar/index")['SidebarMenuAction']
    'SidebarMenuBadge': typeof import("../components/ui/sidebar/index")['SidebarMenuBadge']
    'SidebarMenuButton': typeof import("../components/ui/sidebar/index")['SidebarMenuButton']
    'SidebarMenuItem': typeof import("../components/ui/sidebar/index")['SidebarMenuItem']
    'SidebarMenuSkeleton': typeof import("../components/ui/sidebar/index")['SidebarMenuSkeleton']
    'SidebarMenuSub': typeof import("../components/ui/sidebar/index")['SidebarMenuSub']
    'SidebarMenuSubButton': typeof import("../components/ui/sidebar/index")['SidebarMenuSubButton']
    'SidebarMenuSubItem': typeof import("../components/ui/sidebar/index")['SidebarMenuSubItem']
    'SidebarProvider': typeof import("../components/ui/sidebar/index")['SidebarProvider']
    'SidebarRail': typeof import("../components/ui/sidebar/index")['SidebarRail']
    'SidebarSeparator': typeof import("../components/ui/sidebar/index")['SidebarSeparator']
    'SidebarTrigger': typeof import("../components/ui/sidebar/index")['SidebarTrigger']
    'Skeleton': typeof import("../components/ui/skeleton/index")['Skeleton']
    'Toaster': typeof import("../components/ui/sonner/index")['Toaster']
    'Stepper': typeof import("../components/ui/stepper/index")['Stepper']
    'StepperDescription': typeof import("../components/ui/stepper/index")['StepperDescription']
    'StepperIndicator': typeof import("../components/ui/stepper/index")['StepperIndicator']
    'StepperItem': typeof import("../components/ui/stepper/index")['StepperItem']
    'StepperSeparator': typeof import("../components/ui/stepper/index")['StepperSeparator']
    'StepperTitle': typeof import("../components/ui/stepper/index")['StepperTitle']
    'StepperTrigger': typeof import("../components/ui/stepper/index")['StepperTrigger']
    'Table': typeof import("../components/ui/table/index")['Table']
    'TableBody': typeof import("../components/ui/table/index")['TableBody']
    'TableCaption': typeof import("../components/ui/table/index")['TableCaption']
    'TableCell': typeof import("../components/ui/table/index")['TableCell']
    'TableEmpty': typeof import("../components/ui/table/index")['TableEmpty']
    'TableFooter': typeof import("../components/ui/table/index")['TableFooter']
    'TableHead': typeof import("../components/ui/table/index")['TableHead']
    'TableHeader': typeof import("../components/ui/table/index")['TableHeader']
    'TableRow': typeof import("../components/ui/table/index")['TableRow']
    'Tabs': typeof import("../components/ui/tabs/index")['Tabs']
    'TabsContent': typeof import("../components/ui/tabs/index")['TabsContent']
    'TabsList': typeof import("../components/ui/tabs/index")['TabsList']
    'TabsTrigger': typeof import("../components/ui/tabs/index")['TabsTrigger']
    'Textarea': typeof import("../components/ui/textarea/index")['Textarea']
    'Tooltip': typeof import("../components/ui/tooltip/index")['Tooltip']
    'TooltipContent': typeof import("../components/ui/tooltip/index")['TooltipContent']
    'TooltipProvider': typeof import("../components/ui/tooltip/index")['TooltipProvider']
    'TooltipTrigger': typeof import("../components/ui/tooltip/index")['TooltipTrigger']
    'AreaChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']
    'AreaStackedChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']
    'LineChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']
    'BarChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']
    'DonutChart': typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAuthUser': LazyComponent<typeof import("../components/AuthUser.vue")['default']>
    'LazyDatePickerDup': LazyComponent<typeof import("../components/DatePicker-dup.vue")['default']>
    'LazyDatePicker': LazyComponent<typeof import("../components/DatePicker.vue")['default']>
    'LazyUserInfo': LazyComponent<typeof import("../components/UserInfo.vue")['default']>
    'LazyBrand': LazyComponent<typeof import("../components/brand.vue")['default']>
    'LazyIcon': LazyComponent<typeof import("../components/icon.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyBadge': LazyComponent<typeof import("../components/ui/badge/index")['Badge']>
    'LazyAvatar': LazyComponent<typeof import("../components/ui/avatar/index")['Avatar']>
    'LazyAvatarFallback': LazyComponent<typeof import("../components/ui/avatar/index")['AvatarFallback']>
    'LazyAvatarImage': LazyComponent<typeof import("../components/ui/avatar/index")['AvatarImage']>
    'LazyButton': LazyComponent<typeof import("../components/ui/button/index")['Button']>
    'LazyCalendar': LazyComponent<typeof import("../components/ui/calendar/index")['Calendar']>
    'LazyCalendarCell': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarCell']>
    'LazyCalendarCellTrigger': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarCellTrigger']>
    'LazyCalendarGrid': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGrid']>
    'LazyCalendarGridBody': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGridBody']>
    'LazyCalendarGridHead': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGridHead']>
    'LazyCalendarGridRow': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGridRow']>
    'LazyCalendarHeadCell': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarHeadCell']>
    'LazyCalendarHeader': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarHeader']>
    'LazyCalendarHeading': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarHeading']>
    'LazyCalendarNextButton': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarNextButton']>
    'LazyCalendarPrevButton': LazyComponent<typeof import("../components/ui/calendar/index")['CalendarPrevButton']>
    'LazyCheckbox': LazyComponent<typeof import("../components/ui/checkbox/index")['Checkbox']>
    'LazyCombobox': LazyComponent<typeof import("../components/ui/combobox/index")['Combobox']>
    'LazyComboboxAnchor': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxAnchor']>
    'LazyComboboxEmpty': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxEmpty']>
    'LazyComboboxGroup': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxGroup']>
    'LazyComboboxInput': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxInput']>
    'LazyComboboxItem': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxItem']>
    'LazyComboboxItemIndicator': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxItemIndicator']>
    'LazyComboboxList': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxList']>
    'LazyComboboxSeparator': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxSeparator']>
    'LazyComboboxViewport': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxViewport']>
    'LazyComboboxCancel': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxCancel']>
    'LazyComboboxTrigger': LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxTrigger']>
    'LazyDialog': LazyComponent<typeof import("../components/ui/dialog/index")['Dialog']>
    'LazyDialogClose': LazyComponent<typeof import("../components/ui/dialog/index")['DialogClose']>
    'LazyDialogContent': LazyComponent<typeof import("../components/ui/dialog/index")['DialogContent']>
    'LazyDialogDescription': LazyComponent<typeof import("../components/ui/dialog/index")['DialogDescription']>
    'LazyDialogFooter': LazyComponent<typeof import("../components/ui/dialog/index")['DialogFooter']>
    'LazyDialogHeader': LazyComponent<typeof import("../components/ui/dialog/index")['DialogHeader']>
    'LazyDialogOverlay': LazyComponent<typeof import("../components/ui/dialog/index")['DialogOverlay']>
    'LazyDialogScrollContent': LazyComponent<typeof import("../components/ui/dialog/index")['DialogScrollContent']>
    'LazyDialogTitle': LazyComponent<typeof import("../components/ui/dialog/index")['DialogTitle']>
    'LazyDialogTrigger': LazyComponent<typeof import("../components/ui/dialog/index")['DialogTrigger']>
    'LazyInput': LazyComponent<typeof import("../components/ui/input/index")['Input']>
    'LazyLabel': LazyComponent<typeof import("../components/ui/label/index")['Label']>
    'LazyMenubar': LazyComponent<typeof import("../components/ui/menubar/index")['Menubar']>
    'LazyMenubarCheckboxItem': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarCheckboxItem']>
    'LazyMenubarContent': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarContent']>
    'LazyMenubarGroup': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarGroup']>
    'LazyMenubarItem': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarItem']>
    'LazyMenubarLabel': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarLabel']>
    'LazyMenubarMenu': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarMenu']>
    'LazyMenubarRadioGroup': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarRadioGroup']>
    'LazyMenubarRadioItem': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarRadioItem']>
    'LazyMenubarSeparator': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSeparator']>
    'LazyMenubarShortcut': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarShortcut']>
    'LazyMenubarSub': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSub']>
    'LazyMenubarSubContent': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSubContent']>
    'LazyMenubarSubTrigger': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSubTrigger']>
    'LazyMenubarTrigger': LazyComponent<typeof import("../components/ui/menubar/index")['MenubarTrigger']>
    'LazyDropdownMenu': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenu']>
    'LazyDropdownMenuCheckboxItem': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuCheckboxItem']>
    'LazyDropdownMenuContent': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuContent']>
    'LazyDropdownMenuGroup': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuGroup']>
    'LazyDropdownMenuItem': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuItem']>
    'LazyDropdownMenuLabel': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuLabel']>
    'LazyDropdownMenuRadioGroup': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioGroup']>
    'LazyDropdownMenuRadioItem': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioItem']>
    'LazyDropdownMenuSeparator': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSeparator']>
    'LazyDropdownMenuShortcut': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuShortcut']>
    'LazyDropdownMenuSub': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSub']>
    'LazyDropdownMenuSubContent': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubContent']>
    'LazyDropdownMenuSubTrigger': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubTrigger']>
    'LazyDropdownMenuTrigger': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuTrigger']>
    'LazyDropdownMenuPortal': LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuPortal']>
    'LazyNavigationMenu': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenu']>
    'LazyNavigationMenuContent': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuContent']>
    'LazyNavigationMenuIndicator': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuIndicator']>
    'LazyNavigationMenuItem': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuItem']>
    'LazyNavigationMenuLink': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuLink']>
    'LazyNavigationMenuList': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuList']>
    'LazyNavigationMenuTrigger': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuTrigger']>
    'LazyNavigationMenuViewport': LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuViewport']>
    'LazyPagination': LazyComponent<typeof import("../components/ui/pagination/index")['Pagination']>
    'LazyPaginationContent': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationContent']>
    'LazyPaginationEllipsis': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationEllipsis']>
    'LazyPaginationFirst': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationFirst']>
    'LazyPaginationItem': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationItem']>
    'LazyPaginationLast': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationLast']>
    'LazyPaginationNext': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationNext']>
    'LazyPaginationPrevious': LazyComponent<typeof import("../components/ui/pagination/index")['PaginationPrevious']>
    'LazyPopover': LazyComponent<typeof import("../components/ui/popover/index")['Popover']>
    'LazyPopoverAnchor': LazyComponent<typeof import("../components/ui/popover/index")['PopoverAnchor']>
    'LazyPopoverContent': LazyComponent<typeof import("../components/ui/popover/index")['PopoverContent']>
    'LazyPopoverTrigger': LazyComponent<typeof import("../components/ui/popover/index")['PopoverTrigger']>
    'LazySelect': LazyComponent<typeof import("../components/ui/select/index")['Select']>
    'LazySelectContent': LazyComponent<typeof import("../components/ui/select/index")['SelectContent']>
    'LazySelectGroup': LazyComponent<typeof import("../components/ui/select/index")['SelectGroup']>
    'LazySelectItem': LazyComponent<typeof import("../components/ui/select/index")['SelectItem']>
    'LazySelectItemText': LazyComponent<typeof import("../components/ui/select/index")['SelectItemText']>
    'LazySelectLabel': LazyComponent<typeof import("../components/ui/select/index")['SelectLabel']>
    'LazySelectScrollDownButton': LazyComponent<typeof import("../components/ui/select/index")['SelectScrollDownButton']>
    'LazySelectScrollUpButton': LazyComponent<typeof import("../components/ui/select/index")['SelectScrollUpButton']>
    'LazySelectSeparator': LazyComponent<typeof import("../components/ui/select/index")['SelectSeparator']>
    'LazySelectTrigger': LazyComponent<typeof import("../components/ui/select/index")['SelectTrigger']>
    'LazySelectValue': LazyComponent<typeof import("../components/ui/select/index")['SelectValue']>
    'LazySeparator': LazyComponent<typeof import("../components/ui/separator/index")['Separator']>
    'LazySheet': LazyComponent<typeof import("../components/ui/sheet/index")['Sheet']>
    'LazySheetClose': LazyComponent<typeof import("../components/ui/sheet/index")['SheetClose']>
    'LazySheetContent': LazyComponent<typeof import("../components/ui/sheet/index")['SheetContent']>
    'LazySheetDescription': LazyComponent<typeof import("../components/ui/sheet/index")['SheetDescription']>
    'LazySheetFooter': LazyComponent<typeof import("../components/ui/sheet/index")['SheetFooter']>
    'LazySheetHeader': LazyComponent<typeof import("../components/ui/sheet/index")['SheetHeader']>
    'LazySheetTitle': LazyComponent<typeof import("../components/ui/sheet/index")['SheetTitle']>
    'LazySheetTrigger': LazyComponent<typeof import("../components/ui/sheet/index")['SheetTrigger']>
    'LazySidebar': LazyComponent<typeof import("../components/ui/sidebar/index")['Sidebar']>
    'LazySidebarContent': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarContent']>
    'LazySidebarFooter': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarFooter']>
    'LazySidebarGroup': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroup']>
    'LazySidebarGroupAction': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupAction']>
    'LazySidebarGroupContent': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupContent']>
    'LazySidebarGroupLabel': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']>
    'LazySidebarHeader': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarHeader']>
    'LazySidebarInput': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarInput']>
    'LazySidebarInset': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarInset']>
    'LazySidebarMenu': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenu']>
    'LazySidebarMenuAction': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuAction']>
    'LazySidebarMenuBadge': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuBadge']>
    'LazySidebarMenuButton': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuButton']>
    'LazySidebarMenuItem': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuItem']>
    'LazySidebarMenuSkeleton': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSkeleton']>
    'LazySidebarMenuSub': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSub']>
    'LazySidebarMenuSubButton': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSubButton']>
    'LazySidebarMenuSubItem': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSubItem']>
    'LazySidebarProvider': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarProvider']>
    'LazySidebarRail': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarRail']>
    'LazySidebarSeparator': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarSeparator']>
    'LazySidebarTrigger': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarTrigger']>
    'LazySkeleton': LazyComponent<typeof import("../components/ui/skeleton/index")['Skeleton']>
    'LazyToaster': LazyComponent<typeof import("../components/ui/sonner/index")['Toaster']>
    'LazyStepper': LazyComponent<typeof import("../components/ui/stepper/index")['Stepper']>
    'LazyStepperDescription': LazyComponent<typeof import("../components/ui/stepper/index")['StepperDescription']>
    'LazyStepperIndicator': LazyComponent<typeof import("../components/ui/stepper/index")['StepperIndicator']>
    'LazyStepperItem': LazyComponent<typeof import("../components/ui/stepper/index")['StepperItem']>
    'LazyStepperSeparator': LazyComponent<typeof import("../components/ui/stepper/index")['StepperSeparator']>
    'LazyStepperTitle': LazyComponent<typeof import("../components/ui/stepper/index")['StepperTitle']>
    'LazyStepperTrigger': LazyComponent<typeof import("../components/ui/stepper/index")['StepperTrigger']>
    'LazyTable': LazyComponent<typeof import("../components/ui/table/index")['Table']>
    'LazyTableBody': LazyComponent<typeof import("../components/ui/table/index")['TableBody']>
    'LazyTableCaption': LazyComponent<typeof import("../components/ui/table/index")['TableCaption']>
    'LazyTableCell': LazyComponent<typeof import("../components/ui/table/index")['TableCell']>
    'LazyTableEmpty': LazyComponent<typeof import("../components/ui/table/index")['TableEmpty']>
    'LazyTableFooter': LazyComponent<typeof import("../components/ui/table/index")['TableFooter']>
    'LazyTableHead': LazyComponent<typeof import("../components/ui/table/index")['TableHead']>
    'LazyTableHeader': LazyComponent<typeof import("../components/ui/table/index")['TableHeader']>
    'LazyTableRow': LazyComponent<typeof import("../components/ui/table/index")['TableRow']>
    'LazyTabs': LazyComponent<typeof import("../components/ui/tabs/index")['Tabs']>
    'LazyTabsContent': LazyComponent<typeof import("../components/ui/tabs/index")['TabsContent']>
    'LazyTabsList': LazyComponent<typeof import("../components/ui/tabs/index")['TabsList']>
    'LazyTabsTrigger': LazyComponent<typeof import("../components/ui/tabs/index")['TabsTrigger']>
    'LazyTextarea': LazyComponent<typeof import("../components/ui/textarea/index")['Textarea']>
    'LazyTooltip': LazyComponent<typeof import("../components/ui/tooltip/index")['Tooltip']>
    'LazyTooltipContent': LazyComponent<typeof import("../components/ui/tooltip/index")['TooltipContent']>
    'LazyTooltipProvider': LazyComponent<typeof import("../components/ui/tooltip/index")['TooltipProvider']>
    'LazyTooltipTrigger': LazyComponent<typeof import("../components/ui/tooltip/index")['TooltipTrigger']>
    'LazyAreaChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']>
    'LazyAreaStackedChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']>
    'LazyLineChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']>
    'LazyBarChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']>
    'LazyDonutChart': LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AuthUser: typeof import("../components/AuthUser.vue")['default']
export const DatePickerDup: typeof import("../components/DatePicker-dup.vue")['default']
export const DatePicker: typeof import("../components/DatePicker.vue")['default']
export const UserInfo: typeof import("../components/UserInfo.vue")['default']
export const Brand: typeof import("../components/brand.vue")['default']
export const Icon: typeof import("../components/icon.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Badge: typeof import("../components/ui/badge/index")['Badge']
export const Avatar: typeof import("../components/ui/avatar/index")['Avatar']
export const AvatarFallback: typeof import("../components/ui/avatar/index")['AvatarFallback']
export const AvatarImage: typeof import("../components/ui/avatar/index")['AvatarImage']
export const Button: typeof import("../components/ui/button/index")['Button']
export const Calendar: typeof import("../components/ui/calendar/index")['Calendar']
export const CalendarCell: typeof import("../components/ui/calendar/index")['CalendarCell']
export const CalendarCellTrigger: typeof import("../components/ui/calendar/index")['CalendarCellTrigger']
export const CalendarGrid: typeof import("../components/ui/calendar/index")['CalendarGrid']
export const CalendarGridBody: typeof import("../components/ui/calendar/index")['CalendarGridBody']
export const CalendarGridHead: typeof import("../components/ui/calendar/index")['CalendarGridHead']
export const CalendarGridRow: typeof import("../components/ui/calendar/index")['CalendarGridRow']
export const CalendarHeadCell: typeof import("../components/ui/calendar/index")['CalendarHeadCell']
export const CalendarHeader: typeof import("../components/ui/calendar/index")['CalendarHeader']
export const CalendarHeading: typeof import("../components/ui/calendar/index")['CalendarHeading']
export const CalendarNextButton: typeof import("../components/ui/calendar/index")['CalendarNextButton']
export const CalendarPrevButton: typeof import("../components/ui/calendar/index")['CalendarPrevButton']
export const Checkbox: typeof import("../components/ui/checkbox/index")['Checkbox']
export const Combobox: typeof import("../components/ui/combobox/index")['Combobox']
export const ComboboxAnchor: typeof import("../components/ui/combobox/index")['ComboboxAnchor']
export const ComboboxEmpty: typeof import("../components/ui/combobox/index")['ComboboxEmpty']
export const ComboboxGroup: typeof import("../components/ui/combobox/index")['ComboboxGroup']
export const ComboboxInput: typeof import("../components/ui/combobox/index")['ComboboxInput']
export const ComboboxItem: typeof import("../components/ui/combobox/index")['ComboboxItem']
export const ComboboxItemIndicator: typeof import("../components/ui/combobox/index")['ComboboxItemIndicator']
export const ComboboxList: typeof import("../components/ui/combobox/index")['ComboboxList']
export const ComboboxSeparator: typeof import("../components/ui/combobox/index")['ComboboxSeparator']
export const ComboboxViewport: typeof import("../components/ui/combobox/index")['ComboboxViewport']
export const ComboboxCancel: typeof import("../components/ui/combobox/index")['ComboboxCancel']
export const ComboboxTrigger: typeof import("../components/ui/combobox/index")['ComboboxTrigger']
export const Dialog: typeof import("../components/ui/dialog/index")['Dialog']
export const DialogClose: typeof import("../components/ui/dialog/index")['DialogClose']
export const DialogContent: typeof import("../components/ui/dialog/index")['DialogContent']
export const DialogDescription: typeof import("../components/ui/dialog/index")['DialogDescription']
export const DialogFooter: typeof import("../components/ui/dialog/index")['DialogFooter']
export const DialogHeader: typeof import("../components/ui/dialog/index")['DialogHeader']
export const DialogOverlay: typeof import("../components/ui/dialog/index")['DialogOverlay']
export const DialogScrollContent: typeof import("../components/ui/dialog/index")['DialogScrollContent']
export const DialogTitle: typeof import("../components/ui/dialog/index")['DialogTitle']
export const DialogTrigger: typeof import("../components/ui/dialog/index")['DialogTrigger']
export const Input: typeof import("../components/ui/input/index")['Input']
export const Label: typeof import("../components/ui/label/index")['Label']
export const Menubar: typeof import("../components/ui/menubar/index")['Menubar']
export const MenubarCheckboxItem: typeof import("../components/ui/menubar/index")['MenubarCheckboxItem']
export const MenubarContent: typeof import("../components/ui/menubar/index")['MenubarContent']
export const MenubarGroup: typeof import("../components/ui/menubar/index")['MenubarGroup']
export const MenubarItem: typeof import("../components/ui/menubar/index")['MenubarItem']
export const MenubarLabel: typeof import("../components/ui/menubar/index")['MenubarLabel']
export const MenubarMenu: typeof import("../components/ui/menubar/index")['MenubarMenu']
export const MenubarRadioGroup: typeof import("../components/ui/menubar/index")['MenubarRadioGroup']
export const MenubarRadioItem: typeof import("../components/ui/menubar/index")['MenubarRadioItem']
export const MenubarSeparator: typeof import("../components/ui/menubar/index")['MenubarSeparator']
export const MenubarShortcut: typeof import("../components/ui/menubar/index")['MenubarShortcut']
export const MenubarSub: typeof import("../components/ui/menubar/index")['MenubarSub']
export const MenubarSubContent: typeof import("../components/ui/menubar/index")['MenubarSubContent']
export const MenubarSubTrigger: typeof import("../components/ui/menubar/index")['MenubarSubTrigger']
export const MenubarTrigger: typeof import("../components/ui/menubar/index")['MenubarTrigger']
export const DropdownMenu: typeof import("../components/ui/dropdown-menu/index")['DropdownMenu']
export const DropdownMenuCheckboxItem: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuCheckboxItem']
export const DropdownMenuContent: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuContent']
export const DropdownMenuGroup: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuGroup']
export const DropdownMenuItem: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuItem']
export const DropdownMenuLabel: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuLabel']
export const DropdownMenuRadioGroup: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioGroup']
export const DropdownMenuRadioItem: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioItem']
export const DropdownMenuSeparator: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSeparator']
export const DropdownMenuShortcut: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuShortcut']
export const DropdownMenuSub: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSub']
export const DropdownMenuSubContent: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubContent']
export const DropdownMenuSubTrigger: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubTrigger']
export const DropdownMenuTrigger: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuTrigger']
export const DropdownMenuPortal: typeof import("../components/ui/dropdown-menu/index")['DropdownMenuPortal']
export const NavigationMenu: typeof import("../components/ui/navigation-menu/index")['NavigationMenu']
export const NavigationMenuContent: typeof import("../components/ui/navigation-menu/index")['NavigationMenuContent']
export const NavigationMenuIndicator: typeof import("../components/ui/navigation-menu/index")['NavigationMenuIndicator']
export const NavigationMenuItem: typeof import("../components/ui/navigation-menu/index")['NavigationMenuItem']
export const NavigationMenuLink: typeof import("../components/ui/navigation-menu/index")['NavigationMenuLink']
export const NavigationMenuList: typeof import("../components/ui/navigation-menu/index")['NavigationMenuList']
export const NavigationMenuTrigger: typeof import("../components/ui/navigation-menu/index")['NavigationMenuTrigger']
export const NavigationMenuViewport: typeof import("../components/ui/navigation-menu/index")['NavigationMenuViewport']
export const Pagination: typeof import("../components/ui/pagination/index")['Pagination']
export const PaginationContent: typeof import("../components/ui/pagination/index")['PaginationContent']
export const PaginationEllipsis: typeof import("../components/ui/pagination/index")['PaginationEllipsis']
export const PaginationFirst: typeof import("../components/ui/pagination/index")['PaginationFirst']
export const PaginationItem: typeof import("../components/ui/pagination/index")['PaginationItem']
export const PaginationLast: typeof import("../components/ui/pagination/index")['PaginationLast']
export const PaginationNext: typeof import("../components/ui/pagination/index")['PaginationNext']
export const PaginationPrevious: typeof import("../components/ui/pagination/index")['PaginationPrevious']
export const Popover: typeof import("../components/ui/popover/index")['Popover']
export const PopoverAnchor: typeof import("../components/ui/popover/index")['PopoverAnchor']
export const PopoverContent: typeof import("../components/ui/popover/index")['PopoverContent']
export const PopoverTrigger: typeof import("../components/ui/popover/index")['PopoverTrigger']
export const Select: typeof import("../components/ui/select/index")['Select']
export const SelectContent: typeof import("../components/ui/select/index")['SelectContent']
export const SelectGroup: typeof import("../components/ui/select/index")['SelectGroup']
export const SelectItem: typeof import("../components/ui/select/index")['SelectItem']
export const SelectItemText: typeof import("../components/ui/select/index")['SelectItemText']
export const SelectLabel: typeof import("../components/ui/select/index")['SelectLabel']
export const SelectScrollDownButton: typeof import("../components/ui/select/index")['SelectScrollDownButton']
export const SelectScrollUpButton: typeof import("../components/ui/select/index")['SelectScrollUpButton']
export const SelectSeparator: typeof import("../components/ui/select/index")['SelectSeparator']
export const SelectTrigger: typeof import("../components/ui/select/index")['SelectTrigger']
export const SelectValue: typeof import("../components/ui/select/index")['SelectValue']
export const Separator: typeof import("../components/ui/separator/index")['Separator']
export const Sheet: typeof import("../components/ui/sheet/index")['Sheet']
export const SheetClose: typeof import("../components/ui/sheet/index")['SheetClose']
export const SheetContent: typeof import("../components/ui/sheet/index")['SheetContent']
export const SheetDescription: typeof import("../components/ui/sheet/index")['SheetDescription']
export const SheetFooter: typeof import("../components/ui/sheet/index")['SheetFooter']
export const SheetHeader: typeof import("../components/ui/sheet/index")['SheetHeader']
export const SheetTitle: typeof import("../components/ui/sheet/index")['SheetTitle']
export const SheetTrigger: typeof import("../components/ui/sheet/index")['SheetTrigger']
export const Sidebar: typeof import("../components/ui/sidebar/index")['Sidebar']
export const SidebarContent: typeof import("../components/ui/sidebar/index")['SidebarContent']
export const SidebarFooter: typeof import("../components/ui/sidebar/index")['SidebarFooter']
export const SidebarGroup: typeof import("../components/ui/sidebar/index")['SidebarGroup']
export const SidebarGroupAction: typeof import("../components/ui/sidebar/index")['SidebarGroupAction']
export const SidebarGroupContent: typeof import("../components/ui/sidebar/index")['SidebarGroupContent']
export const SidebarGroupLabel: typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']
export const SidebarHeader: typeof import("../components/ui/sidebar/index")['SidebarHeader']
export const SidebarInput: typeof import("../components/ui/sidebar/index")['SidebarInput']
export const SidebarInset: typeof import("../components/ui/sidebar/index")['SidebarInset']
export const SidebarMenu: typeof import("../components/ui/sidebar/index")['SidebarMenu']
export const SidebarMenuAction: typeof import("../components/ui/sidebar/index")['SidebarMenuAction']
export const SidebarMenuBadge: typeof import("../components/ui/sidebar/index")['SidebarMenuBadge']
export const SidebarMenuButton: typeof import("../components/ui/sidebar/index")['SidebarMenuButton']
export const SidebarMenuItem: typeof import("../components/ui/sidebar/index")['SidebarMenuItem']
export const SidebarMenuSkeleton: typeof import("../components/ui/sidebar/index")['SidebarMenuSkeleton']
export const SidebarMenuSub: typeof import("../components/ui/sidebar/index")['SidebarMenuSub']
export const SidebarMenuSubButton: typeof import("../components/ui/sidebar/index")['SidebarMenuSubButton']
export const SidebarMenuSubItem: typeof import("../components/ui/sidebar/index")['SidebarMenuSubItem']
export const SidebarProvider: typeof import("../components/ui/sidebar/index")['SidebarProvider']
export const SidebarRail: typeof import("../components/ui/sidebar/index")['SidebarRail']
export const SidebarSeparator: typeof import("../components/ui/sidebar/index")['SidebarSeparator']
export const SidebarTrigger: typeof import("../components/ui/sidebar/index")['SidebarTrigger']
export const Skeleton: typeof import("../components/ui/skeleton/index")['Skeleton']
export const Toaster: typeof import("../components/ui/sonner/index")['Toaster']
export const Stepper: typeof import("../components/ui/stepper/index")['Stepper']
export const StepperDescription: typeof import("../components/ui/stepper/index")['StepperDescription']
export const StepperIndicator: typeof import("../components/ui/stepper/index")['StepperIndicator']
export const StepperItem: typeof import("../components/ui/stepper/index")['StepperItem']
export const StepperSeparator: typeof import("../components/ui/stepper/index")['StepperSeparator']
export const StepperTitle: typeof import("../components/ui/stepper/index")['StepperTitle']
export const StepperTrigger: typeof import("../components/ui/stepper/index")['StepperTrigger']
export const Table: typeof import("../components/ui/table/index")['Table']
export const TableBody: typeof import("../components/ui/table/index")['TableBody']
export const TableCaption: typeof import("../components/ui/table/index")['TableCaption']
export const TableCell: typeof import("../components/ui/table/index")['TableCell']
export const TableEmpty: typeof import("../components/ui/table/index")['TableEmpty']
export const TableFooter: typeof import("../components/ui/table/index")['TableFooter']
export const TableHead: typeof import("../components/ui/table/index")['TableHead']
export const TableHeader: typeof import("../components/ui/table/index")['TableHeader']
export const TableRow: typeof import("../components/ui/table/index")['TableRow']
export const Tabs: typeof import("../components/ui/tabs/index")['Tabs']
export const TabsContent: typeof import("../components/ui/tabs/index")['TabsContent']
export const TabsList: typeof import("../components/ui/tabs/index")['TabsList']
export const TabsTrigger: typeof import("../components/ui/tabs/index")['TabsTrigger']
export const Textarea: typeof import("../components/ui/textarea/index")['Textarea']
export const Tooltip: typeof import("../components/ui/tooltip/index")['Tooltip']
export const TooltipContent: typeof import("../components/ui/tooltip/index")['TooltipContent']
export const TooltipProvider: typeof import("../components/ui/tooltip/index")['TooltipProvider']
export const TooltipTrigger: typeof import("../components/ui/tooltip/index")['TooltipTrigger']
export const AreaChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']
export const AreaStackedChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']
export const LineChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']
export const BarChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']
export const DonutChart: typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAuthUser: LazyComponent<typeof import("../components/AuthUser.vue")['default']>
export const LazyDatePickerDup: LazyComponent<typeof import("../components/DatePicker-dup.vue")['default']>
export const LazyDatePicker: LazyComponent<typeof import("../components/DatePicker.vue")['default']>
export const LazyUserInfo: LazyComponent<typeof import("../components/UserInfo.vue")['default']>
export const LazyBrand: LazyComponent<typeof import("../components/brand.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../components/icon.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyBadge: LazyComponent<typeof import("../components/ui/badge/index")['Badge']>
export const LazyAvatar: LazyComponent<typeof import("../components/ui/avatar/index")['Avatar']>
export const LazyAvatarFallback: LazyComponent<typeof import("../components/ui/avatar/index")['AvatarFallback']>
export const LazyAvatarImage: LazyComponent<typeof import("../components/ui/avatar/index")['AvatarImage']>
export const LazyButton: LazyComponent<typeof import("../components/ui/button/index")['Button']>
export const LazyCalendar: LazyComponent<typeof import("../components/ui/calendar/index")['Calendar']>
export const LazyCalendarCell: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarCell']>
export const LazyCalendarCellTrigger: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarCellTrigger']>
export const LazyCalendarGrid: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGrid']>
export const LazyCalendarGridBody: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGridBody']>
export const LazyCalendarGridHead: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGridHead']>
export const LazyCalendarGridRow: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarGridRow']>
export const LazyCalendarHeadCell: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarHeadCell']>
export const LazyCalendarHeader: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarHeader']>
export const LazyCalendarHeading: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarHeading']>
export const LazyCalendarNextButton: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarNextButton']>
export const LazyCalendarPrevButton: LazyComponent<typeof import("../components/ui/calendar/index")['CalendarPrevButton']>
export const LazyCheckbox: LazyComponent<typeof import("../components/ui/checkbox/index")['Checkbox']>
export const LazyCombobox: LazyComponent<typeof import("../components/ui/combobox/index")['Combobox']>
export const LazyComboboxAnchor: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxAnchor']>
export const LazyComboboxEmpty: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxEmpty']>
export const LazyComboboxGroup: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxGroup']>
export const LazyComboboxInput: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxInput']>
export const LazyComboboxItem: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxItem']>
export const LazyComboboxItemIndicator: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxItemIndicator']>
export const LazyComboboxList: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxList']>
export const LazyComboboxSeparator: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxSeparator']>
export const LazyComboboxViewport: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxViewport']>
export const LazyComboboxCancel: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxCancel']>
export const LazyComboboxTrigger: LazyComponent<typeof import("../components/ui/combobox/index")['ComboboxTrigger']>
export const LazyDialog: LazyComponent<typeof import("../components/ui/dialog/index")['Dialog']>
export const LazyDialogClose: LazyComponent<typeof import("../components/ui/dialog/index")['DialogClose']>
export const LazyDialogContent: LazyComponent<typeof import("../components/ui/dialog/index")['DialogContent']>
export const LazyDialogDescription: LazyComponent<typeof import("../components/ui/dialog/index")['DialogDescription']>
export const LazyDialogFooter: LazyComponent<typeof import("../components/ui/dialog/index")['DialogFooter']>
export const LazyDialogHeader: LazyComponent<typeof import("../components/ui/dialog/index")['DialogHeader']>
export const LazyDialogOverlay: LazyComponent<typeof import("../components/ui/dialog/index")['DialogOverlay']>
export const LazyDialogScrollContent: LazyComponent<typeof import("../components/ui/dialog/index")['DialogScrollContent']>
export const LazyDialogTitle: LazyComponent<typeof import("../components/ui/dialog/index")['DialogTitle']>
export const LazyDialogTrigger: LazyComponent<typeof import("../components/ui/dialog/index")['DialogTrigger']>
export const LazyInput: LazyComponent<typeof import("../components/ui/input/index")['Input']>
export const LazyLabel: LazyComponent<typeof import("../components/ui/label/index")['Label']>
export const LazyMenubar: LazyComponent<typeof import("../components/ui/menubar/index")['Menubar']>
export const LazyMenubarCheckboxItem: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarCheckboxItem']>
export const LazyMenubarContent: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarContent']>
export const LazyMenubarGroup: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarGroup']>
export const LazyMenubarItem: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarItem']>
export const LazyMenubarLabel: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarLabel']>
export const LazyMenubarMenu: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarMenu']>
export const LazyMenubarRadioGroup: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarRadioGroup']>
export const LazyMenubarRadioItem: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarRadioItem']>
export const LazyMenubarSeparator: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSeparator']>
export const LazyMenubarShortcut: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarShortcut']>
export const LazyMenubarSub: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSub']>
export const LazyMenubarSubContent: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSubContent']>
export const LazyMenubarSubTrigger: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarSubTrigger']>
export const LazyMenubarTrigger: LazyComponent<typeof import("../components/ui/menubar/index")['MenubarTrigger']>
export const LazyDropdownMenu: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenu']>
export const LazyDropdownMenuCheckboxItem: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuCheckboxItem']>
export const LazyDropdownMenuContent: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuContent']>
export const LazyDropdownMenuGroup: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuGroup']>
export const LazyDropdownMenuItem: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuItem']>
export const LazyDropdownMenuLabel: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuLabel']>
export const LazyDropdownMenuRadioGroup: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioGroup']>
export const LazyDropdownMenuRadioItem: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuRadioItem']>
export const LazyDropdownMenuSeparator: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSeparator']>
export const LazyDropdownMenuShortcut: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuShortcut']>
export const LazyDropdownMenuSub: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSub']>
export const LazyDropdownMenuSubContent: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubContent']>
export const LazyDropdownMenuSubTrigger: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuSubTrigger']>
export const LazyDropdownMenuTrigger: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuTrigger']>
export const LazyDropdownMenuPortal: LazyComponent<typeof import("../components/ui/dropdown-menu/index")['DropdownMenuPortal']>
export const LazyNavigationMenu: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenu']>
export const LazyNavigationMenuContent: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuContent']>
export const LazyNavigationMenuIndicator: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuIndicator']>
export const LazyNavigationMenuItem: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuItem']>
export const LazyNavigationMenuLink: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuLink']>
export const LazyNavigationMenuList: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuList']>
export const LazyNavigationMenuTrigger: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuTrigger']>
export const LazyNavigationMenuViewport: LazyComponent<typeof import("../components/ui/navigation-menu/index")['NavigationMenuViewport']>
export const LazyPagination: LazyComponent<typeof import("../components/ui/pagination/index")['Pagination']>
export const LazyPaginationContent: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationContent']>
export const LazyPaginationEllipsis: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationEllipsis']>
export const LazyPaginationFirst: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationFirst']>
export const LazyPaginationItem: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationItem']>
export const LazyPaginationLast: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationLast']>
export const LazyPaginationNext: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationNext']>
export const LazyPaginationPrevious: LazyComponent<typeof import("../components/ui/pagination/index")['PaginationPrevious']>
export const LazyPopover: LazyComponent<typeof import("../components/ui/popover/index")['Popover']>
export const LazyPopoverAnchor: LazyComponent<typeof import("../components/ui/popover/index")['PopoverAnchor']>
export const LazyPopoverContent: LazyComponent<typeof import("../components/ui/popover/index")['PopoverContent']>
export const LazyPopoverTrigger: LazyComponent<typeof import("../components/ui/popover/index")['PopoverTrigger']>
export const LazySelect: LazyComponent<typeof import("../components/ui/select/index")['Select']>
export const LazySelectContent: LazyComponent<typeof import("../components/ui/select/index")['SelectContent']>
export const LazySelectGroup: LazyComponent<typeof import("../components/ui/select/index")['SelectGroup']>
export const LazySelectItem: LazyComponent<typeof import("../components/ui/select/index")['SelectItem']>
export const LazySelectItemText: LazyComponent<typeof import("../components/ui/select/index")['SelectItemText']>
export const LazySelectLabel: LazyComponent<typeof import("../components/ui/select/index")['SelectLabel']>
export const LazySelectScrollDownButton: LazyComponent<typeof import("../components/ui/select/index")['SelectScrollDownButton']>
export const LazySelectScrollUpButton: LazyComponent<typeof import("../components/ui/select/index")['SelectScrollUpButton']>
export const LazySelectSeparator: LazyComponent<typeof import("../components/ui/select/index")['SelectSeparator']>
export const LazySelectTrigger: LazyComponent<typeof import("../components/ui/select/index")['SelectTrigger']>
export const LazySelectValue: LazyComponent<typeof import("../components/ui/select/index")['SelectValue']>
export const LazySeparator: LazyComponent<typeof import("../components/ui/separator/index")['Separator']>
export const LazySheet: LazyComponent<typeof import("../components/ui/sheet/index")['Sheet']>
export const LazySheetClose: LazyComponent<typeof import("../components/ui/sheet/index")['SheetClose']>
export const LazySheetContent: LazyComponent<typeof import("../components/ui/sheet/index")['SheetContent']>
export const LazySheetDescription: LazyComponent<typeof import("../components/ui/sheet/index")['SheetDescription']>
export const LazySheetFooter: LazyComponent<typeof import("../components/ui/sheet/index")['SheetFooter']>
export const LazySheetHeader: LazyComponent<typeof import("../components/ui/sheet/index")['SheetHeader']>
export const LazySheetTitle: LazyComponent<typeof import("../components/ui/sheet/index")['SheetTitle']>
export const LazySheetTrigger: LazyComponent<typeof import("../components/ui/sheet/index")['SheetTrigger']>
export const LazySidebar: LazyComponent<typeof import("../components/ui/sidebar/index")['Sidebar']>
export const LazySidebarContent: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarContent']>
export const LazySidebarFooter: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarFooter']>
export const LazySidebarGroup: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroup']>
export const LazySidebarGroupAction: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupAction']>
export const LazySidebarGroupContent: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupContent']>
export const LazySidebarGroupLabel: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']>
export const LazySidebarHeader: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarHeader']>
export const LazySidebarInput: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarInput']>
export const LazySidebarInset: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarInset']>
export const LazySidebarMenu: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenu']>
export const LazySidebarMenuAction: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuAction']>
export const LazySidebarMenuBadge: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuBadge']>
export const LazySidebarMenuButton: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuButton']>
export const LazySidebarMenuItem: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuItem']>
export const LazySidebarMenuSkeleton: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSkeleton']>
export const LazySidebarMenuSub: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSub']>
export const LazySidebarMenuSubButton: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSubButton']>
export const LazySidebarMenuSubItem: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuSubItem']>
export const LazySidebarProvider: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarProvider']>
export const LazySidebarRail: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarRail']>
export const LazySidebarSeparator: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarSeparator']>
export const LazySidebarTrigger: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarTrigger']>
export const LazySkeleton: LazyComponent<typeof import("../components/ui/skeleton/index")['Skeleton']>
export const LazyToaster: LazyComponent<typeof import("../components/ui/sonner/index")['Toaster']>
export const LazyStepper: LazyComponent<typeof import("../components/ui/stepper/index")['Stepper']>
export const LazyStepperDescription: LazyComponent<typeof import("../components/ui/stepper/index")['StepperDescription']>
export const LazyStepperIndicator: LazyComponent<typeof import("../components/ui/stepper/index")['StepperIndicator']>
export const LazyStepperItem: LazyComponent<typeof import("../components/ui/stepper/index")['StepperItem']>
export const LazyStepperSeparator: LazyComponent<typeof import("../components/ui/stepper/index")['StepperSeparator']>
export const LazyStepperTitle: LazyComponent<typeof import("../components/ui/stepper/index")['StepperTitle']>
export const LazyStepperTrigger: LazyComponent<typeof import("../components/ui/stepper/index")['StepperTrigger']>
export const LazyTable: LazyComponent<typeof import("../components/ui/table/index")['Table']>
export const LazyTableBody: LazyComponent<typeof import("../components/ui/table/index")['TableBody']>
export const LazyTableCaption: LazyComponent<typeof import("../components/ui/table/index")['TableCaption']>
export const LazyTableCell: LazyComponent<typeof import("../components/ui/table/index")['TableCell']>
export const LazyTableEmpty: LazyComponent<typeof import("../components/ui/table/index")['TableEmpty']>
export const LazyTableFooter: LazyComponent<typeof import("../components/ui/table/index")['TableFooter']>
export const LazyTableHead: LazyComponent<typeof import("../components/ui/table/index")['TableHead']>
export const LazyTableHeader: LazyComponent<typeof import("../components/ui/table/index")['TableHeader']>
export const LazyTableRow: LazyComponent<typeof import("../components/ui/table/index")['TableRow']>
export const LazyTabs: LazyComponent<typeof import("../components/ui/tabs/index")['Tabs']>
export const LazyTabsContent: LazyComponent<typeof import("../components/ui/tabs/index")['TabsContent']>
export const LazyTabsList: LazyComponent<typeof import("../components/ui/tabs/index")['TabsList']>
export const LazyTabsTrigger: LazyComponent<typeof import("../components/ui/tabs/index")['TabsTrigger']>
export const LazyTextarea: LazyComponent<typeof import("../components/ui/textarea/index")['Textarea']>
export const LazyTooltip: LazyComponent<typeof import("../components/ui/tooltip/index")['Tooltip']>
export const LazyTooltipContent: LazyComponent<typeof import("../components/ui/tooltip/index")['TooltipContent']>
export const LazyTooltipProvider: LazyComponent<typeof import("../components/ui/tooltip/index")['TooltipProvider']>
export const LazyTooltipTrigger: LazyComponent<typeof import("../components/ui/tooltip/index")['TooltipTrigger']>
export const LazyAreaChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaChart']>
export const LazyAreaStackedChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['AreaStackedChart']>
export const LazyLineChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['LineChart']>
export const LazyBarChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['BarChart']>
export const LazyDonutChart: LazyComponent<typeof import("../node_modules/nuxt-charts/dist/runtime/vue-chrts")['DonutChart']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
