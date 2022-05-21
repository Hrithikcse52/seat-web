export function getCurrentPath(path: string) {
  const pathname = path.split("/");
  return `/${pathname[pathname.length - 1]}`;
}

export function toCap(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isInt = (num: string) => /^-?[0-9]+$/.test(`${num}`);

export function getFullName(name: { firstName: string; lastName: string }) {
  return `${name.firstName} ${name.lastName}`;
}
