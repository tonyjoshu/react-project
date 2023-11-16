import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/**
 * admin token + admin api requests config atom
 */
export const tokenDef = {
  token: "",
  name: "",
  email: "",
  phone: "",
  position: "",
};
export const tokenAtom = atomWithStorage({ ...tokenDef });

export const adminTokenConfig = atom((get) => {
  const token = get(tokenAtom).token;
  return {
    token,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
});
