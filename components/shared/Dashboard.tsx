'use client';
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { tableData } from '@/lib/data';
import { Badge } from '../ui/badge';
import DialogItem from './DialogItem';
//import {useStateContext}  from '@/contexts/ContextProvider';



const Dashboard = () => {
  return (
    <Table className="border border-grey-light">
      <TableHeader className=''>
        <TableRow className='divide-x divide-y divide-grey-light bg-dark-grey'>
          <TableHead colSpan={1}>Proyecto</TableHead>
          <TableHead className="md:text-center" colSpan={9}>Protocolos</TableHead>
        </TableRow>
        <TableRow className='divide-x divide-y divide-gray-200'>
          <TableHead className=''>Proyecto</TableHead>
          <TableHead>Ticket</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Metodo 4E</TableHead>
          <TableHead>Decisión</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead>Rango</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>Exchange</TableHead>
          <TableHead className="text-right">Registro</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => (
          <TableRow className='divide-x-2 divide-y-2 divide-green-dark' key={data.proyectName}>
            <TableCell className="font-medium border-2 border-green-dark relative">
              <p>
                {data.proyectName}
                <DialogItem mode="edit" />
              </p>
            </TableCell>
            <TableCell>
              {data.ticket}

            </TableCell>
            {/******Tipo**** */}
            <TableCell>
              <Badge 
                variant={(data.tipo === 'Reflexion') ? 'typeReflection' : (data.tipo === 'Narrativa') ? 'typeNarrative' :  'typeProyect'}
                >{data.tipo}
              </Badge>
              </TableCell>
              {/******Metodo 4E**** */}
            <TableCell>
              <Badge
                variant='fourE'
                color={
                (data.theE === 'Evaluar') ? 'yellow' : (data.theE === 'Encontrar') ? 'grey' : (data.theE === 'Estudiar') ? 'blue' : 'green'
              }>
                {data.theE}
              </Badge>
            </TableCell>
            {/******Decision**** */}
            <TableCell>
              <Badge
                variant={(data.decision === 'Watchlist') ? 'decisionWatchlist' : (data.decision === 'Invertir') ? 'desicionInvest' : 'desicionLeave'}
              >
              {data.decision}
              </Badge>
            </TableCell>
            <TableCell>
              $ {data.cap}

            </TableCell>
            {/******Rango**** */}
            <TableCell>
              <Badge 
                variant='range'
                color={
                (data.rango === 'Blue Chips') ? 'blue' : (data.rango === 'Mid Caps') ? 'orange' : (data.rango === 'Large Caps') ? 'green' : 'brown'
              }>
              {data.rango}
              </Badge>
            </TableCell>
            {/******Sector**** */}
            <TableCell>
              <Badge>
              {data.sector}
              </Badge>
            </TableCell>
            {/******Exchange**** */}
            <TableCell>
              <Badge>
              {data.exchange}
              </Badge>
            </TableCell>
            <TableCell>
          
              {data.fecha}
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Dashboard