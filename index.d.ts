import { DefineEnv } from "next/dist/build/swc";

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

interface Balances {
  logo: string;
  simbolo: string;
  balanceFiat: number;
  balanceCrypto: number;
  valorUnitCrypto: number;
}
interface BalancesInPie {
  logo: string;
  simbolo: string;
  balanceFiat: number;
  balanceCrypto: number;
  valorUnitCrypto: number;
  color: string;
}
interface BalancesDefi {
  protocolName: string;
  totalBalance: number;
}
interface BalancesDefiInPie {
  protocolName: string;
  totalBalance: number;
  color: string;
}

interface BalancesResponse {
  arbitrum: { Balances: Balances[]; TotalBalance: number };
  scroll: { Balances: Balances[]; TotalBalance: number };
  ethereum: { Balances: Balances[]; TotalBalance: number };
  //Base, polygon and optimism
  base: { Balances: Balances[]; TotalBalance: number };
  polygon: { Balances: Balances[]; TotalBalance: number };
  optimism: { Balances: Balances[]; TotalBalance: number };
}

// Positions Defi Types and interfaces

type EachNetwork = {
  headers: {};
  original: {
    protocol: Protocol[];
  };
};
interface DefiPositions {
  // lockedArbitrum: DefiPositionsBody[];
  // stackedArbitrum:   DefiPositionsBody[];
  // stackedScroll: DefiPositionsBody[];
  // lockedScroll: DefiPositionsBody[];
  // lockedEthereum:   DefiPositionsBody[];
  // stackedEthereum: DefiPositionsBody[];
  OptimisumPositions: EachNetwork[];
  PolygonPositions: EachNetwork[];
  BasePositions: EachNetwork[];
  ArbPositions: EachNetwork[];
  ScrollPositions: EachNetwork[];
  EthereumPositions: EachNetwork[];
}

export type EntriesFromResponseType = [string, Protocol[]];
//Example of what the response looks like
//[
//  ['protocol1', [protocol1Item1, protocol1Item2]],
//  ['protocol2', [protocol2Item1, protocol2Item2]]
//]
interface DefiPositionsBody {
  position_name: string;
  name_protocol: string;
  position_type: string;
  monto_loked: number;
  simbolo: string;
  fiat_value: number | null;
  icon_url: {
    url: string;
  };
}

interface Protocol {
  positions: DefiPositionsBody;
}

interface DefiPositionsResponsefromServerAction {
  arbitrum: {
    totalBalance: number;
    totalBalanceArray: {
      protocolName: string;
      totalBalance: number;
    }[];

    protocols: EntriesFromResponseType;
  };
  scroll: {
    totalBalance: number;
    totalBalanceArray: {
      protocolName: string;
      totalBalance: number;
    }[];

    protocols: EntriesFromResponseType;
  };
  ethereum: {
    totalBalance: number;
    totalBalanceArray: {
      protocolName: string;
      totalBalance: number;
    }[];

    protocols: EntriesFromResponseType;
  };
}

//---- Hooks props -- - -- -

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

interface DialogNotes {
  isOpenNote: boolean;
  setIsOpenNote: (newState: boolean) => void;
  idProject: number;
  setIdProject: (newProjectId: number) => void;
  initialValue: null | string;
  setInitialValue: (newState: string | null) => void;
}
interface AuthLoadingStatusProps {
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
}

interface ComparativeInfoProps {
  comparativeInfo: ComparativeInfo[];
  setComparativeInfo: (newState: ComparativeInfo[]) => void;
  token1: string;
  setToken1: (newState: string) => void;
  token2: string;
  setToken2: (newState: string) => void;
  loading: boolean;
  setLoading: (newState: boolean) => void;
}
interface ValueObject {
  field: string;
  value: number;
}
interface AnalysisCatalogs {
  id: number;
  item: string;
  value: number;
}

export type BothCatalogos = {
  dropdownNeedsCuantitative: AnalysisCatalogs[];
  dropdownNeedsCualitative: AnalysisCatalogs[];
};

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
  tieneAnalisisCuantitavivo: boolean;
  id_analisis_cualitativo: number;
  id_analisis_cuantitativo: number;
  nota: string | null;
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
  precioEntrada: number;
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
    id_analisis_cualitativo: number;
    id_analisis_cuantitativo: number;
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
  id_analisis_cualitativo: number;
  id_analisis_cuantitativo: number;
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

interface AnalysisFromGetCualitative {
  alianzas: number[];
  auditoria: number[];
  caso_uso: number[];
  comunidad: number[];
  financiamiento: number[];
  integrantesEquipo: number[];
  roadmap: number[];
  whitepapaer: number[];
  suma: number[];
}

interface AnalysisFromGetCuantitative {
  financiamiento: number[];
  metricasExchange: number[];
  onchains: number[];
  tokenomics: number[];
  suma: number[];
}

interface AnalysisResponse {
  filteredCualitative: AnalysisFromGetCualitative;
  filteredCuantitative: AnalysisFromGetCuantitative;
}

interface AnalysisInitialValues {
  filteredCualitative: AnalysisFromGetCualitative;
  filteredCuantitative: {
    tokenomics: number[];
    onChain: number[];
    finance: number[];
    exchange: number[];
  };
}
interface AllModules {
  "Módulo 1": LessonProps[];
  "Módulo 2": LessonProps[];
  "Módulo 3": LessonProps[];
}

interface ComparativeInfo {
  MakCapA: number;
  MakCapB: number;
  ProyecPrecio: number;
  NoX: number;
  PorcentajeX: number;
  Progreso: number;
}

interface LeccionUser {
  id_usuario: number;
  id_leccion: number;
  id_modulo: number;
  siFinalizo: number;
}
interface SelectNetworkProps {
  network: string;
  setNetwork: (newAddress: string) => void;
  //   addresses: string[];
  //   setAddresses: (newAddresses: string[]) => void;
}
