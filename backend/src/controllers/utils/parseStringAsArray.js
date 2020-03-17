//transforma uma string em array 
module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(array => array.trim())
}