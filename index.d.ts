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
    id_proyecto: number;
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

export interface DashboardDataFormProps {
    type: "create" | "update"; 
    data: {
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
    } | null;
    catalogos: CatalogosType[][]; 
}

export interface BackendValues{
    nombre: string,
    ticket: string,
    id4e: strign ,
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
    user: UserProps
    id: number | null;
    data: TableData | null;
}


interface DashboardProps {
    accessToken: string;
    catalogos: CatalogosType[][]; 
    user: UserProps
  }

  interface DialogAlertProps {
    action: 'deleteProyect' | 'logout';
    id: number | null;
}