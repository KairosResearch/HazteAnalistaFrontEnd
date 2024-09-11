import React from "react";
import ListProjects from "@/components/analysis/ListProjects";

const page = async () => {
  // const [tokenomics, onChain, alianza, auditorias, useCases, comunity, financeCuant, finance, teamMembers, roadmap, whitepaper, exchanges] =
  //   await Promise.all([
  //     getTokenomics(),
  //     getOnChain(),
  //     getAlianza(),
  //     getAuditorias(),
  //     getUseCases(),
  //     getComunity(),
  //     getFinanceCuant(),
  //     getFinance(),
  //     getTeamMembers(),
  //     getRoadmap(),
  //     getWhitepaper(),
  //     getExchanges(),
  //   ]);

  return (
    <main>
      {/* <h1>Análisis express a profundidad:</h1> */}

      <section className="px-1">
        <h1>Lista de tus proyectos analizados:</h1>
        <p>
          En este apartado podrás visualizar los proyectos registrados y
          realizar análisis mediante nuestro checklist, conocido como análisis
          express. Este proceso te permite asignar una puntuación rápida a tus
          proyectos, evaluando tanto aspectos cualitativos como cuantitativos.
          De esta forma, podrás valorar de manera eficiente los elementos clave
          de cada proyecto.
        </p>
        <section className="my-8">
          <ListProjects />
        </section>
      </section>
    </main>
  );
};

export default page;
