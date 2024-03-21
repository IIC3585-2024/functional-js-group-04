import _tag from "../helpers/index.js";

const typeHandler = {
    thematic_break: () => _tag('hr')(''),
    heading: (token) => _tag(`h${token.level}`)(_recursive_parse(token.children)),
    indented_code_block: (token) => _tag('pre')(_tag('code')(token.text)),
    fenced_code_block: (token) => _tag('pre')(_tag('code')(token.text)),
    paragraph: (token) => _tag('p') (_recursive_parse(token.children)),
    blank_line: () => '',
    text_inline: (token) => token.text,
    bold: (token) => _tag('strong')(_recursive_parse(token.children)),
    italic: (token) => _tag('em')(_recursive_parse(token.children)),
    blockquote: (token) => _tag('blockquote')(_recursive_parse(token.children)),
    link: (token) => _tag('a')(token.text, { href: token.href, title: token.title }),
    code_span: (token) => _tag('code')(token.text),
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