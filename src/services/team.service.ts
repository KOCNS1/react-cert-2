import { eachDayOfInterval, format, sub } from "date-fns";

import { GamesResponse } from "../models/games";
import { Team, TeamResponse } from "../models/teams";
import { api } from "./api";

export const getAllTeams = async () => {
  return await api.get<TeamResponse>("/teams");
};

export const getTeamGames = async (id: number) => {
  const last12Days = eachDayOfInterval({
    start: sub(new Date(), { days: 12 }),
    end: new Date(),
  }).map((date) => format(date, "yyyy-MM-dd"));

  return await api.get<GamesResponse>(`/games`, {
    params: {
      team_ids: [id],
      dates: last12Days,
      page: 0,
    },
  });
};

export const getTeamById = async (id: number) => {
  return await api.get<Team>(`/teams/${id}`);
};
