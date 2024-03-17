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
  
    test("text blocks with inline content", () => {
      const tokens = tokenize("foo *bar* **baz** ***qux***");
  
      expect(parse(tokens)).toMatchSnapshot();
    });
  
    test("other common characters", () => {
      const tokens = tokenize("foo! bar? baz. qux");
  
      expect(parse(tokens)).toMatchSnapshot();
    });
  
    test("blockquote", () => {
      const tokens = tokenize("> foo");
  
      expect(parse(tokens)).toMatchSnapshot();
    });
  });
});
