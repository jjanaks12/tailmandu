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
import { BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, LoaderCircleIcon, MinusIcon, QuoteIcon, RedoIcon, RotateCcwIcon, StrikethroughIcon, UnderlineIcon, UndoIcon, UnlinkIcon, WrapTextIcon, XIcon } from 'lucide-vue-next'

import { debounce } from '~/lib/filters'

interface TiptapEditorProps {
  modelValue: string
  disabled?: boolean
  timer?: number
}

const props = withDefaults(defineProps<TiptapEditorProps>(), {
  timer: 10000
})
const emit = defineEmits(['update:modelValue'])
const isChanged = ref(false)

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    TiptapDocument, TiptapParagraph, TiptapText, TiptapBold, TiptapItalic, TiptapStrike, TiptapBlockquote, TiptapBulletList, TiptapHeading, TiptapListItem, TiptapHistory, TiptapOrderedList, Underline, HorizontalRule,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    })
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

onBeforeUnmount(() => {
  // @ts-expect-error
  unref(editor).destroy()
})

watch(() => props.modelValue, () => {
  editor.value?.commands.setContent(props.modelValue)
  editor.value?.setEditable(!props.disabled)
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
  <div class="editor" v-if="editor">
    <div class="flex items-center gap-0.5 rounded-sm mb-2" v-if="!disabled">
      <div class="bg-gray-300 p-0.5 rounded">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }">
          <BoldIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus()?.toggleItalic().run()"
          :disabled="!editor.can().chain().focus()?.toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          <ItalicIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus()?.toggleUnderline().run()"
          :disabled="!editor.can().chain().focus()?.toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }">
          <UnderlineIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus()?.toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          <StrikethroughIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="setLink"
          :class="{ 'is-active': editor.isActive('link') }">
          <LinkIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().unsetLink().run()"
          :disabled="!editor.isActive('link')">
          <UnlinkIcon :size="18" />
        </Button>
      </div>
      <!-- <Button  tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <MdiIcon icon="mdiCodeBraces" />
      </Button> -->
      <div class="bg-gray-300 p-0.5 rounded">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().unsetAllMarks().run()">
          <XIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().clearNodes().run()">
          <RotateCcwIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
          <WrapTextIcon :size="18" />
        </Button>
      </div>
      <div class="bg-gray-300 p-0.5 rounded">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <Heading1Icon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          <Heading2Icon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          <Heading3Icon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
          <Heading4Icon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
          <Heading5Icon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
          <Heading6Icon :size="18" />
        </Button>
      </div>
      <div class="bg-gray-300 p-0.5 rounded">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }">
          <ListIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }">
          <ListOrderedIcon :size="18" />
        </Button>
      </div>
      <!-- <Button  tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        <MdiIcon icon="mdiCodeArray" />
      </Button> -->
      <div class="bg-gray-300 p-0.5 rounded">
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }">
          <QuoteIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost"
          @click="editor.chain().focus().setHorizontalRule().run()">
          <MinusIcon :size="18" />
        </Button>
        <!-- <Button  tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </Button> -->
      </div>
      <div class="bg-gray-300 p-0.5 rounded">
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()">
          <UndoIcon :size="18" />
        </Button>
        <Button tabindex="-1" type="button" size="sm" variant="ghost" @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()">
          <RedoIcon :size="18" />
        </Button>
      </div>
      <LoaderCircleIcon class="text-green-600 animate-spin" :size="16" v-if="isChanged" />
    </div>
    <TiptapEditorContent class="content_editor p-3 bg-gray-100 text-gray-600 rounded-sm focus:outline-0"
      :editor="editor" />
  </div>
</template>

<style lang="css">
.ProseMirror {
  min-height: 200px;
  outline: none;
}

.content_editor {
  min-height: 200px;
}
</style>