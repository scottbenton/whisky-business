export function createId(string: string, elementType?: string) {
  return string.replace(/ /gi, "-") + "-" + elementType;
}
