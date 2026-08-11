<script lang="ts" setup>
import { ref, watch, onBeforeUnmount, computed } from 'vue'
import { icons } from 'lucide'
import TiptapDocument from '@tiptap/extension-document'
import TiptapParagraph from '@tiptap/extension-paragraph'
import TiptapText from '@tiptap/extension-text'
import TiptapBold from '@tiptap/extension-bold'
import TiptapItalic from '@tiptap/extension-italic'
import TiptapStrike from '@tiptap/extension-strike'
import TiptapBlockquote from '@tiptap/extension-blockquote'
import TiptapBulletList from '@tiptap/extension-bullet-list'
import TiptapHeading from '@tiptap/extension-heading'
import TiptapListItem from '@tiptap/extension-list-item'
import TiptapHistory from '@tiptap/extension-history'
import TiptapOrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Link from '@tiptap/extension-link'
import ImageResize from 'tiptap-extension-resize-image'
import { TiptapLucideIcon } from '~/lib/tiptap/TiptapLucideIcon'
import { SliderExtension } from '~/lib/tiptap/SliderExtension'

import {
  BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon,
  ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon,
  LoaderCircleIcon, MinusIcon, QuoteIcon, RedoIcon,
  RotateCcwIcon, StrikethroughIcon, UnderlineIcon,
  UndoIcon, UnlinkIcon, WrapTextIcon, ImageIcon, ComponentIcon, GalleryHorizontalEndIcon
} from 'lucide-vue-next'

import { useMediaStore } from '~/store/media'
import { storeToRefs } from 'pinia'
import { showImage } from '~/lib/filters'
import { useDebounceFn } from '@vueuse/core'
import { useAxios } from '~/services/axios'

interface TiptapEditorProps {
  modelValue: string
  disabled?: boolean
  timer?: number
  toolbarHeight?: string | number
}

const props = withDefaults(defineProps<TiptapEditorProps>(), {
  timer: 1000,
  toolbarHeight: 0
})

const emit = defineEmits(['update:modelValue'])

const { media } = storeToRefs(useMediaStore())
const { fetchImage } = useMediaStore()
const isChanged = ref(false)

const stopSpinning = useDebounceFn(() => {
  isChanged.value = false
}, props.timer)

const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled,
  extensions: [
    TiptapDocument,
    TiptapParagraph,
    TiptapText,
    TiptapBold,
    TiptapItalic,
    TiptapStrike,
    TiptapBlockquote,
    TiptapBulletList,
    TiptapHeading,
    TiptapListItem,
    TiptapHistory,
    TiptapOrderedList,
    Underline,
    HorizontalRule,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    ImageResize.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: 'max-w-full rounded-lg my-4 shadow-md',
      },
    }),
    TiptapLucideIcon,
    SliderExtension,
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
    isChanged.value = true
    stopSpinning()
  },
})

watch(() => props.modelValue, (newVal) => {
  if (editor.value && newVal !== editor.value.getHTML()) {
    // If the user is actively typing, ignore external model changes so the cursor never jumps.
    if (editor.value.isFocused) return
    editor.value.commands.setContent(newVal, { emitUpdate: false })
  }
})

