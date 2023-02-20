import { useState } from "react";

import GridList from "../../components/GridList";
import Select from "../../components/Select";
import { useNbaContext } from "../../context/NbaContext";
import { Team } from "../../models/teams";

const Home = () => {
  const [selected, setSelected] = useState<Team | null>(null);
  const { addNewTrackedTeam } = useNbaContext();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full gap-5 items-end">
        <Select selected={selected} setSelected={setSelected} />
        <button
          id="trackBtn"
          onClick={() => addNewTrackedTeam(selected as Team)}
          type="button"
          className="inline-flex h-fit items-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Track team
        </button>
      </div>

      <GridList />
    </div>
  );
};

export default Home;
