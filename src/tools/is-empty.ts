export function isEmpty<T>(object: T): boolean {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      return false;
    }
  }

  return JSON.stringify(object) === JSON.stringify({});
}
