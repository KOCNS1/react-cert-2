export interface GamesResponse {
  data: Game[];
  meta: Meta;
}

export interface Meta {
  total_pages: number;
  current_page: number;
  next_page?: any;
  per_page: number;
  total_count: number;
}

export interface Game {
  id: number;
  date: string;
  home_team: Hometeam;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Hometeam;
  visitor_team_score: number;
}

export interface Hometeam {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}
