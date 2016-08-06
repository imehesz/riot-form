export function capitalize(str) {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substring(1)
}

export function padLeft(str, length, char = ' ') {
  while (str.length < length) {
    str = char + str
  }
  return str
}
