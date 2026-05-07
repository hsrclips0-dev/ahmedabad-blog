'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichEditor({ value, onChange, placeholder = 'Start writing…' }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
        'data-placeholder': placeholder,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value === '') {
      editor.commands.clearContent()
    }
  }, [editor, value])

  if (!editor) return null

  const btn = (label: string, action: () => boolean, isActive?: boolean) => (
    <button
      key={label}
      type="button"
      onMouseDown={(e) => { e.preventDefault(); action() }}
      className={isActive ? 'is-active' : ''}
    >
      {label}
    </button>
  )

  return (
    <div className="tiptap-wrapper">
      <div className="tiptap-toolbar">
        {btn('B', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
        {btn('I', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
        <div className="sep" />
        {btn('H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
        {btn('H3', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }))}
        <div className="sep" />
        {btn('• List', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
        {btn('1. List', () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
        {btn('" Quote', () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'))}
        <div className="sep" />
        {btn('↩ Break', () => editor.chain().focus().setHardBreak().run())}
        {btn('✕ Clear', () => editor.chain().focus().clearNodes().unsetAllMarks().run())}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
