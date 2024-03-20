function tag(type, closing = false) {
    return `<${closing ? '/' : ''}${type}>`
}

export default tag;