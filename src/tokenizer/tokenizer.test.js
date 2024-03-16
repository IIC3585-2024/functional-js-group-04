import tokenize from "./tokenizer"


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
