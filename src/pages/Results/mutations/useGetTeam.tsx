import { useEffect, useState } from "react";

import { Team } from "../../../models/teams";
import { getTeamById, getTeamGames } from "../../../services/team.service";

const useGetTeam = (id: number) => {
  const [team, setTeam] = useState<Team>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamById(id).then((teamResponse) => {
      setTeam(teamResponse.data);
      setLoading(false);
    });
  }, [id]);

  return { team, loading } as const;
};

export default useGetTeam;
