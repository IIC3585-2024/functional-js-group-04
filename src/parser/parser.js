import _tag from "../helpers/index.js";

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
    // return tokens.map((token) => typeHandler[token.type](token)).join('');
    return tokens.map((token) => typeHandler[token.type](token)).reduce((acc, curr) => acc + curr, '');
}


const parse = (tokens, style) => {
    let out = '';

    out += prefix();

    out += _recursive_parse(tokens);

    out += suffix();

    function prefix() {
        return `<!DOCTYPE html><style>${style}</style><html><head><title>Markdown</title></head><body>`;
    }

    function suffix() {
        return '</body></html>';
    }

    return out;
}

export default parse;