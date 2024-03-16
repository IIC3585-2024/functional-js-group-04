import tokenize from "./tokenizer"


test('tokenizer get the appropriate tokens', () => {
    const src = '## Hello\nbar'
    const tokens = tokenize(src)
    expect(tokens).toEqual([
        { raw: '## Hello\n', type: 'heading', level: 2, text: 'Hello' },
        { raw: 'bar', type: 'text', text: 'bar'}
    ]);
});