watch(() => props.disabled, (newVal) => {
  editor.value?.setEditable(!newVal)
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

const { axios } = useAxios()
const showLinkDialog = ref(false)
const linkUrlInput = ref('')
const linkType = ref('external')
const internalCategory = ref('blogs')
const internalSearchQuery = ref('')
const internalItems = ref<any[]>([])
const internalLoading = ref(false)

const searchInternalLinks = async () => {
  internalLoading.value = true
  try {
    let endpoint = ''
    if (internalCategory.value === 'blogs') endpoint = '/blogs/public'
    else if (internalCategory.value === 'treks') endpoint = '/treks'
    else if (internalCategory.value === 'products') endpoint = '/products'
    else if (internalCategory.value === 'races') endpoint = '/events/public'

    const { data } = await axios.get(endpoint, {
      params: { s: internalSearchQuery.value, per_page: 20 }
    })
    
    internalItems.value = data?.data?.data || data?.data || []
  } catch (e) {
    internalItems.value = []
  } finally {
    internalLoading.value = false
  }
}

watch([internalCategory, internalSearchQuery], useDebounceFn(() => {
  if (linkType.value === 'internal') {
    searchInternalLinks()
  }
}, 300))

watch(linkType, (newType) => {
  if (newType === 'internal' && internalItems.value.length === 0) {
    searchInternalLinks()
  }
})

const getSiteOrigin = () => typeof window !== 'undefined' ? window.location.origin : 'https://trailmandu.com'

const getInternalUrl = (item: any) => {
  if (internalCategory.value === 'blogs') return `/blogs/${item.slug}`
  if (internalCategory.value === 'treks') return `/treks/${item.slug}`
  if (internalCategory.value === 'products') return `/store/${item.slug || item.id}`
  if (internalCategory.value === 'races') return `/races/${item.slug}`
  return ''
}

const confirmLinkInsert = () => {
  if (linkUrlInput.value === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
  } else {
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: linkUrlInput.value }).run()
  }
  showLinkDialog.value = false
}

const selectInternalItem = (item: any) => {
  linkUrlInput.value = getInternalUrl(item)
  confirmLinkInsert()
}

const openLinkDialog = () => {
  linkUrlInput.value = editor.value?.getAttributes('link').href || ''
  
  let isInternal = false
  if (linkUrlInput.value) {
    if (linkUrlInput.value.startsWith('/')) {
      isInternal = true
    } else {
      try {
        const urlObj = new URL(linkUrlInput.value)
        isInternal = urlObj.hostname === window.location.hostname || urlObj.hostname.endsWith('trailmandu.com')
      } catch {
        isInternal = false
      }
    }
  }
  
  linkType.value = isInternal ? 'internal' : 'external'
  showLinkDialog.value = true
  if (linkType.value === 'internal' && internalItems.value.length === 0) {
    searchInternalLinks()
  }
}

const addImage = () => {
  media.value.show = true
  media.value.mode = 'image'
  media.value.isMultiple = false
  media.value.action = async (state: any) => {
    if (state.selectedImages.length > 0) {
      const image = await fetchImage(state.selectedImages[0])
      if (image) {
        const url = showImage(image.file_name)
        editor.value?.chain().focus().setImage({ src: url }).run()
      }
      media.value.show = false
    }
  }
}

const showIconDialog = ref(false)
const iconNameInput = ref('')

