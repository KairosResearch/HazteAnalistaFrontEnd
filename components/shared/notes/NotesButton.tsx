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


const NotesButton = () => {
    const {setIsOpenNote, setIdProject } = useDialogsNotes();

    const [guzma, setGuzma] = useState<number | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem("guzma") !== null) {
          setGuzma(Number(window.localStorage.getItem("guzma")));
        }
      }, []);

    const { data } = useProjects(guzma ?? 0);
  return (
    <>
        <DropdownMenu>
        <DropdownMenuTrigger>+ Nota</DropdownMenuTrigger>
        <DropdownMenuContent>
            {/* <DropdownMenuLabel></DropdownMenuLabel> */}
            <DropdownMenuSeparator />
           {
                Array.isArray(data) && data.map((project) => {
                    return (
                    <DropdownMenuItem className="cursor-pointer" key={project.id_proyecto} onClick={() => {
                        setIsOpenNote(true)
                        setIdProject(project.id_proyectoInicial)
                    }}>
                        {project.proyecto}
                    </DropdownMenuItem>
                    );
                })
            }
        </DropdownMenuContent>
        <DialogNotes />

        </DropdownMenu>
    </>
  )
}

export default NotesButton