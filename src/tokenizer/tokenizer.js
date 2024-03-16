import lexer from './lexer.js';

const tokenize = (src) => {
    const tokens = [];

    while (src) {
        let token = null;

        if (token = lexer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue
        }
        if (token = lexer.text(src)) {
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
};

export default tokenize;