const iconSvg = computed(() => {
  const iconName = iconNameInput.value
  if (!iconName) return null

  let iconData = icons[iconName as keyof typeof icons]
  if (!iconData) {
    const pascalCase = iconName.replace(/(^\w|-\w)/g, (text: string) => text.replace(/-/, "").toUpperCase())
    iconData = icons[pascalCase as keyof typeof icons]
  }
  if (!iconData && iconName.endsWith('Icon')) {
    const nameWithoutIcon = iconName.slice(0, -4)
    const pascalCase = nameWithoutIcon.replace(/(^\w|-\w)/g, (text: string) => text.replace(/-/, "").toUpperCase())
    iconData = icons[pascalCase as keyof typeof icons]
  }

  if (!iconData) return null

  const children = iconData.map((child: any) => {
    const attrs = Object.entries(child[1]).map(([k, v]) => `${k}="${v}"`).join(' ')
    return `<${child[0]} ${attrs}></${child[0]}>`
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10 text-primary">${children}</svg>`
})

const insertLucideIcon = () => {
  iconNameInput.value = ''
  showIconDialog.value = true
}

const confirmIconInsert = () => {
  if (iconNameInput.value) {
    editor.value?.chain().focus().insertContent(`<lucide-icon name="${iconNameInput.value}"></lucide-icon>&nbsp;`).run()
  }
  showIconDialog.value = false
}

const insertSlider = () => {
  editor.value?.chain().focus().insertContent({ type: 'slider', attrs: { images: [] } }).run()
}
</script>

<template>
  <div class="editor border border-input rounded-md bg-background" v-if="editor">
    <div class="flex flex-wrap items-center gap-1 p-2 bg-muted/30 border-b border-border sticky z-20 backdrop-blur-md"
      :style="{ top: `${toolbarHeight}px` }" v-if="!disabled">

      <!-- Text formatting -->
      <div class="flex items-center bg-background rounded-sm border border-border overflow-hidden">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('bold') }">
          <BoldIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('italic') }">
          <ItalicIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('underline') }">
          <UnderlineIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('strike') }">
          <StrikethroughIcon :size="16" />
        </Button>
      </div>

      <!-- Headings -->
      <div class="flex items-center bg-background rounded-sm border border-border overflow-hidden">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'bg-muted text-primary': editor.isActive('heading', { level: 1 }) }">
          <Heading1Icon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'bg-muted text-primary': editor.isActive('heading', { level: 2 }) }">
          <Heading2Icon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'bg-muted text-primary': editor.isActive('heading', { level: 3 }) }">
          <Heading3Icon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('paragraph') }">
          <WrapTextIcon :size="16" />
        </Button>
      </div>

      <!-- Lists & Blocks -->
      <div class="flex items-center bg-background rounded-sm border border-border overflow-hidden">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('bulletList') }">
          <ListIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('orderedList') }">
          <ListOrderedIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'bg-muted text-primary': editor.isActive('blockquote') }">
          <QuoteIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().setHorizontalRule().run()">
          <MinusIcon :size="16" />
        </Button>
      </div>

      <!-- Links & Images -->
      <div class="flex items-center bg-background rounded-sm border border-border overflow-hidden">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="openLinkDialog" :class="{ 'bg-muted text-primary': editor.isActive('link') }">
          <LinkIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
          <UnlinkIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="addImage" title="Insert Image">
          <ImageIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="insertLucideIcon" title="Insert Lucide Icon">
          <ComponentIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="insertSlider" title="Insert Slider Widget">
          <GalleryHorizontalEndIcon :size="16" />
        </Button>
      </div>

      <!-- History & Clear -->
      <div class="flex items-center bg-background rounded-sm border border-border overflow-hidden">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
          <UndoIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
          <RedoIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().unsetAllMarks().clearNodes().run()">
          <RotateCcwIcon :size="16" />
        </Button>
      </div>

      <div class="ml-auto px-2">
        <LoaderCircleIcon class="text-primary animate-spin" :size="16" v-if="isChanged" />
      </div>
    </div>

    <TiptapEditorContent class="content_editor min-h-[300px]" :editor="editor" />

    <Dialog :open="showLinkDialog" @update:open="showLinkDialog = $event">
      <DialogContent class="sm:max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
          <DialogDescription>Choose the type of link and configure its destination.</DialogDescription>
        </DialogHeader>
        
        <Tabs v-model="linkType" class="w-full mt-4 min-w-0">
          <TabsList class="grid w-full grid-cols-2 mb-4 min-w-0">
            <TabsTrigger value="external" class="truncate min-w-0">External</TabsTrigger>
            <TabsTrigger value="internal" class="truncate min-w-0">Internal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="external" class="space-y-4 min-w-0">
            <div class="flex items-center space-x-2 w-full py-2 min-w-0">
              <Input v-model="linkUrlInput" placeholder="https://example.com" @keyup.enter="confirmLinkInsert" autofocus class="flex-1 min-w-0" />
              <Button type="button" @click="confirmLinkInsert" class="shrink-0">Save</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="internal" class="space-y-4 overflow-hidden min-w-0">
            <div class="flex space-x-2 w-full min-w-0">
              <Select v-model="internalCategory">
                <SelectTrigger class="w-[100px] sm:w-[120px] shrink-0 min-w-0">
                  <SelectValue placeholder="Category" class="truncate" />
                </SelectTrigger>
                <SelectContent class="z-[110]">
                  <SelectItem value="blogs">Blogs</SelectItem>
                  <SelectItem value="treks">Treks</SelectItem>
                  <SelectItem value="races">Races</SelectItem>
                  <SelectItem value="products">Store</SelectItem>
                </SelectContent>
              </Select>
              <Input v-model="internalSearchQuery" placeholder="Search..." class="flex-1 min-w-0" />
            </div>
            
            <div class="h-56 overflow-y-auto overflow-x-hidden border rounded-md p-1 space-y-1 bg-muted/20 w-full min-w-0">
              <div v-if="internalLoading" class="flex justify-center p-4">
                <LoaderCircleIcon class="w-5 h-5 animate-spin text-primary" />
              </div>
              <div v-else-if="internalItems.length === 0" class="text-center text-sm text-muted-foreground p-4">
                No items found.
              </div>
              <button 
                v-else
                v-for="item in internalItems" 
                :key="item.id"
                type="button"
                @click="selectInternalItem(item)"
                class="block w-full max-w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-muted focus:bg-muted focus:outline-none transition-colors overflow-hidden"
              >
                <div class="font-medium truncate block w-full max-w-full">{{ item.title || item.name }}</div>
                <div class="text-xs text-muted-foreground truncate block w-full max-w-full">{{ getInternalUrl(item) }}</div>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

    <Dialog :open="showIconDialog" @update:open="showIconDialog = $event">
      <DialogContent class="sm:max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle>Insert Icon</DialogTitle>
          <DialogDescription>Enter a Lucide icon name (e.g., Activity, CheckCircle, MapPin).</DialogDescription>
        </DialogHeader>
        <div class="flex flex-col items-center space-y-6 py-4">
          <div
            class="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner">
            <div v-if="iconSvg" v-html="iconSvg"></div>
            <div v-else class="text-slate-400 text-xs text-center px-2">No icon<br>matched</div>
          </div>
          <div class="flex items-center space-x-2 w-full">
            <Input v-model="iconNameInput" placeholder="Icon name" @keyup.enter="confirmIconInsert" autofocus
              class="flex-1" />
            <Button type="button" @click="confirmIconInsert" :disabled="!iconSvg">Insert</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style>
