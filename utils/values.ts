"use client";
export const getGuzmaValue = async () => {
  if (
    typeof window !== undefined &&
    window.localStorage.getItem("guzma") !== null
  ) {
    const guzma = Number(window.localStorage.getItem("guzma"));
    return guzma;
  }
  return 0;
};
