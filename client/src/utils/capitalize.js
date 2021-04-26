/**
 * It takes in a string and returns that string with all letters lower case but the first one in upper case
 * 
 * @param {String} string the string to be capitalized
 * 
 * @throws {TypeError} on non string type parameter
 * 
 * @returns {String} the string capitalized
 */

const capitalize = (string) => {
    if(typeof string !== 'string') throw new TypeError(`${string} is not a string`)

    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}

export default capitalize