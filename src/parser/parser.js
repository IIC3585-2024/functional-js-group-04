const parse = (tokens) => {
    let out = '';
    out += prefix();

    _recursive_parse(tokens);

    out += suffix();

    function style() {
        return `
        <style>
            blockquote {
                margin: 1.5em 40px;
                padding: 0 1em;
                border-left: 5px solid #ddd;
                background-color: #f9f9f9;
                padding: 0.5em 10px;
              }
        </style>
        `
    }

    function prefix() {
        return `<!DOCTYPE html>${style()}<html><head><title>Markdown</title></head><body>`;
    }

    function suffix() {
        return '</body></html>';
    }

    function tag(type, closing = false) {
        return `<${closing ? '/' : ''}${type}>`
    }

    function _recursive_parse(tokens) {
        tokens.map((token) => {

            if (token.type === "thematic_break") {
                out += '<hr/>';
            }

            if (token.type === "heading") {
                out += tag(`h${token.level}`);
                _recursive_parse(token.children);
                out += tag(`h${token.level}`, true);
            }

            if (token.type === "indented_code_block") {
                out += tag("pre");
                out += tag("code");
                out += token.text;
                out += tag("code", true);
                out += tag("pre", true);
            }

            if (token.type === "text_block") {
                out += '<p>';
                _recursive_parse(token.children);
                out += '</p>';
            }
    
            if (token.type === "text_inline") {
                out += token.text;
            }
    
            if (token.type === "bold") {
                out += tag("strong");
                _recursive_parse(token.children);
                out += tag("strong", true);
            }

            if (token.type === "italic") {
                out += tag("em");
                _recursive_parse(token.children);
                out += tag("em", true);
            }

            if (token.type === "blockquote") {
                out += tag("blockquote");
                _recursive_parse(token.children);
                out += tag("blockquote", true);
            }
    
        });
    }

    return out;
}

export default parse;