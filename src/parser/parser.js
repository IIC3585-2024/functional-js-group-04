const parse = (tokens) => {
    let out = '';
    out += prefix();

    _recursive_parse(tokens);

    out += suffix();

    function prefix() {
        return '<!DOCTYPE html><html><head><title>Markdown</title></head><body>';
    }

    function suffix() {
        return '</body></html>';
    }

    function tag(type, closing = false) {
        return `<${closing ? '/' : ''}${type}>`
    }

    function _recursive_parse(tokens) {
        tokens.map((token) => {
            if (token.type === "heading") {
                out += tag("h1");
                _recursive_parse(token.children);
                out += tag("h1", true);
            }
            if (token.type === "text_block") {
                out += '<p>';
                _recursive_parse(token.children);
                out += '</p>\n';
            }
    
            if (token.type === "text_inline") {
                out += token.text;
            }
    
            if (token.type === "bold") {
                out += `<strong>${token.text}</strong>`
            }

            if (token.type === "italic") {
                out += `<em>${token.text}</em>`
            }
    
        });
    }

    return out;
}

export default parse;