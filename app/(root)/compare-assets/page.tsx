import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import ComboboxDemo from '@/components/dashboard/form/ComboboxName'
import { getProjectsList } from '@/services/backend/proyectsInfo'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import SelectAssetsName from '@/components/compare-assets/SelectAssetsName'



const page = async () => {
    const projectsList = await getProjectsList()
  return (
    <div>
        
        <h1>
                Compara  el market cap de diferentes activos
            </h1>

        <section className='flex flex-col gap-4 my-6 mx-auto w-7/12'>
            <div className='flex justify-between items-center'>
                <SelectAssetsName 
                    projectsList={projectsList.proyectos}
                />
            </div>
            <h2 className='text-center text-lg font-light  text-grey-light'>
                USDT con el market cap de ETH
            </h2>
            <div className='flex items-center w-3/5 mx-auto justify-between font-bold text-2xl'>
            <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={40}
                            height={40}
                        />
                <p>
                $1,234,567,890.123
                </p>
                <p>
                    (1.23 X)
                </p>
            </div>
            <div className='w-4/5 mx-auto flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <div className='w-1/2'>
                        <Progress variant="first" value={50} /> 
                    </div>
                    <div>
                        <Image
                                src="https://static.alchemyapi.io/images/assets/825.png"
                                alt="usdt"
                                width={20}
                                height={20}
                            />
                    </div>
                    <p className='text-green-dark'>
                        $1,234,567,890.123
                    </p>
                   
                    
                
                </div>
                 
                <div className='flex justify-between items-center'>
                    <div className='w-1/2'>
                        <Progress variant="last" value={20} /> 
                    </div>
                    <div>
                        
                    <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={20}
                            height={20}
                        />
                    </div>
                    <p className='text-destructive'>
                        $1,234,567,890.123
                    </p>
                   
                    
                
                </div>
                <div className='flex justify-between items-center'>
                    <div className='w-1/2'>
                        <Progress variant="progress" value={35} /> 
                    </div>
                    <div>
                        <span>
                            progreso
                        </span>
                    </div>
                    <p className='text-green-light'>
                        $1,234,567,890.123
                    </p>
                   
                    
                
                </div>
                
            </div>

            <h2 className='text-center text-lg text-grey-light font-light mt-0'>
            BTC está  1.23X por encima de ETH
            </h2>

        </section>
        <section className='my-3 w-10/12 mx-auto'>
            <Table>
                <TableHeader className='bg-black'>
                    <TableRow>
                        <TableHead />
                        <TableHead>
                            <div className='flex gap-2 items-center place-content-center'>
                                <Image
                                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                                alt="btc"
                                width={20}
                                height={20}
                            />
                            <span className='font-extrabold text-2xl'>
                                BTC
                            </span>         
                            </div>
                        
                        </TableHead>
                        <TableHead>
                            <div className='flex gap-2 items-center place-content-center'>
                                    <Image
                                src="https://static.alchemyapi.io/images/assets/825.png"
                                alt="usdt"
                                width={20}
                                height={20}
                            />
                            <span className='font-extrabold text-2xl'>
                                USDT
                            </span>     
                            </div>
                            
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className='w-[10%]'>
                           Precio
                        </TableCell>
                        <TableCell>
                            $1,234,567,890.123
                        </TableCell>
                        <TableCell>
                            1.23X
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            ATH
                        </TableCell>
                        <TableCell>
                            $1,234,567,890.123
                        </TableCell>
                        <TableCell>
                            1.23X
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Acerca de
                        </TableCell>
                        <TableCell>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam necessitatibus assumenda voluptatum sunt in exercitationem aperiam perspiciatis deleniti ab dolores natus, aliquid inventore provident saepe corporis illo sit? Minima, eligendi!
                        </TableCell>
                        <TableCell>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nihil eius fugit recusandae earum sunt, soluta, iusto, rem facere ipsam qui! Commodi, mollitia velit eaque sit porro rem! A, amet!
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Utilizado por 
                        </TableCell>
                        <TableCell>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde odio voluptate tenetur delectus similique illum magnam labore, eligendi facere commodi quisquam laudantium placeat! Unde aspernatur minima consectetur, provident quod esse!
                        </TableCell>
                        <TableCell>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur officia mollitia soluta hic, blanditiis nisi sit id pariatur placeat, libero aut assumenda. Expedita architecto perferendis explicabo nihil numquam? Provident, quidem?
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    </div>
  )
}

export default page