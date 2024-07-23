import { AUTH_URL} from "./urls";

//cualitativos

export const getAlianza = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_alianzas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { alianzas } = data;
      return alianzas;
    } catch (err) {
      console.error(err);
    }
  };

  export const getAuditorias = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_audotorias`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { auditorias } = data;
      return auditorias;
    } catch (err) {
      console.error(err);
    }
  };
  export const getUseCases = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_caso_uso`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { casosUso } = data;
      return casosUso;
    } catch (err) {
      console.error(err);
    }
  };
  export const getComunity = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_comunidad`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { comunidades } = data;
      return comunidades;
    } catch (err) {
      console.error(err);
    }
  };
  export const getFinance = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_financiamiento`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { finanziamentos } = data;
      return finanziamentos;
    } catch (err) {
      console.error(err);
    }
  };
  export const getTeamMembers = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_integrantes_equipo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { integrantesEquipo } = data;
      return integrantesEquipo;
    } catch (err) {
      console.error(err);
    }
  };
  export const getRoadmap = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_roadmap`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { roadmaps } = data;
      return roadmaps;
    } catch (err) {
      console.error(err);
    }
  };
  export const getWhitepaper = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCualitativo_whitepapaer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      
      const { whitepapear } = data;
      return whitepapear;
    } catch (err) {
      console.error(err);
    }
  };

  //Cuantitativo
  export const getFinanceCuant = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCuantitativo_financieros`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { whitepapear } = data;
      return whitepapear;
    } catch (err) {
      console.error(err);
    }
  };
  export const getExchanges = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCuantitativo_metricas_xchanges`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { exchanges } = data;
      return exchanges;
    } catch (err) {
      console.error(err);
    }
  };
  export const getOnChain = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCuantitativo_movimientos_OnChain`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { onchain } = data;
      return onchain;
    } catch (err) {
      console.error(err);
    }
  };
  export const getTokenomics = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getCuantitativo_Tokenomics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const data = await response.json();
      const { tokens } = data;
      return tokens;
    } catch (err) {
      console.error(err);
    }
  };
  