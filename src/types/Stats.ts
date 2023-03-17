interface OldCalcul {
  calcul: string;
  solution: string;
  response: string;
  time: number;
}

export interface Stats {
  numberOfSuccesses: number;
  numberOfDefeats: number;
  oldCalculs: Array<OldCalcul>;
}
