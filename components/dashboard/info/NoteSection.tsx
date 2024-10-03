import React, {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button';
import TextEditor from '@/components/shared/notes/TextEditor';
import { useDialogsNotes } from '@/hooks/useDialogs';
import { handleUpdateNote, handleGetNote } from '@/actions/notesActions';
import { Skeleton } from '@/components/ui/skeleton';

type NoteSectionProps = {
    
    id: number;
}

const NoteSection = ({ id}: NoteSectionProps) => {


    const [editNotaOpen, setEditNotaOpen] = useState<boolean>(false);
    const [guzma, setGuzma] = useState<number>(0);
    

    const { isOpenNote, setInitialValue } = useDialogsNotes();
    const [success, setSuccess] = React.useState(false);
    const [nota, setNota] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(typeof window !== 'undefined') {
            setGuzma(Number(window.localStorage.getItem("guzma")));
        }
    }, []);

    useEffect(() => {
        async function getNote() {
            setLoading(true);
            
            const note = await handleGetNote(guzma, id);
            if(note) {
                setNota(note);
            } else {
                setNota(null);
            }setLoading(false);
            
        }
        getNote();
    }, [guzma])
 
    
    // useEffect(() => {
    //     async function getNote() {
    //         setLoading(true);
    //         const note = await handleGetNote(guzma, id);
    //         if(note) {
    //             setNota(note);
    //         } else {
    //             setNota(null);
    //         }
    //         setLoading(false);
    //     }
    //     getNote();
    // }, [success])


    useEffect(() => {
      setSuccess(false);
    }, [isOpenNote])
    

    const updateNote = async (guzma: number, id:number, html: string) => {
      const updatedNote = await handleUpdateNote(guzma,  id, html);
      console.log('Nueva actializacons', updatedNote);
      if (updatedNote) {
        setNota(updatedNote);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
      }
    }


  return (
    <>
    {
                loading && <p> Cargando...</p>
            }
 {(!editNotaOpen && nota ) && (
          <div className="flex gap-4">
            
            
            <div
              className="border rounded-sm p-2
               bg-background/70 
               w-[70%] mx-auto shadow-lg"
               dangerouslySetInnerHTML={{ __html: nota }}
            />
            <Button
              onClick={() => setEditNotaOpen(true)}
            >
              Editar nota   
            </Button>
            
          </div>
           
          )}
          {
            !nota && (
              <Button
                onClick={() => setEditNotaOpen(true)}
              >
                Agregar nota
              </Button>
            )
          }
          {editNotaOpen && (
            <div
            className="border rounded-sm p-2
                       bg-primary-foreground/80 text-dark-grey
                       w-[96%] mx-auto "
          >
            <TextEditor
              closeEditor={() => setEditNotaOpen(false)}
              note={nota}
              id={id}
              updateNote={updateNote}
            />
            
          </div>
          )
          }
          {
            success && <div className="text-green-500">Nota actualizada</div>
          }
    </>
  )
}

export default NoteSection