import { useEffect, useState } from "react";
import { Game } from "../../../models/games";
import { getTeamGames } from "../../../services/team.service";

const useGetGames = (id: number) => {
  const [teams, setTeams] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamGames(id).then((teamsResponse) => {
      setTeams(teamsResponse.data.data);
      setLoading(false);
    });
  }, [id]);

  return { teams, loading } as const;
};

export default useGetGames;
