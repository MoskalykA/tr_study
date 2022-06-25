import OldCalculType from "./OldCalcul"

interface Calcul {
   number_of_successes: number,
   number_of_defeats: number,
   old_calculs: Array<OldCalculType>
}

export default Calcul