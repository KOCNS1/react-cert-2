import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useNbaContext } from "../../context/NbaContext";
import useGetGames from "../Home/mutations/useGetGames";

const Results = () => {
  const { teamCode } = useParams();
  const { teams, loading } = useNbaContext();

  const team = useMemo(
    () => teams.find((team) => team.abbreviation === teamCode!),
    [teams, teamCode]
  );

  const { games } = useGetGames(team?.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return (
      <div>
        Team not found or not Tracked yet, go back to the home page and try to
        track the team first
      </div>
    );
  }

  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-lg">
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          src={`https://interstate21.com/nba-logos/${team.abbreviation}.png`}
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {team.name} [{team.abbreviation}]
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">
            {team.conference === "East" ? "Eastern" : "Western"} conference
          </dd>
          <dt className="sr-only">results</dt>
          <span className="font-light text-sm pt-2">
            Results of the past 12 days:
          </span>
          <dd className="mt-3 flex gap-3 justify-center">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-4 text-sm font-semibold text-gray-900 text-center sm:pl-0"
                  >
                    Team 1
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-center"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-center"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-6 text-sm font-semibold text-gray-900 text-center sm:pr-0"
                  >
                    Team 2
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {games.map((game) => (
                  <tr key={game.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-6 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {game.home_team.abbreviation}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {game.home_team_score}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {game.visitor_team_score}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-6 text-sm text-gray-500 sm:pr-0">
                      {game.visitor_team.abbreviation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </dd>
        </dl>
      </div>

      <Link
        id="backBtn"
        className="bg-green-500 text-white rounded-b-lg py-2 px-4 hover:bg-green-600"
        to={`/`}
      >
        {"<< Back to all team stats"}
      </Link>
    </li>
  );
};

export default Results;
