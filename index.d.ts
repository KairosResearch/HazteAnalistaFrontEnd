
export type CatalogosType = {
    value: number;
    label: string;
};

interface TabsHookProps {
    isReadyNextTab: boolean;
    setIsReadyNextTab: (newState: boolean) => void;
}

interface DialogHookProps {
    isOpen: boolean;
    setIsOpen: (newState: boolean) => void;
    mode: 'add' |'edit' | 'none';
    setMode: (newMode: 'add' |'edit' | 'none') => void;
    
}
interface DialogInstrHookProps {
    isOpenInstr: boolean;
    setIsOpenInstr: (newState: boolean) => void;
    defaultTab: 'first-part' | 'second-part';
    setDefaultTab: (tab: 'first-part' | 'second-part') => void;
}

interface UserProps {
    id: number
    email: string,
    name: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string
}{}

interface TableData {
    id_proyecto: number ;
    proyecto: string;
    ticker: string;
    id4e: number;
    id_decision_proyecto: number;
    market_cap: number;
    siAth: number;
    idSector: number;
    idExchange: number;
    precioEntrada: number;
    price: number;
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
        id4e:  string | undefined;
        id_decision_proyecto:  string | undefined;
        marketCap: number;
        siAth: number;
        idSector:  string | undefined;
        idExchange:  string | undefined;
        precioEntrada: number;
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
        idSector: atring;
        idExchange: string;
        precioEntrada: number;
    } | null;
    catalogos: CatalogosType[][]; 
    close: (() => void) | null;
    projectsList: {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
    }[] | null;
}

export interface BackendValues{
    idProyecto: number,
    id4e: number ,
    id_decision_proyecto: number,
    marketCap: number,
    idExchange: number,
    idSector: number,
    precioEntrada: number,
    precioActual: number
    
}

export type UserData = {
    userId: number | null;
    setUserId: (newId: number) => void;
};
export type UserTableData = {
    userTableData: [];
    setUserTableData: (newData: any) => void;
}


export interface AuthDataFormProps {
    type: "login" | "register"; 
}

  
//   interface NavbarProps {
//     user: UserProps
//   }

  interface DialogItemProps {
    // isDialogOpen: boolean;
    mode: 'edit' | 'add';
    catalogos: CatalogosType[][]
    data: {
        id_proyecto: number;
        proyecto: string;
        ticker: string;
        id4e: string;
        id_decision_proyecto: string;
        siAth: number;
        idSector: string;
        idExchange: string;
        precioEntrada: number;
    } | null;
    close: (() => void) | null;
    projectsList: {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
    }[] | null;
}


interface DashboardProps {
    catalogos: CatalogosType[][];
    projectsList: {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
    }[] | null; 
  }

  interface DialogAlertProps {
    action: 'deleteProyect' | 'logout';
    id: number | null;
    close: () => void;
    name: string;
}

interface DialogInfoProps {
    isDialogOpen: boolean;
    close: () => void;
    selectedRow: {
            id_proyecto: number;
            proyecto: string;
            ticker: string;
            id4e: number;
            id_decision_proyecto: number;
            siAth: number;
            idSector: number;
            idExchange: number;
            precioEntrada: number;
        } | null;
    catalogos: CatalogosType[][];
    projectsList: {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
    }[] | null; 
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
    info: ProyectsInfo
}

