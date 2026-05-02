<script lang="ts" setup>
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
import { BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, LoaderCircleIcon, MinusIcon, QuoteIcon, RedoIcon, RotateCcwIcon, StrikethroughIcon, UnderlineIcon, UndoIcon, UnlinkIcon, WrapTextIcon, XIcon } from 'lucide-vue-next'

import { debounce } from '~/lib/filters'
import { useMediaStore } from '~/store/media'
import { showImage } from '~/lib/filters'

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
const isChanged = ref(false)

const { media, galleries } = storeToRefs(useMediaStore())

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    TiptapDocument, TiptapParagraph, TiptapText, TiptapBold, TiptapItalic, TiptapStrike, TiptapBlockquote, TiptapBulletList, TiptapHeading, TiptapListItem, TiptapHistory, TiptapOrderedList, Underline, HorizontalRule,
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
    isChanged.value = true
    debounce(() => {
      isChanged.value = false
      emit('update:modelValue', editor.getHTML())
    }, props.timer)
  },
})

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl || '')

  if (url === null) {
    return
  }

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

onBeforeUnmount(() => {
  // @ts-expect-error
  unref(editor).destroy()
})

watch(() => props.modelValue, (newVal) => {
  if (editor.value && newVal !== editor.value.getHTML()) {
    editor.value.commands.setContent(newVal, { emitUpdate: false })
  }
})

watch(() => props.disabled, () => {
  editor.value?.setEditable(!props.disabled)
})

onMounted(() => {
  if (props.modelValue) {
    editor.value?.commands.setContent(props.modelValue)
    editor.value?.setEditable(!props.disabled)
  }
})
</script>

<template>
  <div class="editor border border-input rounded-md bg-background" v-if="editor">
    <div class="flex flex-wrap items-center gap-0.5 p-1 bg-muted/30 border-b border-border sticky z-20 backdrop-blur-md"
      :style="{ top: `${toolbarHeight}px` }" v-if="!disabled">
      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'bg-muted': editor.isActive('bold') }">
          <BoldIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus()?.toggleItalic().run()"
          :disabled="!editor.can().chain().focus()?.toggleItalic().run()"
          :class="{ 'bg-muted': editor.isActive('italic') }">
          <ItalicIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus()?.toggleUnderline().run()"
          :disabled="!editor.can().chain().focus()?.toggleUnderline().run()"
          :class="{ 'bg-muted': editor.isActive('underline') }">
          <UnderlineIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus()?.toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'bg-muted': editor.isActive('strike') }">
          <StrikethroughIcon :size="16" />
        </Button>
      </div>

      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="setLink"
          :class="{ 'bg-muted': editor.isActive('link') }">
          <LinkIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().unsetLink().run()"
          :disabled="!editor.isActive('link')">
          <UnlinkIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="addImage">
          <ImageIcon :size="16" />
        </Button>
      </div>

      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().unsetAllMarks().run()">
          <XIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().clearNodes().run()">
          <RotateCcwIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().setParagraph().run()" :class="{ 'bg-muted': editor.isActive('paragraph') }">
          <WrapTextIcon :size="16" />
        </Button>
      </div>

      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'bg-muted': editor.isActive('heading', { level: 1 }) }">
          <Heading1Icon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'bg-muted': editor.isActive('heading', { level: 2 }) }">
          <Heading2Icon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'bg-muted': editor.isActive('heading', { level: 3 }) }">
          <Heading3Icon :size="16" />
        </Button>
      </div>

      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'bg-muted': editor.isActive('bulletList') }">
          <ListIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'bg-muted': editor.isActive('orderedList') }">
          <ListOrderedIcon :size="16" />
        </Button>
      </div>

      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'bg-muted': editor.isActive('blockquote') }">
          <QuoteIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().setHorizontalRule().run()">
          <MinusIcon :size="16" />
        </Button>
      </div>

      <div class="flex items-center gap-0.5 bg-background p-1 rounded-sm border border-border">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()">
          <UndoIcon :size="16" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()">
          <RedoIcon :size="16" />
        </Button>
      </div>

      <div class="ml-auto px-2">
        <LoaderCircleIcon class="text-primary animate-spin" :size="16" v-if="isChanged" />
      </div>
    </div>
    <TiptapEditorContent class="content_editor focus:outline-none min-h-[300px]" :editor="editor" />
  </div>
</template>

<style lang="css">
.ProseMirror {
  min-height: 300px;
  outline: none;
  padding: 1rem;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>