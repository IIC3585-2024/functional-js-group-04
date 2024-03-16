# Markdown Html transpiler in functional JS

This repository holds the code for a Markdown HTML transpiler that generates an html output

## Transpiler design

**Input**: src, **Output**: html, **Rules**: RegExp[]

1. Tokenizer(src) -> tokens: Tokens[]
2. Parser(tokens) -> html

## Roadmap

- [x] Support raw text `foo` &rarr; `<p>foo</p>`
- [x] Support headings  `# foo` &rarr; `<h1>foo</h1>`
- [ ] Support for decorations
    - [x] Bold inline `foo **bar** baz` &rarr; `<p>foo <strong>bar</strong> baz</p>`
    - [ ] Italic inline `foo *bar* baz` &rarr; `<p>foo <em>bar</em> baz</p>`
    - [ ] Bold and italic
