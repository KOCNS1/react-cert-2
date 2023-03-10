import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";

import { useNbaContext } from "../context/NbaContext";
import { Team } from "../models/teams";
import useGetTeams from "../pages/Home/mutations/useGetTeams";

type Props = {
  selected: Team | null;
  setSelected: React.Dispatch<React.SetStateAction<Team | null>>;
};

const Select = ({ selected, setSelected }: Props) => {
  const { teams, loading } = useNbaContext();

  useEffect(() => {
    setSelected(teams[0]);
  }, [teams, setSelected]);

  if (loading || !selected) return <div>Loading...</div>;

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="w-full max-w-2xl" id="teamSelect">
          <Listbox.Label className="block text-xl font-medium text-white">
            Select a team
          </Listbox.Label>
          <div className="relative mt-1">
            {selected && (
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <img
                    src={`https://interstate21.com/nba-logos/${selected.abbreviation}.png`}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate text-gray-800">
                    {selected.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {teams.map((team) => (
                  <Listbox.Option
                    key={team.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={team}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={`https://interstate21.com/nba-logos/${team.abbreviation}.png`}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {team.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
