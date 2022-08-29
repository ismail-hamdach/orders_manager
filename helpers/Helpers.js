
const _objectToArray = (object) => {
    return new Promise((reject, resolve) => {
        const array = []
        Object.keys(object).forEach((key, index) => {
            array.push(object[key])
        })
        resolve(array);
    })
}

module.exports = {
    _objectToArray
}