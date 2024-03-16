import tokenize from "../tokenizer/tokenizer";
import parse from "./parser";

describe("parser", () => {

  test("should return a function", () => {
    expect(typeof parse).toBe("function");
  });

  test("should support heading tokens", () => {
    const tokens = tokenize("# foo **bar** baz");

    expect(parse(tokens)).toMatchSnapshot();
  });

  test("should support text blocks with inline content", () => {
    const tokens = tokenize("foo *bar* **baz** ***qux***");

    expect(parse(tokens)).toMatchSnapshot();
  });

  test("should support other common characters", () => {
    const tokens = tokenize("foo! bar? baz. qux");

    expect(parse(tokens)).toMatchSnapshot();
  });
});
