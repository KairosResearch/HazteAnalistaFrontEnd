import React from 'react'



// import { Progress } from "@/components/ui/progress"

import { getProjectsList } from '@/services/backend/proyectsInfo'
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table";
import SelectAssetsName from '@/components/compare-assets/SelectAssetsName'
import ProgressBars from '@/components/compare-assets/ProgressBars'



const page = async () => {
    const projectsList = await getProjectsList()
  return (
    <div>
        
        <header>
            <h1>
                Compara el market cap de dos diferentes activos
            </h1>
            <p>
            Muestra el precio que tendría A si tuviera el market cap de B
            </p>
        </header>
        
        <section className='flex flex-col gap-4 my-6 mx-auto w-7/12'>
            <div className='flex justify-between items-center'>
                <SelectAssetsName 
                    projectsList={projectsList.proyectos}
                />
            </div>

            <ProgressBars />

        </section>
        {/* <section className='my-3 w-10/12 mx-auto'>
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
        </section> */}
    </div>
  )
}

export default page