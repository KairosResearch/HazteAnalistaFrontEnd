export type CatalogosType = {
    value: number;
    label: string;
};

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
    nombre: string;
    ticket: string;
    id4e: number;
    id_decision_proyecto: number;
    marketCap: number;
    siAth: number;
    idSector: number;
    idExchange: number;
    precioEntrada: number;
    precioActual: number;
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
    data: DataToReceiveInForm| null;
    catalogos: CatalogosType[][]; 
    close: (() => void) | null;
}

export interface BackendValues{
    nombre: string,
    ticket: string,
    id4e: number ,
    id_decision_proyecto: number,
    marketCap: number,
    siAth: number,
    idExchange: number,
    idSector: number,
    precioEntrada: number,
    precioActual: number,
}

export type UserData = {
    userId: number | null;
    setUserId: (newId: number) => void;
    accessToken: string | undefined;
    setAccessToken: (newAccessToken: string | undefined) => void;
};
export type UserTableData = {
    userTableData: [];
    setUserTableData: (newData: any) => void;
}


export interface AuthDataFormProps {
    type: "login" | "register"; 
}

  
  interface NavbarProps {
    user: UserProps
  }

  interface DialogItemProps {
    mode: 'edit' | 'add';
    catalogos: CatalogosType[][]
    id: number | null;
    data: DataToReceiveInForm | null;
    close: (() => void) | null;
}


interface DashboardProps {
    catalogos: CatalogosType[][]; 
    user: UserProps
  }

  interface DialogAlertProps {
    action: 'deleteProyect' | 'logout';
    id: number | null;
    close: () => void;
}

interface DialogInfoProps {
    isDialogOpen: boolean;
    close: () => void;
    selectedRow: DataToReceiveInForm;
    catalogos: CatalogosType[][];
}