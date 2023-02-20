import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { Game } from "../models/games";
import { Team } from "../models/teams";
import { TrackedTeam } from "../models/trackedTeam";
import useGetTeams from "../pages/Home/mutations/useGetTeams";
import { getTeamGames } from "../services/team.service";

type NbaContextType = {
  trackedTeams: TrackedTeam[];
  setTrackedTeams: React.Dispatch<React.SetStateAction<TrackedTeam[]>>;
  addNewTrackedTeam: (selected: Team) => Promise<void>;
  removeTeam: (id: number) => void;
  teams: Team[];
  loading: boolean;
};

const NbaContext = createContext<NbaContextType | null>(null);

export const useNbaContext = () => useContext(NbaContext) as NbaContextType;

export const NbaProvider: FC<PropsWithChildren> = ({ children }) => {
  const [trackedTeams, setTrackedTeams] = useState<TrackedTeam[]>([]);
  const { teams, loading } = useGetTeams();

  const isHomeTeam = (game: Game, selectedTeam: Team) =>
    game.home_team.id === selectedTeam.id;

  const addNewTrackedTeam = async (selected: Team) => {
    const { data } = await getTeamGames(selected?.id as number);
    const newTrackedTeams = {
      id: selected?.id,
      name: selected?.name,
      abbreviation: selected?.abbreviation,
      conference: selected?.conference,
      results: data.data.map((game) => {
        if (isHomeTeam(game, selected as Team)) {
          return {
            result: game.home_team_score > game.visitor_team_score ? "W" : "L",
            points_scored: game.home_team_score,
            points_conceded: game.visitor_team_score,
          };
        }
        return {
          result: game.visitor_team_score > game.home_team_score ? "W" : "L",
          points_scored: game.visitor_team_score,
          points_conceded: game.home_team_score,
        };
      }),
    } as TrackedTeam;
    setTrackedTeams((prev) => [...prev, newTrackedTeams]);
  };

  const removeTeam = (id: number) => {
    setTrackedTeams((prev) => prev.filter((team) => team.id !== id));
  };

  return (
    <NbaContext.Provider
      value={{
        trackedTeams,
        setTrackedTeams,
        addNewTrackedTeam,
        removeTeam,
        teams,
        loading,
      }}
    >
      {children}
    </NbaContext.Provider>
  );
};
