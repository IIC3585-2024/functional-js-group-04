

const regex = {
    // Common mark compliant
    thematicBreak: /^ {0,3}(?:(?:[\*-_][ \t]*){3,})(?:\n|$)/,
    atxHeading: /^ {0,3}(#{1,6})[ \t]*(.*?)(?:[ \t]+#+[ \t]*)?(?:\n|$)/,
    setextHeading: /^((?:.+\n)+)( {0,3}([-=])+[ \t]*)(?:\n|$)/, // The first group have an extra \n that must be removed in the lexer
    indentedCodeBlock: /^( {4,}.*\n*)+(?:\n|$)/,
    paragraph: /^(.*)(?:\n|$)/, // Note that multiple consecutive paragraph must be merged by the tokenizer.
    blankLine: /^([ \t]*)\n/,
    /**
     * Groups
     * 1: Preceding indentation
     * 2: Fence
     * 3: Info string
     * 4: Code
     */
    fencedCodeBlock: /^( {0,3})?(`{3,}|~{3,})(.*?)?[ \t]*\n([\w\W]*?)\n(?: {0,3})?\2[ \t]*(?:\n|$)/,
    
    // Other
    textBlock: /^(.+)(?:\n|$)/,
    blockquote: /^> {0,}(.*)(?:\n|$)/,

    // Inline
    textInline: /^([\w\s\?\!\.\']+)/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
}

export default regex;