/* Core Tiptap Container */
.content_editor .ProseMirror {
  min-height: 300px;
  outline: none;
  padding: 1.5rem;
}

/* Fix for collapsed empty paragraphs in Tailwind CSS */
.content_editor .ProseMirror li p {
  margin-bottom: 0;
}

.content_editor .ProseMirror p {
  min-height: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* This is the magic bullet for empty lines. It guarantees 0px-height paragraphs never happen. */
.content_editor .ProseMirror p:empty::before {
  content: "\00a0";
  /* Non-breaking space */
}

/* Basic Typography so the editor output actually looks nice */
.content_editor .ProseMirror h1 {
  font-size: 2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.content_editor .ProseMirror h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.content_editor .ProseMirror h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.content_editor .ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.content_editor .ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.content_editor .ProseMirror blockquote {
  border-left: 3px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
  margin: 1rem 0;
}

/* Image Resize & Alignment Fixes */
.content_editor .ProseMirror img {
  max-width: 100%;
  height: auto;
}

.content_editor .ProseMirror>div[style*="display: flex"] {
  width: 100%;
  justify-content: center;
  /* Default fallback */
}

/* Tiptap Extension Resize Image applies margin to the inner container. 
   We ensure the wrapper is 100% width so margin auto can distribute space */
.content_editor .ProseMirror div>div>img {
  display: block;
}
</style>