'use client';
import React, {useEffect, useState} from 'react'
import {  LOW, MID, LARGE, } from '@/lib/constants';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import DialogInfo from './DialogInfo';

import { tableDataDefault } from '@/lib/data';
import { Badge } from '../ui/badge';
import DialogItem from './DialogItem';
import DialogAlert from './DialogAlert';
import { useUserTableData } from '@/hooks/useUserData';

//import {useUserDar}  from '@/contexts/ContextProvider';
import {  getSectores } from '@/services/backend/catalogos';
import { rangeDesigner } from '@/utils';



//Types
import { TableData } from '@/index';
import { DashboardProps } from '@/index';
import { handleGetProyects } from '@/actions/proyectActions';
import { Button } from '../ui/button';

const Dashboard = (
  { catalogos}: DashboardProps
) => {

  //const {userTableData } = useUserTableData();

  const [sectores, setSectores] = useState<any[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);

  
  //State for Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await handleGetProyects();
  //     if (data.error){
  //       setTableData([]);
  //       alert('Tenemos problemas internos con el servidor. Buscamos solucionarlo!')
  //     }
  //     const sectores = await getSectores();
  //     setSectores(sectores);
  //     console.log('data.proyectos', data)
      
  //     //setTableData(data);
  //   };
  //   fetchData();
  // }, []);


  // useEffect(() => {
  //   // if (JSON.stringify(prevUserTableData) !== JSON.stringify(userTableData)) {
  //     const fetchData = async () => {
  //       const data = await handleGetProyects();
  //       if (data.error) {
  //         setTableData([]);
  //         alert('Tenemos problemas internos con el servidor. Buscamos solucionarlo!')
  //       }
  //       setTableData(data.proyectos);
  //     }
  //     fetchData();
      
  //   // }
  // }, [userTableData]);

  
  
  const range = (marketCap: number) => {
    const a  = rangeDesigner(marketCap);
    return a;
  }
   

  return (
    <Table className="border border-grey-light ">
      <TableHeader className=''>
        <TableRow className='divide-x divide-y divide-grey-light bg-dark-grey'>
          <TableHead className="" colSpan={1}>Proyecto</TableHead>
          <TableHead className=" md:text-center" colSpan={10}>Protocolos</TableHead>
        </TableRow>
        <TableRow className='divide-x-2 divide-y sticky top-[-1px] border-grey-light bg-dark-grey/95 z-50 divide-grey-light'>
          <TableHead className="" >Proyecto</TableHead>
          <TableHead className="">Ticker</TableHead>
          <TableHead className="">Metodo 4E</TableHead>
          <TableHead className="">Decisión</TableHead>
          <TableHead className="">Market Cap</TableHead>
          <TableHead className="">Rango</TableHead>
          <TableHead className="">ATH</TableHead>
          <TableHead className="">Sector</TableHead>
          <TableHead className="">Exchange</TableHead>
          <TableHead className="">Precio Entrada</TableHead>
          <TableHead className="">Precio Actual</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      {/* First two data, by default */}
      {tableDataDefault.map((data) => (
          <TableRow className='divide-x-2 divide-y-2 divide-green-dark hover:bg-primary/10 cursor-pointer' key={data.proyectName}
          onClick={() => {
            setSelectedRow(data);
            setIsDialogOpen(true);
          }}>
          <TableCell className="font-medium border-2 border-green-dark relative">
            <p className='pb-6 pr-12'> 
              {data.proyectName}
              {/* <DialogItem 
                mode="edit" 
                catalogos={catalogos}
                user={user}
              /> */}
              {/* <DialogAlert 
                action="deleteProyect"
                user={user}  
              /> */}
            </p>
          </TableCell>
          <TableCell>
            ${data.ticket}

          </TableCell>
          {/******Metodo 4E**** */}
          <TableCell>
            <Badge
              variant='fourE'
              color={
              (data.theE === 'Evaluar') ? 'yellow' : (data.theE === 'Encontrar') ? 'grey' : (data.theE === 'Ejecutar') ? 'blue' : 'green'
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
          <TableCell className="whitespace-nowrap" >
            $ {data.cap.toLocaleString()}

          </TableCell>
          {/******Rango**** */}
           <TableCell>
            <Badge 
              variant='range'
              color={
              (range(Number(data.cap)) === MID) ? 'blue' : (range(Number(data.cap)) === LOW) ? 'orange' : (range(Number(data.cap)) === LARGE) ? 'green' : 'brown'
            }>
            {range(Number(data.cap))}
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
          <TableCell className="whitespace-nowrap" >
            $ {data.precioEntrada}

          </TableCell>
          {/******precio salida**** */}
          <TableCell className="whitespace-nowrap">
            $ {data.precioSalida}

          </TableCell>
        </TableRow>
        ))}

       
      {/* Data directly manipulated by the user */}
        {/* {tableData && tableData.map((data) => (
          <TableRow 
            className='divide-x-2 divide-y-2 divide-green-dark hover:bg-primary cursor-pointer' key={data.id_proyecto}
            onClick={() => {
              setSelectedRow(data);
              setIsDialogOpen(true);
            }}>
            <TableCell className="font-medium border-2 border-green-dark relative">
              <p className='pb-3 '> 
                {data.nombre}
              </p>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              ${data.ticket}

            </TableCell>
            {/******Metodo 4E**** */}
            {/* <TableCell>
              <Badge
                variant='fourE'
                color={
                (data.id4e === 1) ? 'yellow' : (data.id4e === 2) ? 'grey' : (data.id4e === 3) ? 'blue' : 'green'
              }>
                {data.id4e === 1 ? 'Encontrar' : data.id4e === 2 ? 'Estudiar' : data.id4e === 3 ? 'Ejecutar' : 'Evaluar'}
              </Badge>
            </TableCell> */}
            {/******Decision**** */}
            {/* <TableCell>
              <Badge
                variant={(data.id_decision_proyecto === 2) ? 'decisionWatchlist' : (data.id_decision_proyecto === 1) ? 'desicionInvest' : 'desicionLeave'}
              >
              {data.id_decision_proyecto === 1 ? 'Invertir' : data.id_decision_proyecto === 2 ? 'Watchlist' : 'Descartar'}
              </Badge>
            </TableCell>
            {/******Market Cap**** */}
            {/* <TableCell className="whitespace-nowrap">
              $ {data.marketCap.toLocaleString()}

            </TableCell>  */}
            {/******Rango**** */}
           {/* <TableCell>
            <Badge 
              variant='range'
              color={
              (range(data.marketCap) === MID) ? 'blue' : (range(data.marketCap) === LOW) ? 'orange' : (range(data.marketCap) === LARGE) ? 'green' : 'brown'
            }>
            {range(data.marketCap)}
            </Badge>
          </TableCell>  */}
            {/******Si ATH**** */}
            {/* <TableCell>
              {data.siAth}X
              </TableCell> */}
            {/******Sector**** */}
            {/* <TableCell>
              {
                sectores.find(sector => sector.value === data.idSector) && (
                  <Badge>
                    {sectores.find(sector => sector.value === data.idSector).label}
                  </Badge>
                )
              }
            </TableCell> */}
            {/******Exchange**** */}
            {/* <TableCell>
              <Badge>
              {data.idExchange === 1 ? 'Binanses' : data.idExchange === 2 ? 'Coinbase' : 'Kraken'}
              </Badge>
            </TableCell> */}
            {/****** precio entrada**** */}
            {/* <TableCell className="whitespace-nowrap">
              $ {data.precioEntrada}

            </TableCell> */}
            {/******precio salida**** */}
            {/* <TableCell className="whitespace-nowrap">
              $ {data.precioActual}

            </TableCell>
          
            
          </TableRow> */}


        {/* ))}  */}
      </TableBody>


      {isDialogOpen && (
        <DialogInfo
          isDialogOpen={isDialogOpen}
          close={() => setIsDialogOpen(false)}
          selectedRow={selectedRow}
          catalogos={catalogos}
        />
      )}
    </Table>

  )
};

export default React.memo(Dashboard);