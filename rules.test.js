import rules from './rules';

test('headings parse correctly', () => {
    const src = '## Hello\nbar'
    const token = rules.heading(src);
    expect(token).toEqual({ raw: "## Hello", type: 'heading', level: 2, text: 'Hello' });
});
