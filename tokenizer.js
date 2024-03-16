import rules from './rules';

const lex = (src) => {
    const tokens = [];

    while (src) {
        let token = null;

        if (token = rules.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue
        }
        if (token = rules.text(src)) {
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

const tokenizer = {
    lex
}

export default tokenizer;