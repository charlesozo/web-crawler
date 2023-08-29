const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL slash protocol", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeURL strip http", () => {
  const input = "http://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/">Boot.dev Blog</a>
    </body>
    </html>
    `;
    const InputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, InputBaseURL)
  const expected = ["https://blog.boot.dev/"]
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
    </body>
    </html>
    `;
    const InputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, InputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML relative", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="/path/">Boot.dev Blog</a>
    </body>
    </html>
    `;
    const InputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, InputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML both", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path1/">Boot.dev Blog path one</a>
    <a href="/path2/">Boot.dev Blog path Two</a>
    </body>
    </html>
    `;
    const InputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, InputBaseURL)
  const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
  expect(actual).toEqual(expected);
});

test("getURLSFromHTML invalid", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="invalid">Invalid URL</a>
    </body>
    </html>
    `;
    const InputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, InputBaseURL)
    const expected = []
  expect(actual).toEqual(expected);
});


