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
        {/* <p>Analiza un proyecto de manera cuantitativa y cualitativa.</p> */}
        <section className="my-8">
          <ListProjects />
        </section>
      </section>
    </main>
  );
};

export default page;
