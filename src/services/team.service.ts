import { TeamResponse } from "../models/teams";
import { api } from "./api";

export const getAllTeams = async () => {
  const teams = await api.get<TeamResponse>("/teams");
  return teams;
};
