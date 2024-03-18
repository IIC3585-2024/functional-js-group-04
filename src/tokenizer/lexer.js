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

const textBlock = (src) => {
    const reserved = ['>', '#'];
    if (reserved.includes(src[0])) return null;

    const match = src.match(regex.textBlock);
    if (match) {
        const type = 'text_block';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text };
    }
    return null;
}

const textInline = (src) => {
    const match = src.match(regex.textInline);
    if (match) {
        const type = 'text_inline';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text };
    }
    return null;
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

const blockquote = (src) => {
    const match = src.match(regex.blockquote);
    if (match) {
        const type = 'blockquote';
        const raw = match[0];
        const text = match[1];
        return { raw, type, text, children : [textBlock(text + '\n')]};
    }
    return null;

}

export default {
    thematicBreak,
    heading,
    indentedCodeBlock,
    fencedCodeBlock,
    paragraph,
    blankLine,
    textBlock,
    textInline,
    bold,
    italic,
    blockquote,
};
