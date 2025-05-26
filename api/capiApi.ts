import { api } from "../services/api";
import { TrailsResponse } from "../types/Trails";

export const getTrails = async () => {
  const response = await api.get<TrailsResponse>("/trilhas");
  return response.data;
};
