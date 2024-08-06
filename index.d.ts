export type CatalogosType = {
  value: number;
  label: string;
};
interface AveragesProps {
  cuantitativePromedio: number;
  cualitativePromedio: number;
  setCuantitativePromedio: (newState: number) => void;
  setCaulitativePromedio: (newState: number) => void;
}


interface TabsHookProps {
  isReadyNextTab: boolean;
  setIsReadyNextTab: (newState: boolean) => void;
}

interface DialogHookProps {
  isOpen: boolean;
  setIsOpen: (newState: boolean) => void;
  mode: "add" | "edit" | "none";
  setMode: (newMode: "add" | "edit" | "none") => void;
}
interface DialogInstrHookProps {
  isOpenInstr: boolean;
  setIsOpenInstr: (newState: boolean) => void;
  defaultTab: "first-part" | "second-part";
  setDefaultTab: (tab: "first-part" | "second-part") => void;
}
interface AuthLoadingStatusProps {
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
}
interface ValueObject {
  field: string;
  value: number;
}
export type AnalysisCatalogs = {
  id: number;
  item: string;
  value: number;
}[][];

interface UserProps {
  id: number;
  email: string;
  name: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

interface TableData {
  id_proyecto: number;
  id_proyectoInicial: number;
  proyecto: string;
  ticker: string;
  id4e: number;
  id_decision_proyecto: number;
  market_cap: number;
  siAth: number;
  sectores: number[];
  idExchange: number;
  precioEntrada: number;
  price: number;
  tieneAnalisisCualitativo: boolean;
  tieneAnalisisCuantitavivo: boolean
  id_analisis_cualitativo: number ;
  id_analisis_cuantitativo: number ;
}

interface ProjectsDataWithAnalisis extends TableData {
  respuestaSegundoFetch: AnalysisResponse;
}

//Changes comparing to -> TableData
//the id's from the catalogs are now strings
//because they have to be strings in the form,
//however before sending the data to the backend
//they have to be converted to numbers.
interface DataToReceiveInForm {
  id_proyecto: number;
  nombre: string;
  ticket: string;
  id4e: string | undefined;
  id_decision_proyecto: string | undefined;
  marketCap: number;
  siAth: number;
  idSector: string | undefined;
  idExchange: string | undefined;
  precioEntrada: string;
  precioActual: number;
}

export interface DashboardDataFormProps {
  type: "create" | "update";
  data: {
    id_proyecto: number;
    proyecto: string;
    ticker: string;
    id4e: string;
    id_decision_proyecto: string;
    siAth: number;
    sectores: number[];
    idExchange: string;
    precioEntrada: string;
  } | null;
  catalogos: CatalogosType[][];
  close: (() => void) | null;
  projectsList:
    | {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
      }[]
    | null;
}

export interface BackendValues {
  idProyecto: number;
  id4e: number;
  id_decision_proyecto: number;
  marketCap: number;
  idExchange: number;
  idSector: any[];
  precioEntrada: string;
  precioActual: number;
}

export type UserData = {
  userId: number | null;
  setUserId: (newId: number) => void;
};
export type UserTableData = {
  userTableData: [];
  setUserTableData: (newData: any) => void;
};
export type UserGuzma = {
  userGuzma: number | null;
  setUserGuzma: (newData: number | null) => void;
};

export interface AuthDataFormProps {
  type: "login" | "register";
}

//   interface NavbarProps {
//     user: UserProps
//   }

interface DialogItemProps {
  // isDialogOpen: boolean;
  mode: "edit" | "add";
  catalogos: CatalogosType[][];
  data: {
    id_proyecto: number;
    proyecto: string;
    ticker: string;
    id4e: string;
    id_decision_proyecto: string;
    siAth: number;
    sectores: number[];
    idExchange: string;
    precioEntrada: string;
  } | null;
  close: (() => void) | null;
  projectsList:
    | {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
      }[]
    | null;
}

interface DashboardProps {
  catalogos: CatalogosType[][];
  projectsList:
    | {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
      }[]
    | null;
}

interface DialogAlertProps {
  // action: "deleteProyect" | "logout";
  prToDelete: number[];
  clean: () => void;
  // name: string;
}

interface DialogInfoProps {
  isDialogOpen: boolean;
  close: () => void;
  selectedRow: {
    id_proyectoInicial: number;
    id_proyecto: number;
    proyecto: string;
    ticker: string;
    id4e: number;
    id_decision_proyecto: number;
    siAth: number;
    sectores: number[];
    idExchange: number;
    precioEntrada: number;
    tieneAnalisisCualitativo: boolean;
    tieneAnalisisCuantitavivo: boolean;
    id_analisis_cualitativo: number ;
    id_analisis_cuantitativo: number ;
    nota: string | null;
  } | null;
  catalogos: CatalogosType[][];
  projectsList:
    | {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
      }[]
    | null;
}
interface ProyectsInfo {
  id: number;
  proyecto: string;
  ticker: string;
  descripcion: string;
  website: string;
  link_analisis_kairos: string | null;
  documentacion: string;
  twitter: string | null;
  github: string | null;
  discord: string | null;
  ultima_ronda: string;
  financiamiento: number;
  inversionista1: string;
  inversionista2: string | null;
  inversionista3: string | null;
  status: number;
}

interface InfoTabsProps {
  info: ProyectsInfo;
  tieneAnalisisCualitativo: boolean;
  tieneAnalisisCuantitavivo: boolean;
  id_analisis_cualitativo: number ;
  id_analisis_cuantitativo: number ;
  nota: string | null;
}

interface LessonPortadaProps {
  id: number;
  title: string;
  cover: string;
  modulo: number;
}

interface LessonProps {
  id: number;
  id_modulo: number;
  numero_leccion: string;
  leccion: string;
  html_portada: string;
  html_leccion: string;
}
// interface AnalisysInitialvaluesCual {
//   id_usuario: number[];
//   id_proyecto: number[];
//   id_caso_uso: number[];
//   id_integrantes_equipo: number[];
//   id_auditoria: number[];
//   id_roadmap: number[];
//   id_comunidad: number[];
//   id_financiamiento: number[];
//   id_whitepapaers: number[];
//   id_alianzas: number[];
//   suma: number;
// }
// interface AnalisysInitialvaluesCuant {
//   id_usuario: number[];
//   id_proyecto: number[];
//   id_tokenomic: number[];
//   id_movimientosOnChain: number[];
//   id_metricasExchage: number[];
//   id_financiamitos: number[];
//   suma: number;
// }

interface AnalysisFromGetCualitative {
  alianzas: number[];
  auditoria: number[];
  caso_uso: number[];
  comunidad: number[];
  financiamiento: number[];
  integrantesEquipo: number[];
  roadmap: number[];
  whitepapaer: number[];
  suma : number[];
}

interface AnalysisFromGetCuantitative {
  financiamiento: number[];
  metricasExchange: number[];
  onchains: number[];
  tokenomics: number[];
  suma : number[];
}

interface AnalysisResponse {
  filteredCualitative: AnalysisFromGetCualitative;
  filteredCuantitative: AnalysisFromGetCuantitative;
}

interface AnalysisInitialValues {
  filteredCualitative: AnalysisFromGetCualitative;
  filteredCuantitative: {
    tokenomics: number[]
    onChain: number[]
    finance: number[]
    exchange: number[]
  }
}
interface AllModules {
  "Módulo 1": LessonProps[];
  "Módulo 2": LessonProps[];
  "Módulo 3": LessonProps[];
}
