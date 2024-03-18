import lexer from './lexer.js';

const tokenizeBlocks = (src) => {
    const tokens = [];
    let previousToken = null;

    while (src) {
        let token = null;

        if (token = lexer.thematicBreak(src)) {
            src = src.substring(token.raw.length);
        }

        else if (token = lexer.heading(src)) {
            src = src.substring(token.raw.length);
            token.children = tokenizeInline(token.text);
        }

        else if (token = lexer.indentedCodeBlock(src)) {
            src = src.substring(token.raw.length);
        }

        else if (token = lexer.fencedCodeBlock(src)) {
            src = src.substring(token.raw.length);
        }
            
        else if (token = lexer.blankLine(src)) {
            src = src.substring(token.raw.length);
        }

        else if (token = lexer.paragraph(src)) {
            src = src.substring(token.raw.length);

            if (previousToken && previousToken.type === 'paragraph') {
                previousToken.text += '\n' + token.text;
                previousToken.raw += token.raw;
                previousToken.children = tokenizeInline(previousToken.text);
                continue
            }
            token.children = tokenizeInline(token.text);
        }

        else if (token = lexer.blockquote(src)) {
            src = src.substring(token.raw.length);
            token.children = tokenizeBlocks(token.text);
        }

        // Throws error if the src is not empty and no token is matched
        else if (src) {
            (src)
            throw new Error('Infinite loop', src);
        }

        tokens.push(token);
        previousToken = token;
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
            token.children = tokenizeInline(token.text);
            tokens.push(token);
            continue
        }

        if (token = lexer.italic(src)) {
            src = src.substring(token.raw.length);
            token.children = tokenizeInline(token.text);
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
