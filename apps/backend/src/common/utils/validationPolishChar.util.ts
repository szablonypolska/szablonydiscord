export const isPolishOnly = (text: string) => {
  return /^[a-zA-Z0-9\-_~.]+$/.test(text);
};
