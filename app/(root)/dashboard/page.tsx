import React from "react";
import Lessons from "@/components/shared/Lessons";
// import InputSearcher from '@/components/shared/InputSearcher';
import Dashboard from "@/components/shared/Dashboard";
import DialogItem from "@/components/shared/DialogItem";
import {
  get4t,
  getDecision,
  getExchange,
  getSectores,
} from "@/services/backend/catalogos";
import AddProjectButton from "@/components/shared/AddProjectButton";
import { getProjectsList } from "@/services/backend/proyectsInfo";
import ReloadProjects from "@/components/shared/ReloadProjects";
import DialogInstructions from "@/components/shared/DialogInstructions";

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
    <div className={`md:w-full px-4 2xl:w-full `}>
      <div className="2xl:px-24 pl-1 ">
        {/* Seccion de lecciones*/}
        <section className="2xl:py-4 py-2 xl:pt-8" id="lecciones-main-page">
          <div className="md:flex items-center justify-between lessons-header ">
            <h1 className="text-2xl 2xl:text-4xl font-bold hidden md:block">
              Lecciones:
            </h1>
            {/* <InputSearcher /> */}
          </div>
          <Lessons
          // lessons={lessons}
          />
        </section>

        <section id="mochila" className="seguimiento mb-8">
          <div className="flex items-center justify-between mt-4 2xl:my-8 md:my-3">
            <h1 className="text-2xl font-bold  2xl:text-4xl">
              Dashboard de seguimiento:
            </h1>

            <div className="flex gap-4 items-center justify-center">
              {/* <div className="hidden md:block">
                <ReloadProjects />
              </div> */}
              <DialogInstructions />

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
      </div>
    </div>
  );
};

export default HomePage;
