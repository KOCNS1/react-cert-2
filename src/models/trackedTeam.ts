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
