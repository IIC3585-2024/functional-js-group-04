import lexer from './lexer';


describe('#heading', () => {
    test('should return null on empty string', () => {
        const src = '';
        const token = lexer.heading(src);
        expect(token).toBe(null);
    });

    test('should work on empty header', () => {
        const src = '##'
        const token = lexer.heading(src);
        expect(token).toEqual({ raw: "##", type: 'heading', level: 2, text: '' });
    });

    test('should return null no match', () => {
        const src = 'bar';
        const token = lexer.heading(src);
        expect(token).toBe(null);
    });

    test('should return the heading object', () => {
        const src = '## Hello\nbar'
        const token = lexer.heading(src);
        expect(token).toEqual({ raw: "## Hello\n", type: 'heading', level: 2, text: 'Hello' });
    });
});

describe('#textBlock', () => {
    test(' should be a function', () => {
        expect(typeof lexer.textBlock).toBe('function');
    })

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
});

describe('#textInline', () => {
    test('should be a function', () => {
        expect(typeof lexer.textInline).toBe('function');
    });

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
