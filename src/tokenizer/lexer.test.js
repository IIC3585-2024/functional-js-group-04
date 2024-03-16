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

describe('#text', () => {
    test('should match end of src', () => {
        const src = 'foo';
        const token = lexer.text(src);
        expect(token).toEqual({ raw: "foo", type: 'text', text: 'foo' });
    });

    test('should return the text object', () => {
        const src = 'how are you\nbar';
        const token = lexer.text(src);
        expect(token).toEqual({ raw: "how are you\n", type: 'text', text: 'how are you' });
    });
});
