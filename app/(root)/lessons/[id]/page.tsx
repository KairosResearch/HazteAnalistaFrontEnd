import React from 'react'
import Link from 'next/link'


interface PagePropsxd {
    params: {
        id: string
    }
}
import { redirect } from 'next/navigation'
const page = (
    {params}: PagePropsxd
) => {
    const numParam = parseInt(params.id);
  return (
    <div>
        <nav className='mx-auto flex items-center justify-between mb-9 w-[98%]'>
            {
                numParam === 0 ? null : (
                    <Link href={`/lessons/${numParam - 1}`}>
                        

                        Anterior
                    </Link>
                )
            }
            
            <h1 className='text-xl'>Esta es la lecccion: {params.id}</h1>
            <Link href={`/lessons/${numParam + 1}`}
                
            >
                Siguiente
            </Link>
        </nav>
        

       <article className='pl-5'>
       <div 
            dangerouslySetInnerHTML={{__html: `
                <html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>Manual del analista</title><style>
                </style></head><body><article id="33de3df8-08ff-4663-90f1-efea560d2e9b" class="page sans"><header><h1 class="page-title">Manual del analista</h1><p class="page-description"></p></header><div class="page-body"><h3 id="75834579-7200-4e28-ab8e-c3424019843a" class="">¿Cuál es el objetivo de esto?</h3><p id="8495ed6a-95a8-4d59-aab5-d1274379c909" class="">En este manual te enseñaremos las cosas básicas que cualquier analista debe de conocer para tener mayor claridad en su camino del análisis.</p><p id="afb02ae2-0239-40ce-8edc-d588bab05ccb" class="">La palabra <strong>ANÁLISIS PROVIENE DEL GRIEGO:</strong></p><ul id="73431b6a-22d8-4411-90cb-a56ba95f3dea" class="bulleted-list"><li style="list-style-type:disc"> <em><span style="border-bottom:0.05em solid">analýo</span></em> (ἀναλύω) →  “descomponer”. </li></ul><blockquote id="920ab3b9-4920-4c53-8b48-2faee9958044" class=""><em>El </em><em><strong><span style="border-bottom:0.05em solid">análisis es el proceso de examinar algo</span></strong></em><em> detalladamente para comprender sus partes, estructura o funcionamiento</em></blockquote><p id="db2cf7ca-b5fe-4363-8e95-42a1a6f0b07b" class="">La idea principal es que con esta guía tú puedas convertirte en un analista con la capacidad de tomar sus decisiones de inversión de manera fundamentadas y sobre todo que puedas crear un sistema que te permita formarte de acuerdo a tus tiempos.</p><h3 id="c6621ff0-c028-403c-8536-e9a3e9c4ea08" class="">¿Por qué estamos en el ecosistema de criptomonedas?</h3><p id="0d870b91-1aaf-494e-b9e0-b90ab6278739" class="">Seamos honestos, uno de los principales motivos por los cuales entramos o seguimos en este ecosistema es por las oportunidades que nos proporciona este mercado que opera 24/7.</p><p id="d76ae065-7cdf-429c-942a-1a85e432bd29" class="">Las oportunidades van desde:</p><ul id="e1fc9d2c-259c-4b65-a440-1ddfde47bf20" class="bulleted-list"><li style="list-style-type:disc">Conseguir rendimientos atractivos (vs. TradFi).</li></ul><ul id="a48044e1-d6bb-4a1e-a2b9-83a951b04b35" class="bulleted-list"><li style="list-style-type:disc">Generar ingresos pasivos </li></ul><ul id="0cb46de1-cbc6-4226-9c42-48c2c5bc4320" class="bulleted-list"><li style="list-style-type:disc">Tener acceso a financiamiento de manera descentralizada.</li></ul><ul id="70ebf121-8b80-4de7-a5e2-c6ce4c0bebad" class="bulleted-list"><li style="list-style-type:disc">Posibilidad de conseguir mejores oportunidades laborales.</li></ul><ul id="c17b91a4-bc0b-44b8-9dc9-d60f8d141098" class="bulleted-list"><li style="list-style-type:disc">Conectar con personas influyentes del ecosistema.</li></ul><ul id="9dbeba11-1b9c-4acf-b532-f73ebeb76ab0" class="bulleted-list"><li style="list-style-type:disc">Crear un proyecto o marca personal alrededor del ecosistema</li></ul><figure id="14356a84-0199-4967-8440-cb68cafc74b5" class="image"><img style="width:288px" src="/Untitled.png"/></a></figure><p id="0445ec15-78d7-4c3a-8b3e-2023aa845bab"    class="">Todas estás se pueden resumir en un concepto nombrado<em><strong> “Apuestas asimétricas”</strong></em> que significa que a veces puedes arriesgar una pequeña cantidad de recursos (dinero, tiempo o esfuerzo), esperando que la posible ganancia exceda totalmente la cantidad arriesgada.</p><blockquote id="2b530e2b-c8a5-42c2-b173-59fea61ef5e3" class=""><em>Situaciones donde existe una disparidad significativa entre la cantidad que se arriesga y la oportunidad de ganancia.</em></blockquote><p id="c2944204-bbe8-4cf9-b5c5-0a6374396124" class="">Otro tipo de actividades que nos proporcionan oportunidades similares de acuerdo con Naval Ravikant:</p><figure id="a3aed1d2-e2c4-4d87-9eeb-cfb4b6c80a2c" class="image"><img style="width:288px" src="/Untitled1.png"/></a></figure><p id="c790abd3-0c9b-4dcb-b8ae-cdc8ee0a2ac1" class="">A pesar de su fama por ser un activo de riesgo, las criptomonedas han traído consigo una adopción impresionante justamente por los beneficios que proporciona</p><p id="eef958af-30c4-40e8-a451-a9e7cbe8c8e6" class="">
                </p><p id="4d9aaab8-690e-4808-918c-c2549d0f25ae" class="">
                </p></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span></body></html>        
        `}}
        />
       </article>

        

    </div>
  )
}

export default page