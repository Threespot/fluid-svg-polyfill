beforeEach(jest.resetModules);

// Remove line breaks and consecutive spaces to make it easier to compare markup
function minify(string) {
  return string.replace(/\s{2,}/g,'').trim();
}

const svg = `<svg viewBox="0 0 596 140" preserveAspectRatio="xMidYMid meet" focusable="false" class="is-fluid" width="200" height="47" role="presentation" aria-hidden="true"><path d="M1"></path></svg>`;

test('Basic usage', () => {
  // Add class to html tag so polyfill will run
  // (this will carry over to subsequent tests)
  document.documentElement.className = "old-ie";

  const fluidSVGPolyfill = require("../index");

  // Add demo SVG
  document.body.innerHTML = svg;

  const svgEl = document.querySelector('.is-fluid');

  fluidSVGPolyfill(svgEl);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div style="padding-top: 23.49%; position: relative;"><svg viewBox="0 0 596 140" preserveAspectRatio="xMidYMid meet" focusable="false" class="is-fluid" width="200" height="47" role="presentation" aria-hidden="true" style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"><path d="M1"></path></svg></div>`
  ));
});


test('Custom class', () => {
  const fluidSVGPolyfill = require("../index");

  // Add demo SVG
  document.body.innerHTML = svg;

  const svgEl = document.querySelector('.is-fluid');

  fluidSVGPolyfill(svgEl, { wrapperClass: "custom-class" });

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div class="custom-class" style="padding-top: 23.49%; position: relative;"><svg viewBox="0 0 596 140" preserveAspectRatio="xMidYMid meet" focusable="false" class="is-fluid" width="200" height="47" role="presentation" aria-hidden="true" style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"><path d="M1"></path></svg></div>`
  ));
});


test('No viewBox', () => {
  const fluidSVGPolyfill = require("../index");

  // Add demo SVG
  document.body.innerHTML = `<svg focusable="false" width="302" height="355.03" class="is-fluid" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="sprite.svg#icon"></use></svg>`;

  const svgEl = document.querySelector('.is-fluid');

  fluidSVGPolyfill(svgEl);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div style="padding-top: 117.56%; position: relative;"><svg focusable="false" width="302" height="355.03" class="is-fluid" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"><use xlink:href="sprite.svg#icon"></use></svg></div>`
  ));
});


test('No dimensions', () => {
  global.console = { warn: jest.fn() };

  const fluidSVGPolyfill = require("../index");

  const svgNoDimensions = '<svg preserveAspectRatio="xMidYMid meet" focusable="false" class="is-fluid" role="presentation" aria-hidden="true"><path d="M1"></path></svg>';

  // Add demo SVG
  document.body.innerHTML = svgNoDimensions;

  const svgEl = document.querySelector('.is-fluid');

  fluidSVGPolyfill(svgEl);

  expect(console.warn).toBeCalled();

  expect(minify(document.body.innerHTML)).toBe(minify(svgNoDimensions));
});


test('Invalid element', () => {
  global.console = { warn: jest.fn() };

  const fluidSVGPolyfill = require("../index");

  const p = '<p class="is-fluid">This will fail</p>';

  // Add non-svg element
  document.body.innerHTML = p;

  const svgEl = document.querySelector('.is-fluid');

  fluidSVGPolyfill(svgEl);

  expect(console.warn).toBeCalled();

  expect(minify(document.body.innerHTML)).toBe(p);
});


test('Modern browser', () => {
  // Remove class to test modern browsers
  // (this will carry over to subsequent tests)
  document.documentElement.className = "";

  const fluidSVGPolyfill = require("../index");

  // Add demo SVG
  document.body.innerHTML = svg;

  const svgEl = document.querySelector('.is-fluid');

  expect(fluidSVGPolyfill(svgEl)).toBe(false);
});
