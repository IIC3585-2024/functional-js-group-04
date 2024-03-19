import regex from "./regex.js";

const thematicBreak = (src) => {
    const match = src.match(regex.thematicBreak);
    if (match) {
        const type = 'thematic_break';
        const raw = match[0];
        return { raw, type };
    }
    return null;
}

/**
 * Extracts the heading information from the given source string.
 *
 * @param {string} src - The source string to extract the heading from.
 * @returns {object|null} - The extracted heading object, or null if no heading is found.
 * @property {string} raw - The raw source string of the heading.
 * @property {string} type - The type of the extracted heading (always 'heading').
 * @property {number} level - The level of the heading (1 to 6).
 * @property {string} text - The text content of the heading.
 */
const heading = (src) => {
    const match = src.match(regex.atxHeading);
    if (match) {
        const type = 'heading';
        const raw = match[0];
        const level = match[1].length;
        const text = match[2]
        return { raw, type, level, text };
    }

    const matchSetext = src.match(regex.setextHeading);
    if (matchSetext) {
        const type = 'heading';
        const raw = matchSetext[0];
        const level = matchSetext[2][0] === '=' ? 1 : 2;
        const text = matchSetext[1].trim();
        return { raw, type, level, text };
    }

    return null;
}

const indentedCodeBlock = (src) => {
    const match = src.match(regex.indentedCodeBlock);
    if (match) {
        const type = 'indented_code_block';
        const raw = match[0];
        const text = raw.replace(/^ {4}/gm, '').trim();
        return { raw, type, text };
    }
    return null;
}

const fencedCodeBlock = (src) => {
    const match = src.match(regex.fencedCodeBlock);
    if (match) {
        const type = 'fenced_code_block';
        const raw = match[0];
        const precedingIndentation = match[1];
        let text = match[4];
        text = text.split("\n").map((line) => line.replace(precedingIndentation, '')).join('\n');
        return { raw, type, text };
    }
    return null;
}

const paragraph = (src) => {
    const match = src.match(regex.paragraph);
    if (match) {
        const type = 'paragraph';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text };
    }
    return null;
}

const blankLine = (src) => {
    const match = src.match(regex.blankLine);
    if (match) {
        const type = 'blank_line';
        const raw = match[0];
        return { raw, type };
    }
    return null;
}

const textInline = (src) => {
    const reserved = ['[', '![', '*', '_'];

    if (reserved.includes(src[0])) return null;

    let text = ""
    for (const char of src){
        if (reserved.includes(char)) break;
        text += char;
    }

    const type = 'text_inline';
    const raw = text;
    return { raw, type, text };
}

const bold = (src) => {
    const match = src.match(regex.bold);
    if (match) {
        const type = 'bold';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text };
    }
    return null;
}

const italic = (src) => {
    const match = src.match(regex.italic);
    if (match) {
        const type = 'italic';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text };
    }
    return null;
}

const link = (src) => {
    const match = src.match(regex.link);
    if (match) {
        const type = 'link';
        const raw = match[0];
        const text = match[1];
        const href = match[2];
        const title = match[4]||null;
        return { raw, type, text, href, title };
    }
    return null;
}

const blockquote = (src) => {
    const match = src.match(regex.blockquote);
    if (match) {
        const type = 'blockquote';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text, children : [paragraph(text + '\n')]};
    }
    return null;

}

const delimiterRun = (src) => {
    const match = src.match(regex.delimiterRun);
    if (match) {
        const type = 'delimiter_run';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text };
    }
    return null;
}

const leftFlankingDelimiterRun = (src, prevChar = "\n") => {
    const token = delimiterRun(src);
    if (!token) return null;

    token['type'] = 'left_flanking_delimiter_run';

    const nextChar = src[src.indexOf(token.text) + token.raw.length] || "\n";
    
    const condition1 = !regex.unicodeWhitespaceChar.test(nextChar);
    const condition2a = !regex.unicodePunctuationChar.test(prevChar);
    const condition2b = regex.unicodePunctuationChar.test(prevChar) && (regex.unicodePunctuationChar.test(nextChar) || regex.unicodeWhitespaceChar.test(nextChar));

    if (condition1 && (condition2a || condition2b)) return token;

    return null;
}

const rightFlankingDelimiterRun = (src, prevChar = "\n") => {
    const token = delimiterRun(src);
    if (!token) return null;

    token['type'] = 'right_flanking_delimiter_run';

    const nextChar = src[src.indexOf(token.text) + token.raw.length] || "\n";
    
    const condition1 = !regex.unicodeWhitespaceChar.test(prevChar);
    const condition2a = !regex.unicodePunctuationChar.test(prevChar);

    const precededByPunctuationCharacter = regex.unicodePunctuationChar.test(prevChar);
    const followedByUnicodeWhiteSpace = regex.unicodeWhitespaceChar.test(nextChar);
    const followedByPunctuationCharacter = regex.unicodePunctuationChar.test(nextChar);
    const condition2b = precededByPunctuationCharacter && (followedByUnicodeWhiteSpace || followedByPunctuationCharacter);

    if (condition1 && (condition2a || condition2b)) return token;

    return null;
}

export default {
    thematicBreak,
    heading,
    indentedCodeBlock,
    fencedCodeBlock,
    paragraph,
    blankLine,
    delimiterRun,
    leftFlankingDelimiterRun,
    rightFlankingDelimiterRun,
    textInline,
    bold,
    italic,
    blockquote,
    link,
};
