

const regex = {
    heading: /^ {0,3}(#{1,6})(?:\s|$)(.*)(?:\n+|$)/,
    textBlock: /^(.+)(?:\n+|$)/,
    textInline: /^([\w\s\?\!\.\']+)[\n+|$]?/,
    thematicBreak: /^ {0,3}(?:(?:[\*-_][ \t]*){3,})(?:\n+|$)/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
    blockquote: /^> {0,}(.*)(?:\n+|$)/
}

export default regex;
