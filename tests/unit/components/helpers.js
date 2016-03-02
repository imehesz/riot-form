import riot from 'riot'

export function mountTag(name, api = {}) {
  const elem = document.createElement(name)
  document.body.appendChild(elem)
  return riot.mount(name, api)[0]
}
