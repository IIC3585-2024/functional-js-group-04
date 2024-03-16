
const _heading = /(#{1,6}) (.*)/;

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
    const match = src.match(_heading);
    if (match) {
        const type = 'heading';
        const level = match[1].length;
        const text = match[2]
        const raw = match[0];
        return { raw, type, level, text };
    }
    return null;
}

export default {
    heading,
};
    