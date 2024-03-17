

const regex = {
    // Common mark compliant
    thematicBreak: /^ {0,3}(?:(?:[\*-_][ \t]*){3,})(?:\n+|$)/,
    atxHeading: /^ {0,3}(#{1,6})[ \t]*(.*?)(?:[ \t]+#+[ \t]*)?(?:\n+|$)/,
    setextHeading: /^((?:.+\n)+)( {0,3}([-=])+[ \t]*)(?:\n+|$)/, // The first group have an extra \n that must be removed in the lexer
    // Other
    textBlock: /^(.+)(?:\n+|$)/,
    textInline: /^([\w\s\?\!\.\']+)[\n+|$]?/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
    blockquote: /^> {0,}(.*)(?:\n+|$)/
}

export default regex;
