import React from 'react'
import Chart from '@/components/portfolio/PieChartComponent'
import PortfolioInfo from '@/components/portfolio/PortfolioInfo'
import TokensInfo from '@/components/portfolio/TokensInfo'
import { Card } from '@/components/ui/card'
import { getBalances } from '@/services/backend/balances'

const page =  () => {
   
  return (
    <div>
        <section id="tokens">
            <h1>
                ¿Como está distribuido tu portafolio?
            </h1>

            
                <div>
                    <p>
                        Aquí puedes ver como está distribuido tu portafolio en base a las categorías que has creado.
                    </p>
                </div>
            <Card className='grid grid-cols-1 lg:grid-cols-2 p-6'>
                <Chart />
                <PortfolioInfo />
            </Card>
            
            <div>
                <TokensInfo></TokensInfo>
            </div>
                 

            
        </section>
        
    </div>
  )
}

export default page