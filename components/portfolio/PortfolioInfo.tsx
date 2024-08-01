import React from 'react'
import { CardContent } from '../ui/card'

const PortfolioInfo = () => {
  return (
    <CardContent className='flex lg:flex-col gap-16 text-lg lg:text-xl '>
        <section className='grid w-2/5 lg:w-full'>
            <div className="stats gap-9 bg-background stats-vertical lg:stats-horizontal shadow">
               

                <div className="stat py-1 rounded-md bg-black" >
                    <div className="stat-title">New Users</div>
                    <div className="stat-value text-lg lg:text-2xl ">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat py-1 bg-black rounded-md" >
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value text-lg lg:text-2xl ">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </section>

        <section className='grid w-3/5 lg:w-full gap-4'>

            <div className="stats  stats-vertical lg:stats-horizontal shadow">
                <div className="stat py-1  bg-black" >
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value text-lg lg:text-2xl ">31K</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat py-1  bg-black" >
                    <div className="stat-title">New Users</div>
                    <div className="stat-value text-lg lg:text-2xl ">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat py-1  bg-black" >
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value text-lg lg:text-2xl ">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                
            </div>
            <div className="stats  stats-vertical lg:stats-horizontal shadow">
                <div className="stat py-1  bg-black" >
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value text-lg lg:text-2xl ">31K</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat py-1  bg-black">
                    <div className="stat-title">New Users</div>
                    <div className="stat-value text-lg lg:text-2xl ">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat py-1  bg-black">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value text-lg lg:text-2xl ">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                
            </div>  
        </section>
        

    </CardContent>
  )
}

export default PortfolioInfo