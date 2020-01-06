type RecursiveRequired<T> = {
  [P in keyof T]: Required<RecursiveRequired<T[P]>>;
};

// eslint-disable-next-line import/prefer-default-export
export { RecursiveRequired };
