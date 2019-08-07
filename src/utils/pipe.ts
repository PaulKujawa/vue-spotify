type Unary = (arg?: any) => any;

// TODO some typing would be fantastic but typing `pipe` is quite arduous
export function pipe(...fns: Unary[]) {
  return (initialValue?: any) => fns.reduce((acc, fn) => fn(acc), initialValue);
}
