import React from 'react'

const Navbar = () => {
  return (
    
    <header className="header">
            <div>
                <a className=" text-xl font-bold md:text-2xl" href="#">
                Brand
                </a>
            </div>
    
            <div>
                <input className='search' type="text" title='main-searcher' placeholder='Buscar lección'/>
            </div>
    </header>

  )
}

export default Navbar