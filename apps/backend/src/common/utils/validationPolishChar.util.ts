export const isPolishOnly = (text: string) => {
  return /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s.,!?()-]+$/u.test(text);
};
