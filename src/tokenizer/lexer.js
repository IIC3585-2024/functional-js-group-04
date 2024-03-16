import regex from "./regex.js";

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
    const match = src.match(regex.heading);
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

export default { heading, textBlock, textInline, bold, italic };
