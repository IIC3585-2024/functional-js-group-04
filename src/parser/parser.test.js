import parse from "./parser";

describe("parser", () => {
  const prefix =
    "<!DOCTYPE html><html><head><title>Markdown</title></head><body>";
  const suffix = "</body></html>";

  test("should return a function", () => {
    expect(typeof parse).toBe("function");
  });

  test("should support heading tokens", () => {
    const tokens = [
      {
        children: [
          {
            raw: "foo ",
            text: "foo ",
            type: "text_inline",
          },
          {
            raw: "**bar**",
            text: "bar",
            type: "bold",
          },
          {
            raw: " baz",
            text: " baz",
            type: "text_inline",
          },
        ],
        level: 1,
        raw: "# foo **bar** baz",
        text: "foo **bar** baz",
        type: "heading",
      },
    ];

    expect(parse(tokens)).toMatchSnapshot();
  });

  describe("should support text blocks with inline content", () => {
    test("text only", () => {
      const tokens = [
        {
          type: "text_block",
          raw: "foo\n",
          text: "foo",
          children: [{ type: "text_inline", raw: "foo", text: "foo" }],
        },
      ];

      const out = `${prefix}<p>foo</p>\n${suffix}`;
      expect(parse(tokens)).toEqual(out);
    });

    test("text and inline bold", () => {
      const tokens = [
        {
          type: "text_block",
          raw: "foo **bar** baz",
          text: "foo **bar** baz",
          children: [
            { type: "text_inline", raw: "foo ", text: "foo " },
            { type: "bold", raw: "**bar**", text: "bar" },
            { type: "text_inline", raw: " baz", text: " baz" },
          ],
        },
      ];

      const out = `${prefix}<p>foo <strong>bar</strong> baz</p>\n${suffix}`;
      expect(parse(tokens)).toEqual(out);
    });
  });
});
