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


import { Badge } from '../ui/badge';
import DialogItem from './DialogItem';
import DialogAlert from './DialogAlert';

//import {useUserDar}  from '@/contexts/ContextProvider';
import {  getSectores } from '@/services/backend/catalogos';
import { rangeDesigner } from '@/utils';

//Hook de useUserData
// import { useUserData } from '@/hooks/useUserData';
import { useUserTableData } from '@/hooks/useUserData';
import { tableDataDefault } from '@/lib/data';



import { TableData } from '@/index';
import { DashboardProps } from '@/index';
import { handleGetProyects } from '@/actions/proyectActions';
import { Button } from '../ui/button';


const Dashboard = (
  { catalogos, projectsList}: DashboardProps
) => {

  //Seteamos el userId como estado global usando el hook useUserData

  const { userTableData } = useUserTableData();
  // const {userId} = useUserData();
 

  // const [sectores, setSectores] = useState<any[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);

  
  //State for Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);


  


  useEffect(() => {
    // if (JSON.stringify(prevUserTableData) !== JSON.stringify(userTableData)) {
      const fetchData = async () => {
        if(typeof window !== undefined && window.localStorage.getItem('guzma') !== null){
          const guzma = Number(window.localStorage.getItem('guzma'));
          console.log('guzma', guzma)
          // console.log('userid', userId)
          const data = await handleGetProyects(guzma ?? 0);
          if (typeof data === 'string') {
            setTableData([]);
          } else {
            setTableData(data || []);
          }
          
        }
        
      }
      fetchData();
      
    // }
  }, [userTableData]);

  const sectores = catalogos[3];

  
  
  const range = (marketCap: number) => {
    const a  = rangeDesigner(marketCap);
    return a;
  }
   

  return (
    <Table className="border border-grey-light ">
      <TableHeader className=''>

        <TableRow className='divide-x-2 divide-y sticky top-[-1px] border-grey-light bg-dark-grey/95 z-50 divide-grey-light'>
          <TableHead className="" >Proyecto</TableHead>
          <TableHead className="">Ticker</TableHead>
          {/* <TableHead className="">Metodo 4E</TableHead> */}
          <TableHead className="">Decisión</TableHead>
          <TableHead className="">Market Cap</TableHead>
          <TableHead className="">Rango</TableHead> 
          <TableHead className="">ATH</TableHead>
          <TableHead className="">Sector</TableHead>
          <TableHead className="">Exchange</TableHead>
          <TableHead className="">Precio Actual</TableHead>
          <TableHead className="">Precio Entrada</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      {/* First two data, by default */}
      {tableData  && tableData.length === 0 && (
        <TableRow className=''>
          <TableCell className="font-medium border-2 " colSpan={11}>
            <p className='pb-3 text-center'> 
              No hay proyectos registrados! Registra tu primer proyecto!
            </p>
          </TableCell>
        </TableRow>
      )}

       
      {/* Data directly manipulated by the user */}
        {tableData && tableData.map((data) => (
          <TableRow 
            className='divide-x-2 divide-y-2 divide-green-dark hover:bg-primary/10 cursor-pointer' key={data.id_proyecto}
            onClick={() => {
              setSelectedRow(data);
              setIsDialogOpen(true);
            }}>
            <TableCell className="font-medium border-2 border-green-dark relative">
              <p className=''> 
                {data.proyecto}
              </p>
            </TableCell>

            <TableCell className="whitespace-nowrap">
              {data.ticker}

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
            <TableCell> 
              <Badge
                variant={(data.id_decision_proyecto === 2) ? 'decisionWatchlist' : (data.id_decision_proyecto === 1) ? 'desicionInvest' : 'desicionLeave'}
              >
              {data.id_decision_proyecto === 1 ? 'Invertir' : data.id_decision_proyecto === 2 ? 'Watchlist' : 'Descartar'}
              </Badge>
            </TableCell>
            {/******Market Cap**** */}
            <TableCell className="whitespace-nowrap">
              $ {
                data.market_cap.toLocaleString()  
              }

            </TableCell> 
            {/******Rango**** */}
            <TableCell>
              <Badge 
                variant='range'
                color={
                (range(data.market_cap) === MID) ? 'blue' : (range(data.market_cap) === LOW) ? 'orange' : (range(data.market_cap) === LARGE) ? 'green' : 'brown'
              }>
              {range(data.market_cap)}
              </Badge>
          </TableCell>  
            {/******Si ATH**** */}
            <TableCell>
              {data.siAth}X
              </TableCell>
            {/******Sector**** */}
            <TableCell>
              {
                sectores.find(sector => sector.value === data.idSector) && (
                  <Badge>
                    {sectores.find(sector => sector.value === data.idSector)?.label}
                  </Badge>
                )
              }
            </TableCell>
            {/******Exchange**** */}
            <TableCell>
              <Badge>
              {data.idExchange === 1 ? 'Binanses' : data.idExchange === 2 ? 'Coinbase' : 'Kraken'}
              </Badge>
            </TableCell>
            {/****** precio actual**** */}
            <TableCell className="whitespace-nowrap">
              $ {data.price.toLocaleString()}

            </TableCell>
            {/******precio entrada**** */}
            <TableCell className="whitespace-nowrap">
              $ {data.precioEntrada.toLocaleString()}

            </TableCell>
          
            
          </TableRow> 


       ))} 
      </TableBody>


      {isDialogOpen && (
        <DialogInfo
          projectsList={projectsList}
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