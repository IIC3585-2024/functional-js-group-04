import lexer from './lexer';

describe("#thematicBreak", () => {
    test('***', () => {
        const src = '***\nbar';
        const token = lexer.thematicBreak(src);
        expect(token).toEqual({ raw: "***\n", type: 'thematic_break' });
    });

    test('---', () => {
        const src = '---\nbar';
        const token = lexer.thematicBreak(src);
        expect(token).toEqual({ raw: "---\n", type: 'thematic_break' });
    });

    test('___', () => {
        const src = '___\nbar';
        const token = lexer.thematicBreak(src);
        expect(token).toEqual({ raw: "___\n", type: 'thematic_break' });
    });

    test('should work as defined in the spec', () => {
        const src = '   *     *          *\nbar';
        const token = lexer.thematicBreak(src);
        expect(token).toEqual({ raw: "   *     *          *\n", type: 'thematic_break' });
    });
});

describe('#headings', () => {
    describe("atx heading", () => {
        test('empty heading', () => {
            const src = '#\n';
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "#\n", type: 'heading', level: 1, text: '' });
        });
    
        test('## foo', () => {
            const src = '## foo\nbar'
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "## foo\n", type: 'heading', level: 2, text: 'foo' });
        });
    
        test('## foo##', () => {
            const src = '## foo##'
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "## foo##", type: 'heading', level: 2, text: 'foo##' });
        });
    
        test('## foo ###', () => {
            const src = '## foo ##'
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "## foo ##", type: 'heading', level: 2, text: 'foo' });
        });
    });

    describe('setext heading', () => {
        test('not match with blank lines between text and heading underline', () => {
            const src = 'foo\n\n---\n';
            const token = lexer.heading(src);
            expect(token).toBe(null);
        });

        test('first level heading', () => {
            const src = 'foo\n===\n';
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "foo\n===\n", type: 'heading', level: 1, text: 'foo' });
        });

        test('second level heading', () => {
            const src = 'foo\n---\n';
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "foo\n---\n", type: 'heading', level: 2, text: 'foo' });
        });

        test('multiline heading', () => {
            const src = 'foo\nbar\n---\nbaz';
            const token = lexer.heading(src);
            expect(token).toEqual({ raw: "foo\nbar\n---\n", type: 'heading', level: 2, text: 'foo\nbar' });
        });
    });
});

describe('#indentedCodeBlock', () => {
    test('case 1', () => {
        const src = '    if\n        foo';
        const token = lexer.indentedCodeBlock(src);
        expect(token).toEqual({ raw: "    if\n        foo", type: 'indented_code_block', text: "if\n    foo" });
    });
});

describe('#fencedCodeBlock', () => {
    test('case 1', () => {
        const src = '```\nfoo\n```';
        const token = lexer.fencedCodeBlock(src);
        expect(token).toEqual({ raw: "```\nfoo\n```", type: 'fenced_code_block', text: 'foo' });
    });

    test('strip N first spaces of preceding block fence indentation', () => {
        const src = '   ```\n    foo\n  ```';
        const token = lexer.fencedCodeBlock(src);
        expect(token).toEqual({ raw: "   ```\n    foo\n  ```", type: 'fenced_code_block', text: ' foo' });
    });

    test('with all elements of spec', () => {
        const src = '   ```javascript\n   function foo(x) {\n     return 3\n}\n  ```';
        const token = lexer.fencedCodeBlock(src);
        expect(token).toEqual({ raw: "   ```javascript\n   function foo(x) {\n     return 3\n}\n  ```", type: 'fenced_code_block', text: 'function foo(x) {\n  return 3\n}' });
    });

    test('digest a single code block when multiple code blocks', () => {
        const src = '```\nfoo\n```\n```\nbar\n```';
        const token = lexer.fencedCodeBlock(src);
        expect(token).toEqual({ raw: "```\nfoo\n```\n", type: 'fenced_code_block', text: 'foo' });
    });
});

describe('#textBlock', () => {
    test('should match end of src', () => {
        const src = 'foo';
        const token = lexer.textBlock(src);
        expect(token).toEqual({ raw: "foo", type: 'text_block', text: 'foo' });
    });

    test('should return the text object', () => {
        const src = 'how are you\nbar';
        const token = lexer.textBlock(src);
        expect(token).toEqual({ raw: "how are you\n", type: 'text_block', text: 'how are you' });
    });

    test('should not match blockquote', () => {
        const src = '> foo\nbar';
        const token = lexer.textBlock(src);
        expect(token).toEqual(null);
    });
});

describe('#textInline', () => {
    test('should return null on empty string', () => {
        const src = '';
        const token = lexer.textInline(src);
        expect(token).toBe(null);
    });

    test('should return token on match', () => {
        const src = 'bar **foo** baz';
        const token = lexer.textInline(src);
        expect(token).toEqual({ raw: "bar ", type: 'text_inline', text: 'bar ' });
    });
})

describe('#bold', () => {
    test('should return null on empty string', () => {
        const src = '';
        const token = lexer.bold(src);
        expect(token).toBe(null);
    });

    test('should return null no match', () => {
        const src = 'bar';
        const token = lexer.bold(src);
        expect(token).toBe(null);
    });

    test('should return the bold object', () => {
        const src = '**foo** bar';
        const token = lexer.bold(src);
        expect(token).toEqual({ raw: "**foo**", type: 'bold', text: 'foo' });
    });
});

describe('#italic', () => {
    test('should return italic token', () => {
        const src = '*foo*';
        const token = lexer.italic(src);
        expect(token).toEqual({ raw: "*foo*", type: 'italic', text: 'foo' });
    });
})

describe('#blockquote', () => {
    test('should return blockquote token', () => {
        const src = '> foo\n>bar\n>baz';
        const token = lexer.blockquote(src);
        expect(token).toEqual(
            {
                raw: "> foo\n",
                type: 'blockquote',
                text: 'foo',
                children: [
                    { raw: "foo\n", type: 'text_block', text: 'foo' },
                ]
            }
        );
    });
})
