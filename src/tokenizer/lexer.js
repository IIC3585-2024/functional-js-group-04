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
    textBlock,
    textInline,
    bold,
    italic,
    blockquote,
};
