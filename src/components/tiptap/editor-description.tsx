import { HorizontalRuleToolbar } from '@/components/toolbars/horizontal-rule'
import { StrikeThroughToolbar } from '@/components/toolbars/strikethrough'
import { EditorContent, type Extension, useEditor } from '@tiptap/react'
import { ToolbarProvider } from '@/components/toolbars/toolbar-provider'
import { OrderedListToolbar } from '@/components/toolbars/ordered-list'
import { BulletListToolbar } from '@/components/toolbars/bullet-list'
import { BlockquoteToolbar } from '@/components/toolbars/blockquote'
import { ItalicToolbar } from '@/components/toolbars/italic'
import { BoldToolbar } from '@/components/toolbars/bold'
import { CodeToolbar } from '@/components/toolbars/code'
import { Separator } from '@radix-ui/react-separator'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { UndoToolbar } from '../toolbars/undo'
import { RedoToolbar } from '../toolbars/redo'
import StarterKit from '@tiptap/starter-kit'

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'bg-accent rounded-md p-1',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-2',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'bg-primary text-primary-foreground p-2 text-sm rounded-md p-1',
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: 'tiptap-heading',
      },
    },
  }),
]

type Props = {
  content?: string
  onChange?: (content: string) => void
}

export const EditorDescription = ({ content = '', onChange }: Props) => {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className='border w-full relative rounded-md overflow-hidden pb-3'>
      <div className='flex w-full items-center py-1 px-1 justify-between sticky top-0 left-0 bg-background'>
        <TooltipProvider>
          <ToolbarProvider editor={editor}>
            <div className='flex items-center gap-1'>
              <UndoToolbar />
              <RedoToolbar />
              <Separator
                orientation='vertical'
                className='w-0.5 bg-border h-5'
              />
              <BoldToolbar />
              <ItalicToolbar />
              <StrikeThroughToolbar />
              <BulletListToolbar />
              <OrderedListToolbar />
              <CodeToolbar />
              <HorizontalRuleToolbar />
              <BlockquoteToolbar />
            </div>
          </ToolbarProvider>
        </TooltipProvider>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run()
        }}
        className='cursor-text min-h-[4rem] bg-background'
      >
        <EditorContent className='outline-none' editor={editor} />
      </div>
    </div>
  )
}
