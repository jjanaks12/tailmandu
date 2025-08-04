import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "admin-sidebar" | "admin" | "default-footer" | "default-header" | "default-sidebar" | "default" | "simple"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}