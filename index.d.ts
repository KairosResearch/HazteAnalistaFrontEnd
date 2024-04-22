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


export interface DashboardDataFormProps {
    type: "create" | "update"; 
    data: {
        nombre: string,
        ticket: string,
        id4e: string,
        id_decision_proyecto: string,
        marketCap: number,
        siAth: number,
        idExchange: string,
        idSector: string,
        precioEntrada: number,
        precioActual: number,
    } | null;
    catalogos: CatalogosType[][]; 
    user: UserProps
}

export interface BackendValues{
    nombre: string,
    ticket: string,
    id4e: number,
    id_decision_proyecto: number,
    marketCap: number,
    siAth: number,
    idExchange: number,
    idSector: number,
    precioEntrada: number,
    precioActual: number,
    idUsuario: number | null
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

interface TableData {
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


  
  interface NavbarProps {
    user: UserProps
  }

  interface DialogItemProps {
    mode: 'edit' | 'add';
    catalogos: CatalogosType[][]
    user: UserProps
}


interface DashboardProps {
    accessToken: string;
    catalogos: CatalogosType[][]; 
    user: UserProps
  }