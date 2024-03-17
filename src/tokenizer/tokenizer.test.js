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

describe("indented code block", () => {
    test('should return the indented_code_block token', () => {
        const src = '    a simple\n      indented code block\n';
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
})
    
test('tokenizer get the appropriate tokens', () => {
    const src = `## Foo\nfoo\n**foo**\nfoo **bar** baz`
    const tokens = tokenize(src)
    expect(tokens).toMatchSnapshot();
});

describe('tokenize headers', () => {
    test('h1 ... h6', () => {
        const src = `# foo\n ## foo\n ### foo\n #### foo\n ##### foo\n ###### foo\n`
        const tokens = tokenize(src)
        expect(tokens).toMatchSnapshot();
    });

    test('with inline text decoration', () => {
        const src = `# foo **bar** baz`
        const tokens = tokenize(src)
        expect(tokens).toMatchSnapshot();
    });
})

test('tokenizer with inline content', () => {
    const src = `foo *bar* **baz** ***qux***`;
    const tokens = tokenize(src);
    expect(tokens).toMatchSnapshot();
})

describe('blockquote', () => {
    test('should return a blockquote object', () => {
        const src = `> foo\n> bar\n> baz`;
        const tokens = tokenize(src);
        expect(tokens).toMatchSnapshot();
    });
})


