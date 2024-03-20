import _tag from "../helpers/index.js";

const prefix = (sty) => {
    return `<!DOCTYPE html><style>${sty}</style><html><head><title>Markdown</title></head><body>`;
}

const suffix = () => {
    return `</body></html>`;
}

//TODO: create currying for the tag function
const typeHandler = {
    thematic_break: () => _tag('hr'),
    heading: (token) => _tag(`h${token.level}`) + _recursive_parse(token.children) + _tag(`h${token.level}`, true),
    indented_code_block: (token) => _tag("pre") + _tag("code") + token.text + _tag("code", true) + _tag("pre", true),
    fenced_code_block: (token) => _tag("pre") + _tag("code") + token.text + _tag("code", true) + _tag("pre", true),
    paragraph: (token) => _tag("p") + _recursive_parse(token.children) + _tag("p", true),
    blank_line: () => '',
    text_inline: (token) => token.text,
    bold: (token) => _tag("strong") + _recursive_parse(token.children) + _tag("strong", true),
    italic: (token) => _tag("em") + _recursive_parse(token.children) + _tag("em", true),
    blockquote: (token) => _tag("blockquote") + _recursive_parse(token.children) + _tag("blockquote", true),
}

const _recursive_parse = (tokens) => {
    return tokens.map((token) => typeHandler[token.type](token)).join('');
}

const parse = (tokens, style) => {
    const sections = [prefix, _recursive_parse, suffix]
    
    const params = [style, tokens, false]

    return sections.reduce((out, func, index) => out + func(params[index]), '');
}

export default parse;