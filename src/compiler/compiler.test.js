import compiler from "./compiler.js"


describe("#compiler", () => {
    test("is a function", () => {
        expect(typeof compiler).toBe("function");
    });

    test("complete chain of methods", () => {
        const input = `# Hello World`
        const output = compiler().setSource(input).tokenize().parse().output();
        expect(output).toBe(`<!DOCTYPE html><html><head><title>Markdown</title></head><body><h1>Hello World</h1>\n</body></html>`)
    });

    test(".compile().setSource().output() returns a string", () => {
        const input = `# Hello World`
        const output = compiler().setSource(input).compile().output();
        expect(output).toBe(`<!DOCTYPE html><html><head><title>Markdown</title></head><body><h1>Hello World</h1>\n</body></html>`)
    });
})
