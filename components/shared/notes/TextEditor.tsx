import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML, Modifier } from 'draft-js';
import { Bold, Italic, Underline } from "lucide-react"
import 'draft-js/dist/Draft.css';
import { Button } from '@/components/ui/button';
import { stateToHTML } from 'draft-js-export-html';
import { useDialogsNotes } from '@/hooks/useDialogs';

import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import { handleUpdateNote } from '@/actions/notesActions';
import { useProjects } from '@/hooks/useProjects';

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

interface TextEditorProps {
  id: number;
  closeEditor: () => void;
  updateNote: (guzma: number, id:number, html: string) => void;
}

const TextEditor = ({id, closeEditor, updateNote}: TextEditorProps) => {

  const {initialValue} = useDialogsNotes();




  // const [valueInEditor, setValueInEditor] = useState<string | null>(null);

  // useEffect(() => {
  //   if (initialValue) {
  //     setValueInEditor(initialValue);
  //   }
  // }, [initialValue]);
  // const [guzma, setGuzma] = useState<number | null>(null);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.localStorage.getItem("guzma") !== null) {
  //     setGuzma(Number(window.localStorage.getItem("guzma")));
  //   }
  // }, []);
  // const {  mutate } = useProjects(guzma ?? 0);


  const [editorState, setEditorState] = useState(() => {
    console.log('Montando componente de editor por primera vez');
    if (initialValue) {
      const blocksFromHTML = convertFromHTML(initialValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });
  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };
  useEffect(() => {
    console.log('Valor inicial', initialValue);
    if (initialValue) {
      const blocksFromHTML = convertFromHTML(initialValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      EditorState.createWithContent(contentState)
      
    }
    
    focusEditor();
  }, [initialValue]);

  const editor = useRef<Editor | null>(null);



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

  // const onHighlightYellowClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT_YELLOW'));
  // };

  // const onHighlightGreenClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT_GREEN'));
  // };

  // const onHighlightBlueClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT_BLUE'));
  // };

  const handleSendClick = async () => {
    const contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState, {
        inlineStyles: {
          HIGHLIGHT_YELLOW: { style: { backgroundColor: 'yellow' } },
          HIGHLIGHT_GREEN: { style: { backgroundColor: 'lightgreen' } },
          HIGHLIGHT_BLUE: { style: { backgroundColor: 'lightblue' } },
        },
      });
      //getting guzma from localstorage

      console.log(html);
      const guzma = localStorage.getItem('guzma');
      if(guzma){
        console.log('lLegando a subir nota');
        updateNote(Number(guzma), id, html);
       
          setTimeout(() => {
              
              closeEditor();
          }, 3000);        
        }
      }


  ;

  return (
    <div className='grid gap-9'>
    
      <div className="flex gap-4 dark:text-white">
      <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem className='p-1 md:p-2' value="bold" aria-label="Toggle bold" onClick={onBoldClick}>
        <Bold className="h-4 w-4" />  
      </ToggleGroupItem>
      <ToggleGroupItem className='p-1 md:p-2' value="italic" aria-label="Toggle italic" onClick={onItalicClick}>
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem className='p-1 md:p-2' value="underline" aria-label="Toggle underline" onClick={onUnderlineClick}>
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
        
        {/* <button className='bg-yellow-300 h-6 w-8 '  onClick={onHighlightYellowClick}></button>
        <button className='bg-green-200 h-6 w-8' onClick={onHighlightGreenClick}></button>
        <button className='bg-blue-300  h-6 w-8 ' onClick={onHighlightBlueClick}></button> */}
      </div>
      <div onClick={focusEditor} className="border p-6 min-h-24 h-64 overflow-y-scroll cursor-text dark:text-white"
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
      Guardar
      </Button>
    </div>
  );
};

export default TextEditor;