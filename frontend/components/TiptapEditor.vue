<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'
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
import TiptapImage from '@tiptap/extension-image'

import {
  BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon,
  ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon,
  LoaderCircleIcon, MinusIcon, QuoteIcon, RedoIcon,
  RotateCcwIcon, StrikethroughIcon, UnderlineIcon,
  UndoIcon, UnlinkIcon, WrapTextIcon, XIcon, ImageIcon
} from 'lucide-vue-next'

import { useMediaStore } from '~/store/media'
import { storeToRefs } from 'pinia'
import { showImage } from '~/lib/filters'
import { useDebounceFn } from '@vueuse/core'

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

const { media, galleries } = storeToRefs(useMediaStore())
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
    TiptapImage.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg my-4 mx-auto block shadow-md',
      },
    }),
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

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl || '')

  if (url === null) return

  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
  media.value.show = true
  media.value.mode = 'image'
  media.value.isMultiple = false
  media.value.action = (state: any) => {
    if (state.selectedImages.length > 0) {
      const imageId = state.selectedImages[0]
      const image = galleries.value.find((i: any) => i.id === imageId)
      if (image) {
        const url = showImage(image.file_name)
        editor.value?.chain().focus().setImage({ src: url }).run()
      }
      media.value.show = false
    }
  }
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
          @click="setLink" :class="{ 'bg-muted text-primary': editor.isActive('link') }">
          <LinkIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
          <UnlinkIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" class="rounded-none px-2 py-1 h-8"
          @click="addImage">
          <ImageIcon :size="16" />
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
</style>