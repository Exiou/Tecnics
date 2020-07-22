// transforma uma string em array
export default function parseStringAsArray (string: string) {
  return string.split(',').map(array => array.trim())
}
