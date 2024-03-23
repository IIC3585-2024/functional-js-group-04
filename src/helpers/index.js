function tag(type) {
    return function (content, attrs = {}) {
        const attributes = Object.entries(attrs)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        return `<${type}${attributes}>${content}</${type}>`;
    }
}

export default tag