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

describe('#paragraph', () => {
    test('basic', () => {
        const src = 'foo\n';
        const token = lexer.paragraph(src);
        expect(token).toEqual({ raw: "foo\n", type: 'paragraph', text: 'foo' });
    });
});

describe('#blankLine', () => {
    test('no characters', () => {
        const src = '\n';
        const token = lexer.blankLine(src);
        expect(token).toEqual({ raw: '\n', type: 'blank_line' });
    })

    test('spaces', () => {
        const src = '   \n';
        const token = lexer.blankLine(src);
        expect(token).toEqual({ raw: '   \n', type: 'blank_line' });
    })

    test('tabs', () => {
        const src = '\t\t\t\n';
        const token = lexer.blankLine(src);
        expect(token).toEqual({ raw: '\t\t\t\n', type: 'blank_line' });
    })

    test('spaces or tabs', () => {
        const src = '  \t  \n';
        const token = lexer.blankLine(src);
        expect(token).toEqual({ raw: '  \t  \n', type: 'blank_line' });
    })
});

describe("emphasis and strong emphasis", () => {
    describe('#delimiterRun', () => {
        test('basic', () => {
            const src = '***';
            const token = lexer.delimiterRun(src);
            expect (token).toEqual({ raw: '***', type: 'delimiter_run', text: '***' });
        });
    
        test('no match', () => {
            const src = 'foo';
            const token = lexer.delimiterRun(src);
            expect(token).toBe(null);
        });
    });

    describe('#leftFlankingDelimiterRun', () => {
        describe("match", () => {
            test('case 1', () => {
                const src = '***abc';
                const token = lexer.leftFlankingDelimiterRun(src);
                expect(token).toEqual({ raw: '***', type: 'left_flanking_delimiter_run', text: '***' });
            });
    
            test('case 2', () => {
                const src = '_abc';
                const token = lexer.leftFlankingDelimiterRun(src);
                expect(token).toEqual({ raw: '_', type: 'left_flanking_delimiter_run', text: '_' });
            });
    
            test('case 3', () => {
                const src = '**"abc"';
                const token = lexer.leftFlankingDelimiterRun(src);
                expect(token).toEqual({ raw: '**', type: 'left_flanking_delimiter_run', text: '**' });
            });
    
            test('case 4', () => {
                const src = '_"abc"';
                const token = lexer.leftFlankingDelimiterRun(src);
                expect(token).toEqual({ raw: '_', type: 'left_flanking_delimiter_run', text: '_' });
            });
        });


        describe("no match", () => {
            test("case 2: abc***", () => {
                const src = 'abc***';
                const token = lexer.leftFlankingDelimiterRun(src, "c");
                expect(token).toBe(null);
            });

            test("case 3: abc_", () => {
                const src = 'abc_';
                const token = lexer.leftFlankingDelimiterRun(src, "c");
                expect(token).toBe(null);
            });

            test("case 4: \"abc\"**", () => {
                const src = '"abc"**';
                const token = lexer.leftFlankingDelimiterRun(src, '"');
                expect(token).toBe(null);
            });

            test("case 5: \"abc\"_", () => {
                const src = '"abc"_';
                const token = lexer.leftFlankingDelimiterRun(src, '"');
                expect(token).toBe(null);
            });
        })
    });

    describe('#rightFlankingDelimiterRun', () => {
        describe("match", () => {
            test('case 1: abc***', () => {
                const src = '***';
                const token = lexer.rightFlankingDelimiterRun(src, "c");
                expect(token).toEqual({ raw: '***', type: 'right_flanking_delimiter_run', text: '***' });
            });
    
            test('case 2: abc_', () => {
                const src = '_';
                const token = lexer.rightFlankingDelimiterRun(src, "c");
                expect(token).toEqual({ raw: '_', type: 'right_flanking_delimiter_run', text: '_' });
            });
    
            test('case 3: "abc"**', () => {
                const src = '**';
                const token = lexer.rightFlankingDelimiterRun(src, '"');
                expect(token).toEqual({ raw: '**', type: 'right_flanking_delimiter_run', text: '**' });
            });
    
            test('case 4: "abc"_', () => {
                const src = "_";
                const token = lexer.rightFlankingDelimiterRun(src, '"');
                expect(token).toEqual({ raw: '_', type: 'right_flanking_delimiter_run', text: '_' });
            });
        })

        describe("no match", () => {
            test('case 1', () => {
                const src = '***abc';
                const token = lexer.rightFlankingDelimiterRun(src);
                expect(token).toBe(null);
            });
    
            test('case 2', () => {
                const src = '_abc';
                const token = lexer.rightFlankingDelimiterRun(src);
                expect(token).toBe(null);
            });
    
            test('case 3', () => {
                const src = '**"abc"';
                const token = lexer.rightFlankingDelimiterRun(src);
                expect(token).toBe(null);
            });
    
            test('case 4', () => {
                const src = '_"abc"';
                const token = lexer.rightFlankingDelimiterRun(src);
                expect(token).toBe(null);
            });
        });
    });
});

