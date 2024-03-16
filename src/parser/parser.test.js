import parse from "./parser"

describe("parser", () => {

    const prefix = "<!DOCTYPE html><html><head><title>Markdown</title></head><body>"
    const suffix = "</body></html>"

    test("should return a function", () => {
        expect(typeof parse).toBe("function")
    })

    test("should support heading tokens", () => {
        const tokens = [
            { type: "heading", raw: "# level 1\n", level: 1, text: "level 1" },
            { type: "heading", raw: "## level 2\n", level: 2, text: "level 2" },
            { type: "heading", raw: "### level 3\n", level: 3, text: "level 3" },
            { type: "heading", raw: "#### level 4\n", level: 4, text: "level 4" },
            { type: "heading", raw: "##### level 5\n", level: 5, text: "level 5" },
            { type: "heading", raw: "###### level 6\n", level: 6, text: "level 6" },
        ]

        const out = `${prefix}<h1>level 1</h1>\n<h2>level 2</h2>\n<h3>level 3</h3>\n<h4>level 4</h4>\n<h5>level 5</h5>\n<h6>level 6</h6>\n${suffix}`
        expect(parse(tokens)).toEqual(out)
    });

    test("should support text tokens", () => {
        const tokens = [
            { type: "text", raw: "foo\n", text: "foo" },
            { type: "text", raw: "bar\n", text: "bar" },
            { type: "text", raw: "baz", text: "baz" },
        ]

        const out = `${prefix}<p>foo</p>\n<p>bar</p>\n<p>baz</p>\n${suffix}`
        expect(parse(tokens)).toEqual(out)
    });
});
