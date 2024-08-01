import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const TokensInfo = () => {
  return (
    <>
        <Table>
            <TableHeader className='bg-black'>
                <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Valor en USD</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>ETH</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>1,200</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>DAI</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>1,200</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ETH</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>1,200</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>DAI</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>1,200</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ETH</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>1,200</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>DAI</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>1,200</TableCell>
                    <TableCell>1,200</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
  )
}

export default TokensInfo