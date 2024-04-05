'use client';
import React, {useEffect, useState} from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
//import { tableData } from '@/lib/data';
import { Badge } from '../ui/badge';
import DialogItem from './DialogItem';
import DialogAlert from './DialogAlert';
//import {useStateContext}  from '@/contexts/ContextProvider';

interface TableData {
  proyectName: string;
  ticket: string;
  theE: string;
  decision: string;
  cap: number;
  rango: string;
  siAth: number;
  sector: string;
  exchange: string;
  precioEntrada: number;
  precioSalida: number;
}



const Dashboard = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/table');
      const {tableData} = await response.json();
      setTableData(tableData);
      console.log(tableData);
    };
  
    fetchData();
  }, []);
  

   

  return (
    <Table className="border border-grey-light">
      <TableHeader className=''>
        <TableRow className='divide-x divide-y divide-grey-light bg-dark-grey'>
          <TableHead className="" colSpan={1}>Proyecto</TableHead>
          <TableHead className=" md:text-center" colSpan={10}>Protocolos</TableHead>
        </TableRow>
        <TableRow className='divide-x-2 divide-y sticky top-[-1px] border-grey-light bg-dark-grey/95 z-50 divide-grey-light'>
          <TableHead className="" >Proyecto</TableHead>
          <TableHead className="">Ticket</TableHead>
          <TableHead className="">Metodo 4E</TableHead>
          <TableHead className="">Decisión</TableHead>
          <TableHead className="">Market Cap</TableHead>
          <TableHead className="">Rango</TableHead>
          <TableHead className="">Si Ath</TableHead>
          <TableHead className="">Sector</TableHead>
          <TableHead className="">Exchange</TableHead>
          <TableHead className="">Precio Entrada</TableHead>
          <TableHead className="">Precio Actual</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData && tableData.map((data) => (
          <TableRow className='divide-x-2 divide-y-2 divide-green-dark' key={data.proyectName}>
            <TableCell className="font-medium border-2 border-green-dark relative">
              <p className='pb-3 '> 
                {data.proyectName}
                <DialogItem mode="edit" />
                <DialogAlert action="deleteProyect"/>
              </p>
            </TableCell>
            <TableCell>
              {data.ticket}

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
            {/******Market Cap**** */}
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
            {/******Si ATH**** */}
            <TableCell>
              {data.siAth}X
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
            {/****** precio entrada**** */}
            <TableCell>
              $ {data.precioEntrada}

            </TableCell>
            {/******precio salida**** */}
            <TableCell>
              $ {data.precioSalida}

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Dashboard