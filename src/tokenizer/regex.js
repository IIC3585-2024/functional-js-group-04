

const regex = {
    // Common mark compliant
    thematicBreak: /^ {0,3}(?:(?:[\*-_][ \t]*){3,})(?:\n+|$)/,
    atxHeading: /^ {0,3}(#{1,6})[ \t]*(.*?)(?:[ \t]+#+[ \t]*)?(?:\n+|$)/,
    setextHeading: /^((?:.+\n)+)( {0,3}([-=])+[ \t]*)(?:\n+|$)/, // The first group have an extra \n that must be removed in the lexer
    indentedCodeBlock: /^( {4,}.*\n*)+(?:\n+|$)/,
    /**
     * Groups
     * 1: Preceding indentation
     * 2: Fence
     * 3: Info string
     * 4: Code
     */
    fencedCodeBlock: /^( {0,3})?(`{3,}|~{3,})(.*?)?[ \t]*\n([\w\W]*?)\n(?: {0,3})?\2[ \t]*(?:\n+|$)/,
    // Other
    textBlock: /^(.+)(?:\n+|$)/,
    textInline: /^([\w\s\?\!\.\']+)[\n+|$]?/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
    blockquote: /^> {0,}(.*)(?:\n+|$)/
}

export default regex;
