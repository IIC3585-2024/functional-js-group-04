import tokenize from "./tokenizer"

test('tokenizer should be a function', () => {
    expect(typeof tokenize).toBe('function');
});

// CommonMark Spec Blocks

describe("thematic break", () => {
    test('should return the thematic_break token', () => {
        const src = '***\n---\n___\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
});

describe("headings", () => {
    test('should return the heading token', () => {
        const src = '# foo\n## foo\n### foo\n#### foo\n##### foo\n###### foo\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
});

describe("indented code block", () => {
    test('should return the indented_code_block token', () => {
        const src = '    a simple\n      indented code block\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
});

describe("fenced code block", () => {
    test('should return the fenced_code_block token', () => {
        const src = '```javascript\nfunction foo(x) {\n  return 3\n}\n```';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
});

describe("paragraph", () => {
    test('should return the paragraph token', () => {
        const src = 'foo\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });

    test('should return one token on multiple lines', () => {
        const src = 'foo\nbar\nbaz\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
});

describe("blank line", () => {
    test('should return the blank_line token', () => {
        const src = '\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
})

describe("code span", () => {
    test('should return the code_span token', () => {
        const src = '`` foo `bar` baz ``';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
});
