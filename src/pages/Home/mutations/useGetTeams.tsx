import { useEffect, useState } from "react";
import { Team } from "../../../models/teams";
import { getAllTeams } from "../../../services/team.service";

const useGetTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTeams().then((teamsResponse) => {
      setTeams(teamsResponse.data.data);
      setLoading(false);
    });
  }, []);

  return { teams, loading } as const;
};

export default useGetTeams;
