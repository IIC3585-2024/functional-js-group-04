const parse = (tokens) => {
    let out = '';
    out += prefix();

    tokens.map((token) => {
        if (token.type === "heading") {
            out += heading(token);
        }
        if (token.type === "text") {
            out += text(token);
        }
    });

    out += suffix();

    function prefix() {
        return '<!DOCTYPE html><html><head><title>Markdown</title></head><body>';
    }

    function suffix() {
        return '</body></html>';
    }

    function heading (token) {
        return `<h${token.level}>${token.text}</h${token.level}>\n`
    }

    function text (token) {
        return `<p>${token.text}</p>\n`
    }

    return out;
}

export default parse;