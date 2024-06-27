import React from "react";
import Lessons from "@/components/shared/Lessons";
// import InputSearcher from '@/components/shared/InputSearcher';
import Dashboard from "@/components/shared/dashboard/Dashboard";
import DialogItem from "@/components/shared/DialogItem";
import DialogInstructions from "@/components/shared/on-boarding/DialogInstructions";
import {
  get4t,
  getDecision,
  getExchange,
  getSectores,
} from "@/services/backend/catalogos";
import AddProjectButton from "@/components/shared/AddProjectButton";
import { getProjectsList } from "@/services/backend/proyectsInfo";
import ReloadProjects from "@/components/shared/ReloadProjects";

const HomePage = async () => {
  const [data4t, decision, exchange, sector, projectsList] = await Promise.all([
    get4t(),
    getDecision(),
    getExchange(),
    getSectores(),
    getProjectsList(),
  ]);

  //const response = await fetch('http://localhost:3000/api/lessons');
  //const {lessons} = await response.json();

  return (
    <div>
      <DialogInstructions />
      
        <section className="seguimiento mb-8">
            <div className="flex items-center justify-between mt-4 2xl:my-8 md:my-3">
              <h1 className="text-2xl font-bold  2xl:text-4xl">
                Proyectos que me interesan:
              </h1>

              <div className="flex gap-4 items-center justify-center">
                {/* <div className="hidden md:block">
                  <ReloadProjects />
                </div> */}
                

                  <AddProjectButton />

                <DialogItem
                  projectsList={projectsList.proyectos}
                  mode="add"
                  catalogos={[data4t, decision, exchange, sector]}
                  data={null}
                  close={null}
                />
              </div>
            </div>
            {/* <div className="md:hidden">
              <ReloadProjects />
            </div> */}

            <Dashboard
              projectsList={projectsList.proyectos}
              catalogos={[data4t, decision, exchange, sector]}
            />
          </section>

          {/* Seccion de lecciones*/}
          <section className="2xl:py-4 py-2 xl:pt-8" id="lecciones-main-page">
            <div className="md:flex items-center justify-between lessons-header ">
              <h1 className="text-2xl 2xl:text-4xl font-bold ">
                Aprende a hacer un análisis:
              </h1>
              {/* <InputSearcher /> */}
            </div>
            <Lessons
            // lessons={lessons}
            />
          </section>

        
      
    </div>
  );
};

export default HomePage;
