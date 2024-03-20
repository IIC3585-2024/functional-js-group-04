import tokenize from "../tokenizer/tokenizer";
import parse from "./parser";

describe("parser", () => {

  test("should return a function", () => {
    expect(typeof parse).toBe("function");
  });

  describe("spec with", () => {

    test("thematic break", () => {
      const tokens = tokenize("***\n---\n___\n");
      expect(parse(tokens)).toMatchSnapshot();
    });

    test("heading tokens", () => {
      const tokens = tokenize("# foo **bar** baz");
  
      expect(parse(tokens)).toMatchSnapshot();
    });

    test("indented code block", () => {
      const tokens = tokenize("    a simple\n      indented code block\n");
  
      expect(parse(tokens)).toMatchSnapshot();
    });

    test("fenced code block", () => {
      const tokens = tokenize("```javascript\nfunction foo(x) {\n  return 3\n}\n```");
  
      expect(parse(tokens)).toMatchSnapshot();
    });

    test("paragraphs", () => {
      const tokens = tokenize("foo\nbar\nbaz\n");
  
      expect(parse(tokens)).toMatchSnapshot();
    });

    test("link", () => {
      const tokens = tokenize("[foo](bar)");
  
      expect(parse(tokens)).toMatchSnapshot();
    });
  });
});
