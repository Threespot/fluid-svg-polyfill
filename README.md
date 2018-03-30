# Fluid SVG Polyfill

[![npm](https://badge.fury.io/js/%40threespot%2Ffluid-svg-polyfill.svg)](https://www.npmjs.com/package/@threespot/fluid-svg-polyfill)
[![Build Status](https://travis-ci.org/Threespot/fluid-svg-polyfill.svg?branch=master)](https://travis-ci.org/Threespot/fluid-svg-polyfill)
[![Coverage Status](https://coveralls.io/repos/github/Threespot/fluid-svg-polyfill/badge.svg)](https://coveralls.io/github/Threespot/fluid-svg-polyfill)

Fix SVG responsive scaling in IE 11 and below using the “padding hack” technique. Inspired by https://gist.github.com/Heydon/369185d08d9ce2426f01863625e95525

More info on “padding hack” technique:
- http://alistapart.com/article/creating-intrinsic-ratios-for-video
- https://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/
- https://css-tricks.com/scale-svg/

## Install

```bash
$ yarn add @threespot/fluid-svg-polyfill
```

## Usage

```js
import fluidSVGPolyfill from "../lib/ie-svg-fix";

// Add “is-fluid” class to any SVGs that are fluid width
const svgs = document.querySelectorAll('.is-fluid');

svgs.forEach( el => fluidSVGPolyfill(el) );
```

You can also specify a custom class to add to the wrapper `<div>`:

```js
fluidSVGPolyfill(svgEl, { wrapperClass: "custom-class" });
```

## License

This is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/fluid-svg-polyfill/blob/master/LICENSE.md).

## About Threespot

Threespot is an independent digital agency hell-bent on helping those, and only those, who are committed to helping others. Find out more at [https://www.threespot.com](https://www.threespot.com).

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
