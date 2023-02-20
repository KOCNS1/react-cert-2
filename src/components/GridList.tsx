import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { useNbaContext } from "../context/NbaContext";
import { TrackedTeam } from "../models/trackedTeam";

export const getAverageScored = (team: TrackedTeam) =>
  Math.floor(
    team.results.reduce((acc, curr) => acc + curr.points_scored, 0) /
      team.results.length
  );

export const getAverageConceded = (team: TrackedTeam) =>
  Math.floor(
    team.results.reduce((acc, curr) => acc + curr.points_conceded, 0) /
      team.results.length
  );

const GridList = () => {
  const { trackedTeams, removeTeam } = useNbaContext();

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {trackedTeams.map((team) => (
        <li
          key={team.id}
          className="col-span-1 relative flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-lg"
        >
          <button
            id={`remove${team.abbreviation}`}
            className="absolute top-0 right-0 m-2 text-black"
            onClick={() => removeTeam(team.id)}
          >
            <XMarkIcon className="w-5" />
          </button>
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
              <dt className="sr-only">conference</dt>
              <dd className="text-sm text-gray-500">
                {team.conference === "East" ? "Eastern" : "Western"} conference
              </dd>
              <dt className="sr-only">results</dt>
              <span className="font-light text-sm pt-2">
                Results of the past 12 days:
              </span>
              <dd className="mt-3 flex gap-3 justify-center">
                {team.results.map((res, i) => (
                  <span
                    key={i}
                    className={classNames(
                      res.result === "W"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                      "rounded-full  px-2 py-1 text-xs font-medium "
                    )}
                  >
                    {res.result}
                  </span>
                ))}
              </dd>
            </dl>
          </div>

          <div>
            <span>Average points</span>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <ArrowUpRightIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">{getAverageScored(team)}</span>
                </button>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <ArrowDownRightIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">{getAverageConceded(team)}</span>
                </button>
              </div>
            </div>
          </div>

          <Link
            id={`results${team.abbreviation}`}
            className="bg-green-500 text-white rounded-b-lg py-2 px-4 hover:bg-green-600"
            to={`/results/${team.abbreviation}`}
          >
            {"See game results >>"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GridList;
