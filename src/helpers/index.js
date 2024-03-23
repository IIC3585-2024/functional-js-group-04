function tag(type, closing = true) {
    return function (content, attrs = {}) {
        const attributes = Object.entries(attrs)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');

        const closingTag = closing ? `</${type}>` : '';
        return `<${type}${attributes ? " " : ""}${attributes}>${content}${closingTag}`;
    }
}

export default tag