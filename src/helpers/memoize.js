const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const n = args[0];  // just taking one argument here
    if (n in cache) {
      return cache[n];
    }
    else {
      const result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

export default memoize;
