'use client';
import React, {useState, useEffect} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useProjects } from '@/hooks/useProjects';
import { useDialogsNotes } from '@/hooks/useDialogs';
import DialogNotes from './DialogNotes';
import { TableData } from '@/index';


const NotesButton = () => {
    const {setIsOpenNote, setIdProject, idProject } = useDialogsNotes();
    const [projectNoteChosen, setProjectNoteChosen] = useState<TableData | null>(null);


    const [guzma, setGuzma] = useState<number | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem("guzma") !== null) {
          setGuzma(Number(window.localStorage.getItem("guzma")));
        }
      }, []);

    const { data } = useProjects(guzma ?? 0);

    useEffect(() => {
      if (projectNoteChosen) {
        console.log(projectNoteChosen.nota);

      }
    }, [projectNoteChosen]);

    //Para pasar el inicial value al editor
    // const [initialValue, setInitialValue] = useState<string | null>(null);
    // useEffect(() => {
    //     if (initialValue) {
    //         setInitialValue(initialValue);
    //     }
    // }, [idProject]);
  return (
    <>

   <DialogNotes 
                      initialValue={projectNoteChosen && projectNoteChosen.nota}
                      nombreProyecto={projectNoteChosen && projectNoteChosen.proyecto}

                      />
      
        <DropdownMenu>
        <DropdownMenuTrigger>+ Nota</DropdownMenuTrigger>
        <DropdownMenuContent>
            {/* <DropdownMenuLabel></DropdownMenuLabel> */}
            <DropdownMenuSeparator />
           {
                Array.isArray(data) && data.map((project) => {
                    return (
                    <>
                      <DropdownMenuItem className="cursor-pointer" key={project.id_proyecto} onClick={() => {
                        setIsOpenNote(true)
                        setIdProject(project.id_proyectoInicial)
                        setProjectNoteChosen(project)
                    }}>
                        {project.proyecto}

                        
                    </DropdownMenuItem>

                      
                      
                    </>
                    
                    );
                })
            }
        </DropdownMenuContent>
        

        </DropdownMenu>
    </>
  )
}

export default NotesButton