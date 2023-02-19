import React, { useState } from "react";
import GridList from "../../components/GridList";
import Select from "../../components/Select";
import { Game } from "../../models/games";
import { Team } from "../../models/teams";
import { getTeamGames } from "../../services/team.service";
import useGetTeams from "./mutations/useGetTeams";

export type TrackedTeam = {
  id: number;
  name: string;
  abbreviation: string;
  conference: string;
  results: {
    result: string;
    points_scored: number;
    points_conceded: number;
  }[];
};

const Home = () => {
  const { teams, loading } = useGetTeams();
  const [selected, setSelected] = useState<Team | null>(null);
  const [trackedTeams, setTrackedTeams] = useState<TrackedTeam[]>([]);

  const isHomeTeam = (game: Game, selectedTeam: Team) =>
    game.home_team.id === selectedTeam.id;

  const handleTrackTeam = async () => {
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
    console.log(newTrackedTeams);
    setTrackedTeams((prev) => [...prev, newTrackedTeams]);
  };

  return (
    <div className='flex flex-col gap-3'>
      {!loading && (
        <div className='flex w-full gap-5 items-end'>
          <Select
            teams={teams as Team[]}
            selected={selected}
            setSelected={setSelected}
          />
          <button
            id='trackBtn'
            onClick={handleTrackTeam}
            type='button'
            className='inline-flex h-fit items-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Track team
          </button>
        </div>
      )}
      <GridList trackedTeams={trackedTeams} setTrackedTeams={setTrackedTeams} />
    </div>
  );
};

export default Home;
