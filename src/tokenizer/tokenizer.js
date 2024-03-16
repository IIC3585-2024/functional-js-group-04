import lexer from './lexer.js';

const tokenizeBlocks = (src) => {
    const tokens = [];

    while (src) {
        let token = null;

        if (token = lexer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            token.children = tokenizeInline(token.text);
            continue
        }

        if (token = lexer.textBlock(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);

            token.children = tokenizeInline(token.text);
            continue
        }

        // Throws error if the src is not empty and no token is matched
        if (src) {
            throw new Error('Infinite loop', src);
        }
    }

    return tokens;
};

const tokenizeInline = (src) => {
    const tokens = [];

    while (src) {
        let token = null;

        if (token = lexer.textInline(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue
        }

        if (token = lexer.bold(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue
        }

        if (token = lexer.italic(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue
        }

        // Throws error if the src is not empty and no token is matched
        if (src) {
            throw new Error('Infinite loop', src);
        }
    }

    return tokens;

}

const tokenize = (src) => {
    return tokenizeBlocks(src);
};

export default tokenize;
