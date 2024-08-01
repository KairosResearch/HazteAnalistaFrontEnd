//Imports for the component.
//Next
import Link from "next/link";
//React
import React from "react";

const Footer = () => {
  return (
    <footer className={` bg-black text-white md:px-8 md:py-4 p-2 `}>
      <div className="container mx-auto text-sm">
        <div className="flex flex-col md:flex-row justify-between  ">
          <div className="mb-4 md:mb-0 w-[70%]">
            <h2 className="font-bold text-lg mb-1">Kairos Research</h2>
            <p>&copy;2023 Kairos Research. All rights reserved</p>
          </div>
          <div className="grid grid-cols-2 w-full md:grid-cols-4 gap-4 ">
            <div>
              <h3 className=" mb-1 font-bold">Análisis</h3>
              <ul className="text-xs">
                <li className="list-none">
                  <Link
                    target="_blank"
                    href="https://www.kairosresearch.xyz/insights"
                  >
                    Todos los analisis
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className=" mb-1 font-bold">Legales</h3>
              <ul className="text-xs">
                <li className="list-none">
                  <Link
                    target="_blank"
                    href="https://www.kairosresearch.xyz/terminos-condiciones"
                  >
                    Terminos de uso
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    target="_blank"
                    href="https://www.kairosresearch.xyz/politica-de-privacidad"
                  >
                    Politica de privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className=" mb-1 font-bold">Servicios</h3>
              <ul className="text-xs">
                <li className="list-none">
                  <Link
                    target="_blank"
                    href="https://www.kairosresearch.xyz/tokenengineering"
                  >
                    Token Enginnering
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    target="_blank"
                    href="https://www.kairosresearch.xyz/web3consulting"
                  >
                    Asesoria Web3
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className=" mb-1 font-bold">Contacto</h3>
              <ul className="text-xs">
                <li className="list-none">
                  <Link target="_blank" href="https://x.com/Research_Kairos">
                    X | Twitter
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/company/research-kairos/posts/?feedView=all"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li className="list-none">
                  <Link target="_blank" href="https://t.me/Kairos_Research">
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
