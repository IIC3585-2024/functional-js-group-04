

const regex = {
    atxHeading: /^ {0,3}(#{1,6})[ \t]*(.*?)(?:[ \t]+#+[ \t]*)?(?:\n+|$)/,
    setextHeading: /^((?:.+\n)+)( {0,3}([-=])+[ \t]*)(?:\n+|$)/, // The first group have an extra \n that must be removed in the lexer
    textBlock: /^(.+)(?:\n+|$)/,
    textInline: /^([\w\s\?\!\.\']+)[\n+|$]?/,
    thematicBreak: /^ {0,3}(?:(?:[\*-_][ \t]*){3,})(?:\n+|$)/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
    blockquote: /^> {0,}(.*)(?:\n+|$)/
}

export default regex;
