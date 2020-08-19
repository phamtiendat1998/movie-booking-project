export interface IntroFilm {
  _id: number;
  name: string;
  penName: string;
  trailerLink: string;
  image: string;
  description: string;
  dateRelease: string;
  rate: number;
  groupID: string;
  //bonus
  index: number;
  types: string[];
  timeTickets: string[];
}