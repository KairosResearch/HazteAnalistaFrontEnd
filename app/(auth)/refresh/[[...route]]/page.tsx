"use client";
import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams?: {
    page?: string;
  };
}

const Refresh = ({ searchParams }: Props) => {
  const router = useRouter();
  const { getAccessToken } = usePrivy();

  const [token, setToken] = React.useState<string | undefined | null>(
    undefined,
  );

  useEffect(() => {
    const a = async () => {
      const authToken = await getAccessToken();
      setToken(authToken);
    };
    a();
  }, [getAccessToken]);

  const onRedirect = () => {
    if (token === null) {
      router.push("/");
    } else if (typeof token === "string") {
      const redirectTo = searchParams?.page
        ? `/${searchParams?.page}`
        : "/dashboard";
      router.push(redirectTo);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      Cargando sesión...
      {token !== undefined && <Button onClick={onRedirect}>Redirigir</Button>}
    </div>
  );
};

export default Refresh;
