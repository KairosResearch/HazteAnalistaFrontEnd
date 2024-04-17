'use client';
import React, {useEffect, useState} from 'react'
import { POP, LOW, MID, LARGE, BLUE } from '@/lib/constants';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { tableDataDefault } from '@/lib/data';
import { Badge } from '../ui/badge';
import DialogItem from './DialogItem';
import DialogAlert from './DialogAlert';
import { useUserData, useUserTableData } from '@/hooks/useUserData';

//import {useUserDar}  from '@/contexts/ContextProvider';
import { getProyects } from '@/services/backend/proyects';
import {  getSectores } from '@/services/backend/catalogos';
import { rangeDesigner } from '@/lib/utils';


interface TableData {
  nombre: string;
  ticket: string;
  id4e: number;
  id_decision_proyecto: number;
  marketCap: number;
  siAth: number;
  idSector: number;
  idExchange: number;
  precioEntrada: number;
  precioActual: number;
}



const Dashboard = (accesToken: any, catalogos: [][]) => {
  
  const {userId} = useUserData();
  const {userTableData } = useUserTableData();
  
  const [sectores, setSectores] = useState<any[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getProyects(accesToken, userId);
      if (data.error){
        setTableData([]);
        alert('Tenemos problemas internos con el servidor. Buscamos solucionarlo!')
      }
      const sectores = await getSectores();
      setSectores(sectores);
      setTableData(data.proyectos);
    };
    fetchData();
  }, []);



  useEffect(() => {
      // setTableData(userTableData);
      const  fetchData = async () => {
        const data = await getProyects(accesToken, userId);
        if(data.error){
          setTableData([]);
          alert('Tenemos problemas internos con el servidor. Buscamos solucionarlo!')
        }
        setTableData(data.proyectos);
      }
      fetchData();
  }, [userTableData]);

  
  
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
        {tableDataDefault.map((data) => (
          <TableRow className='divide-x-2 divide-y-2 divide-green-dark' key={data.proyectName}>
          <TableCell className="font-medium border-2 border-green-dark relative">
            <p className='pb-6 pr-12'> 
              {data.proyectName}
              <DialogItem 
                mode="edit" 
                catalogos={catalogos}
              />
              <DialogAlert action="deleteProyect"/>
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
          <TableCell>
            $ {data.cap}

          </TableCell>
          {/******Rango**** */}
           <TableCell>
            <Badge 
              variant='range'
              color={
              (range(Number(data.cap)) === BLUE) ? 'blue' : (range(Number(data.cap)) === MID) ? 'orange' : (range(Number(data.cap)) === LARGE) ? 'green' : 'brown'
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
          <TableCell>
            $ {data.precioEntrada}

          </TableCell>
          {/******precio salida**** */}
          <TableCell>
            $ {data.precioSalida}

          </TableCell>
        </TableRow>
        ))}
        {tableData && tableData.map((data) => (
          <TableRow className='divide-x-2 divide-y-2 divide-green-dark' key={data.nombre}>
            <TableCell className="font-medium border-2 border-green-dark relative">
              <p className='pb-3 '> 
                {data.nombre}
                <DialogItem 
                  mode="edit" 
                  catalogos={catalogos}
                />
                <DialogAlert action="deleteProyect"/>
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
                (data.id4e === 1) ? 'yellow' : (data.id4e === 2) ? 'grey' : (data.id4e === 3) ? 'blue' : 'green'
              }>
                {data.id4e === 1 ? 'Encontrar' : data.id4e === 2 ? 'Estudiar' : data.id4e === 3 ? 'Ejecutar' : 'Evaluar'}
              </Badge>
            </TableCell>
            {/******Decision**** */}
            <TableCell>
              <Badge
                variant={(data.id_decision_proyecto === 2) ? 'decisionWatchlist' : (data.id_decision_proyecto === 1) ? 'desicionInvest' : 'desicionLeave'}
              >
              {data.id_decision_proyecto === 1 ? 'Invertir' : data.id_decision_proyecto === 2 ? 'Watchlist' : 'Descartar'}
              </Badge>
            </TableCell>
            {/******Market Cap**** */}
            <TableCell>
              $ {data.marketCap}

            </TableCell>
            {/******Rango**** */}
           <TableCell>
            <Badge 
              variant='range'
              color={
              (range(data.marketCap) === BLUE) ? 'blue' : (range(data.marketCap) === MID) ? 'orange' : (range(data.marketCap) === LARGE) ? 'green' : 'brown'
            }>
            {range(data.marketCap)}
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
                    {sectores.find(sector => sector.value === data.idSector).label}
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
            {/****** precio entrada**** */}
            <TableCell>
              $ {data.precioEntrada}

            </TableCell>
            {/******precio salida**** */}
            <TableCell>
              $ {data.precioActual}

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

export default React.memo(Dashboard);