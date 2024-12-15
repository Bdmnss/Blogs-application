import { atom } from 'jotai';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const userAtom = atom(getUserFromLocalStorage());

userAtom.onMount = (setUser) => {
  const user = getUserFromLocalStorage();
  if (user) {
    setUser(user);
  }
};

export const filterAtom = atom("");
export const languageAtom = atom("en");