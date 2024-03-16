

const regex = {
    heading: /^ {0,3}(#{1,6})(?:\s|$)(.*)(?:\n+|$)/,
    textBlock: /^(.+)(?:\n+|$)/,
    textInline: /^([\w\s]+)[\n+|$]?/,
    bold: /^\*\*(\*?.*?\*?)\*\*/,
    italic: /^\*(.*?)\*/,
}

export default regex;
