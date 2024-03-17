

const regex = {
    atxHeading: /^ {0,3}(#{1,6})[ \t]*(.*?)(?:[ \t]+#+[ \t]*)?(?:\n+|$)/,
    textBlock: /^(.+)(?:\n+|$)/,
    textInline: /^([\w\s\?\!\.\']+)[\n+|$]?/,
    thematicBreak: /^ {0,3}(?:(?:[\*-_][ \t]*){3,})(?:\n+|$)/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
    blockquote: /^> {0,}(.*)(?:\n+|$)/
}

export default regex;
