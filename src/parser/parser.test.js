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

  test("should support text blocks with inline content", () => {
      const tokens = [
        {
          "children": [
            {
              "raw": "foo ",
              "text": "foo ",
              "type": "text_inline",
            },
            {
              "raw": "**bar**",
              "text": "bar",
              "type": "bold",
            },
            {
              "raw": " baz ",
              "text": " baz ",
              "type": "text_inline",
            },
            {
              "raw": "*qux*",
              "text": "qux",
              "type": "italic",
            },
          ],
          "raw": "foo **bar** baz *qux*",
          "text": "foo **bar** baz *qux*",
          "type": "text_block",
        },
      ];

    expect(parse(tokens)).toMatchSnapshot();
  });
});
