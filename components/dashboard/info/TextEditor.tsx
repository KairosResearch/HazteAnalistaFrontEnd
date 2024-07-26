import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Bold, Italic, Underline } from "lucide-react"
import 'draft-js/dist/Draft.css';
import { Button } from '@/components/ui/button';
import { stateToHTML } from 'draft-js-export-html';

import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"

// Definir los estilos de resaltado
const customStyleMap = {
  HIGHLIGHT_YELLOW: {
    backgroundColor: 'yellow',
  },
  HIGHLIGHT_GREEN: {
    backgroundColor: 'lightgreen',
  },
  HIGHLIGHT_BLUE: {
    backgroundColor: 'lightblue',
  },
};

const TextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef<Editor | null>(null);

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  useEffect(() => {
    focusEditor();
  }, []);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onHighlightYellowClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT_YELLOW'));
  };

  const onHighlightGreenClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT_GREEN'));
  };

  const onHighlightBlueClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT_BLUE'));
  };

  const handleSendClick = () => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState, {
        inlineStyles: {
          HIGHLIGHT_YELLOW: { style: { backgroundColor: 'yellow' } },
          HIGHLIGHT_GREEN: { style: { backgroundColor: 'lightgreen' } },
          HIGHLIGHT_BLUE: { style: { backgroundColor: 'lightblue' } },
        },
      });
      console.log(html);
  };

  return (
    <div className='grid gap-9'>
      <div className="flex gap-4">
      <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={onBoldClick}>
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={onItalicClick}>
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={onUnderlineClick}>
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
        
        <button onClick={onHighlightYellowClick}>Highlight Yellow</button>
        <button onClick={onHighlightGreenClick}>Highlight Green</button>
        <button onClick={onHighlightBlueClick}>Highlight Blue</button>
      </div>
      <div onClick={focusEditor} className="border p-6 min-h-24 h-64 overflow-y-scroll cursor-text"
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={customStyleMap}
        />
      </div>

      <Button
        onClick={handleSendClick}
      >
        Enviar 
      </Button>
    </div>
  );
};

export default TextEditor;