describe('#textInline', () => {
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

describe('#link', () => {
    test('should return link token', () => {
        const src = '[foo]    (bar)';
        const token = lexer.link(src);
        expect(token).toEqual({ raw: "[foo]    (bar)", type: 'link', text: 'foo', href: 'bar', title: null });
    });

    test('should return empty link token', () => {
        const src = '[]()';    
        const token = lexer.link(src);
        expect(token).toEqual({ raw: "[]()", type: 'link', text: '', href: '', title: null});
    });

    test('should return link token whith title', () => {
        const src = '[foo](bar "title")';
        const token = lexer.link(src);
        expect(token).toEqual({ raw: "[foo](bar \"title\")", type: 'link', text: 'foo', href: 'bar', title: 'title' });
    });

    test('should return link token when <> is used', () => {
        const src = '[foo](<bar>)';
        const token = lexer.link(src);
        expect(token).toEqual({ raw: "[foo](<bar>)", type: 'link', text: 'foo', href: 'bar', title: null });
    });

    test('should return link token when bold is used in and out', () => {
        const src = '*[foo*](bar)';
        const token = lexer.link(src);
        expect(token).toEqual({ raw: "[foo*](bar)", type: 'link', text: 'foo*', href: 'bar', title: null });
    });

    test('should return null when href use spaces', () => {
        const src = '[foo](bar baz)';
        const token = lexer.link(src);
        expect(token).toBe(null);
    });

    test('should return null when href starts whit <', () => {
        const src = '[foo](bar>)';
        const token = lexer.link(src);
        expect(token).toBe(null);
    });

    test('should return null if href has unbalanced parenthesis', () => {
        const src = '[foo](bar(baz)';
        const token = lexer.link(src);
        expect(token).toBe(null);
    });

    test('should return link token with parenthesis delimiter for titles', () => {
        const src = '[foo](bar (baz))';
        const token = lexer.link(src);
        expect(token).toEqual({ raw: "[foo](bar (baz))", type: 'link', text: 'foo', href: 'bar', title: 'baz' });
    });
})

describe('#codeSpan', () => {
    test('should return code span token', () => {
        const src = '`foo`';
        const token = lexer.codeSpan(src);
        expect(token).toEqual({ raw: "`foo`", type: 'code_span', text: 'foo' });
    });

    test('should return code span token with spaces', () => {
        const src = '` foo `';
        const token = lexer.codeSpan(src);
        expect(token).toEqual({ raw: "` foo `", type: 'code_span', text: 'foo' });
    });

    test('should return code span token with newline', () => {
        const src = '`foo\nbar`';
        const token = lexer.codeSpan(src);
        expect(token).toEqual({ raw: "`foo\nbar`", type: 'code_span', text: 'foo bar' });
    });

    test('should return code span token with more than one backtick', () => {
        const src = '```foo```';
        const token = lexer.codeSpan(src);
        expect(token).toEqual({ raw: "```foo```", type: 'code_span', text: 'foo' });
    });

    test('should return code span token with backticks inside', () => {
        const src = '`` ` ``'
        const token = lexer.codeSpan(src);
        expect(token).toEqual({ raw: "`` ` ``", type: 'code_span', text: '`' });
    });
});

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
                    { raw: "foo\n", type: 'paragraph', text: 'foo' },
                ]
            }
        );
    });
})
