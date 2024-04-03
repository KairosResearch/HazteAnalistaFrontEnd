import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-black text-white px-8 py-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-lg">Nombre de la empresa</h2>
                        <p>Dirección de la empresa</p>
                        <p>Contacto de la empresa</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <h3 className="font-bold">Análisis</h3>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold">Servicios</h3>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold">Nosotros</h3>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold">Contacto</h3>
                            <ul>
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer