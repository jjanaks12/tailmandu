import { Editor } from '@tiptap/core'
import ImageResize from 'tiptap-extension-resize-image'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const editor = new Editor({
  extensions: [Document, Paragraph, Text, ImageResize],
  content: '<img src="test.jpg" data-align="center" style="width: 50%" />'
})

console.log(editor.getHTML())
