import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AnalysisForm from "@/components/analysis/AnalysisForm";



interface pageProps {
  params: {
    project: string;
  }
}

const page = ({params}: pageProps) => {
  const projectName = decodeURIComponent(params.project);
  return( 
  <>
    <header className="mb-10  ">
      <h1>Realiza tu análisis - {projectName}</h1>
      

      <div className="sticky top-1 z-20 mt-10 bg-dark-black/50 text-primary-foreground/70 w-full rounded flex flex-col text-sm  p-1 px-2">
          <div>
            <h2>Promedio del proyecto: 100%</h2>
          </div>
          <div>
            <h2>Promedio cualitativo: 100/100</h2>
          </div>
          <div>
            <h2>Promedio del cuantitativo: 100/100</h2>
          </div>
      </div>
      
    </header>
    
    <section className="mb-8">
      
      
      <Card  className="bg-grey-light/15 py-4 px-2 border-primary-foreground/40">
        
        <CardContent>
        <h1 className="text-primary">Análisis cualitativo</h1>
        <p>Aqui realizarás tu analísis cualitativo</p>
          <AnalysisForm 
            type="cual"
          />
        </CardContent>
      </Card>
      
    </section>
    
    <section >
      
      <Card className="bg-grey-light/15 py-4 px-2 border-primary-foreground/40" >
        
          
        
        

        <CardContent>
        <h1 className="text-primary">Análisis cuantitativo</h1>
        <p>Aqui realizarás tu analísis cuantitativo</p>
        <AnalysisForm 
            type="cuant"
          />
        </CardContent>  
      </Card>
    </section>
   
   
        
    
        
      
        
         
        
      
  </>
);
};

export default page;
