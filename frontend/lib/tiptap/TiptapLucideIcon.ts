import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { icons } from 'lucide'
import LucideIconView from './LucideIconView.vue'

export const TiptapLucideIcon = Node.create({
  name: 'lucideIcon',
  inline: true,
  group: 'inline',

  addAttributes() {
    return {
      name: {
        default: 'Activity',
      },
      class: {
        default: 'w-5 h-5 inline-block align-text-bottom text-inherit'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'lucide-icon',
        getAttrs: element => {
          if (typeof element === 'string') return {}
          return {
            name: element.getAttribute('name'),
          }
        }
      },
      {
        tag: 'svg[data-lucide-icon]',
        getAttrs: element => {
          if (typeof element === 'string') return {}
          return {
            name: element.getAttribute('data-lucide-icon'),
            class: element.getAttribute('class'),
          }
        }
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const iconName = String(HTMLAttributes.name)
    
    // Attempt to match the provided name (e.g. "Activity", "activity", "ActivityIcon") to a Lucide icon
    let iconData = icons[iconName as keyof typeof icons]
    
    // Try PascalCase mapping if exactly provided name not found
    if (!iconData) {
        const pascalCase = iconName.replace(/(^\w|-\w)/g, (text: string) => text.replace(/-/, "").toUpperCase())
        iconData = icons[pascalCase as keyof typeof icons]
    }
    
    // If still not found, strip 'Icon' suffix just in case
    if (!iconData && iconName.endsWith('Icon')) {
        const nameWithoutIcon = iconName.slice(0, -4)
        const pascalCase = nameWithoutIcon.replace(/(^\w|-\w)/g, (text: string) => text.replace(/-/, "").toUpperCase())
        iconData = icons[pascalCase as keyof typeof icons]
    }

    if (!iconData) {
      return ['span', { class: 'text-red-500 text-xs font-mono font-bold mx-1 border border-red-500 px-1 rounded' }, `[Icon: ${iconName}]`]
    }

    const svgAttrs = {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: HTMLAttributes.class,
      'data-lucide-icon': iconName
    }
    
    const children = iconData.map((child: any) => [child[0], child[1]])
    
    return ['svg', mergeAttributes(svgAttrs), ...children]
  },

  addNodeView() {
    return VueNodeViewRenderer(LucideIconView)
  },
})
