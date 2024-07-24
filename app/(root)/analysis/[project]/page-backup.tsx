import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AnalysisForm from "@/components/analysis/AnalysisForm";
import ShowAverages from "@/components/analysis/ShowAvarages";
import {
  getAlianza,
  getAuditorias,
  getComunity,
  getExchanges,
  getFinance,
  getFinanceCuant,
  getOnChain,
  getRoadmap,
  getTeamMembers,
  getTokenomics,
  getUseCases,
  getWhitepaper,
} from "@/services/backend/analisys";
import { AnalisysCatalogs } from "@/index";

interface pageProps {
  params: {
    project: string;
  };
}

const page = async ({ params }: pageProps) => {
  const projectName = decodeURIComponent(params.project);
  const dropdownNeedsCualitative: AnalisysCatalogs = await Promise.all([
    getAlianza(),
    getAuditorias(),
    getUseCases(),
    getComunity(),
    getFinance(),
    getTeamMembers(),
    getRoadmap(),
    getWhitepaper(),
  ]);
  const dropdownNeedsCuantitative: AnalisysCatalogs = await Promise.all([
    getTokenomics(),
    getOnChain(),
    getFinanceCuant(),
    getExchanges(),
  ]);

  return (
    <>
      <header className="mb-10  ">
        <h1>Realiza tu análisis - {projectName}</h1>

        <ShowAverages />
      </header>

      <section className="mb-8">
        <Card className="bg-grey-light/15 py-4 px-2 border-primary-foreground/40">
          <CardContent>
            <h1 className="text-primary">Análisis cualitativo</h1>
            <p>Aqui realizarás tu analísis cualitativo</p>
            <AnalysisForm
              data={dropdownNeedsCualitative}
              type="cual"
              mode="add"
            />
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-grey-light/15 py-4 px-2 border-primary-foreground/40">
          <CardContent>
            <h1 className="text-primary">Análisis cuantitativo</h1>
            <p>Aqui realizarás tu analísis cuantitativo</p>
            <AnalysisForm
              type="cuant"
              data={dropdownNeedsCuantitative}
              mode="add"
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default page;
