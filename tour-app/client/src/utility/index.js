export const excerpt = (string, count) => {
  if (string.length > count) {
    string = string.substring(0, count) + " ..."
  }
  return string
}
