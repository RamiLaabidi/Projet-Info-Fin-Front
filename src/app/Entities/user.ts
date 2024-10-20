import {ROLE} from "../Enum/enums";

export interface User {
  idU: number,
  nom: string,
  prenom: string,
  numCin: number,
  dateDeNaissance: Date,
  paysDeNaissance: string,
  nationalite: string,
  adress: string,
  codePostal: number,
  contact: number,
  photo: string,
  mail: string,
  motDePasse: string,
  role: ROLE
}
