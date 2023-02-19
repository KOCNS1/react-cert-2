import React from "react";
import GridList from "../../components/GridList";
import Select from "../../components/Select";
import { Team } from "../../models/teams";
import useGetTeams from "./mutations/useGetTeams";

type Props = {};

const Home = (props: Props) => {
  const { teams, loading } = useGetTeams();
  return (
    <div className='flex flex-col gap-3'>
      {!loading && <Select teams={teams as Team[]} />}
      <GridList />
    </div>
  );
};

export default Home;
