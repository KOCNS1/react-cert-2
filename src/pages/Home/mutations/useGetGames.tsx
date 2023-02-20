import { useEffect, useState } from "react";

import { Game } from "../../../models/games";
import { getTeamGames } from "../../../services/team.service";

const useGetGames = (id: number | undefined) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getTeamGames(id).then((gamesResponse) => {
      setGames(gamesResponse.data.data);
      setLoading(false);
    });
  }, [id]);

  return { games, loading } as const;
};

export default useGetGames;
