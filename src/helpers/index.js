function tag(type) {
    return function (content) {
        return `<${type}>${content}</${type}>`
    }
}

export default tag