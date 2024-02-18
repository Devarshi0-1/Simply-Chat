/**
 * @param {...string} strings
 * @returns {boolean}
 */

export const isEmpty = (...strings) => {
    const isEmptyArr = strings.map((str) => {
        if (str === null || str === undefined || str.length === 0 || isHavingOnlyWhiteSpaces(str))
            return true
        return false
    })

    return isEmptyArr.includes(true)
}

/**
 * @param {...string} strings
 * @returns {boolean}
 */

const isHavingOnlyWhiteSpaces = (elem) => {
    if (elem.replace(/\s/g, '').length) return false
    return true
}
