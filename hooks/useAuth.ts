import { useContext } from "react";
import { AuthContext } from "../app/context/AuthContext"; // ajuste o caminho se necessário

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
