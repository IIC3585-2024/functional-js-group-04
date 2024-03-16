const parser = (tokens) => {
    let out = '';

    tokens.map((token) => {
        if (token.type === "heading") {
            out += heading(token);
        }
        if (token.type === "text") {
            out += text(token);
        }
    });

    function heading (token) {
        return `<h${token.level}>${token.text}</h${token.level}>\n`
    }

    function text (token) {
        return `<p>${token.text}</p>\n`
    }

    return out;
}

export default parser;