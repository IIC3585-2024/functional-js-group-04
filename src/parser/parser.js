function tag(type) {
    return function (content) {
        return `<${type}>${content}</${type}>`
    }
}

const typeHandler = {
    thematic_break: () => tag('hr')(''),
    heading: (token) => tag(`h${token.level}`)(_recursive_parse(token.children)),
    indented_code_block: (token) => tag("pre")(tag("code")(token.text)),
    fenced_code_block: (token) => tag("pre")(tag("code")(token.text)),
    paragraph: (token) => tag("p") (_recursive_parse(token.children)),
    blank_line: () => '',
    text_inline: (token) => token.text,
    bold: (token) => tag("strong")(_recursive_parse(token.children)),
    italic: (token) => tag("em")(_recursive_parse(token.children)),
    blockquote: (token) => tag("blockquote")(_recursive_parse(token.children)),
}

const prefix = (sty) => {
    return `<!DOCTYPE html><style>${sty}</style><html><head><title>Markdown</title></head><body>`;
}

const _recursive_parse = (tokens) => {
    return tokens.map((token) => typeHandler[token.type](token)).join('');
}

const suffix = () => {
    return `</body></html>`;
}

const parse = (tokens, style) => {
    const sections = [prefix, _recursive_parse, suffix]
    const params = [style, tokens, false]

    return sections.reduce((out, func, index) => out + func(params[index]), '');
}

export default parse;