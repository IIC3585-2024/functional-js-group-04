const parse = (tokens) => {
    let out = '';
    out += prefix();

    _recursive_parse(tokens);

    out += suffix();

    function style() {
        return `
            <link href="https://db.onlinewebfonts.com/c/e5f6b1efe7d19d27f75355bd6dba4b65?family=Monospace+821+W02+Roman" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="style.css">
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

            if (token.type === "fenced_code_block") {
                out += tag("pre");
                out += tag("code");
                out += token.text;
                out += tag("code", true);
                out += tag("pre", true);
            }

            if (token.type === "paragraph") {
                out += '<p>';
                _recursive_parse(token.children);
                out += '</p>';
            }

            if (token.type === "blank_line") {
                // do nothing, blank lines are ignored
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