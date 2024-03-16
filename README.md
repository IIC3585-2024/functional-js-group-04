# Markdown Html transpiler in functional JS

This repository holds the code for a Markdown HTML transpiler that generates an html output

## Transpiler design

**Input**: src, **Output**: html, **Rules**: RegExp[]

1. Tokenizer(src) -> tokens: Tokens[]
2. Parser(tokens) -> html

## Roadmap
1. Support raw text `foo` &rarr; `<p>foo</p>`
2. Support headings  `# foo` &rarr; `<h1>foo</h1>`
