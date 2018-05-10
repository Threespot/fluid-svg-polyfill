"use strict";

// Check if the browser requires this polyfill (IE 11-)
// https://philipnewcomer.net/2014/04/target-internet-explorer-10-11-css/
const needsPolyfill =
  document.documentElement.className.indexOf("old-ie") > -1 ||
  window.matchMedia("(-ms-high-contrast: none), (-ms-high-contrast: active)").matches;

/**
 * Rounding function that accounts for floating point errors
 * @param {number} value - Number to round
 * @param {number} decimals - Decimals places to round to
 */
// http://www.jacklmoore.com/notes/rounding-in-javascript/
// https://stackoverflow.com/a/29101013/673457
// http://floating-point-gui.de
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

/**
 * Preserve the aspect ratio of fluid-width SVGs in IE 11 and below
 * @param {HTMLElement} el - SVG element
 * @param {Object} opts - Options
 * @param {string} [opts.classes=""] - Class(es) to add to the wrapper or iframe (depends on wrap option)
 */
export default function(el, opts) {
  if (!needsPolyfill) {
    return false;
  }

  // Make sure element is an SVG
  if (el.tagName.toLowerCase() !== "svg") {
    console.warn("fluidSVGPolyfill() only works on SVG elements", el);
    return false;
  }

  // Use Object.assign() to merge “opts” object with default values in “options”
  // Note: There’s only one option for now, but this approach makes it easy to add others in the future.
  const options = Object.assign(
    {},
    {
      wrapperClass: false // custom class(es) to add to the wrapper
    },
    opts
  );

  var aspectRatioPadding = null;

  // Check if SVG has a “viewBox” attribute
  if (el.hasAttribute("viewBox")) {
    var viewBox = el.getAttribute("viewBox").split(" "); // => [0, 0, width, height]

    // Calculate aspect ratio
    // Note: JS will automatically convert number strings to integers
    // http://2ality.com/2013/04/quirk-implicit-conversion.html
    aspectRatioPadding = viewBox[3] / viewBox[2] * 100;
  } else if (el.getAttribute("height") && el.getAttribute("width")) {
    // If no “viewBox”, check for height/width attributes to calculate aspect ratio
    aspectRatioPadding =
      el.getAttribute("height") / el.getAttribute("width") * 100;
  } else {
    console.warn("Couldn’t determine SVG’s aspect ratio", el);
    return false;
  }

  // Wrap SVG in div
  var wrapper = document.createElement("div");

  // Add custom wrapper class
  if (options.wrapperClass) {
    wrapper.className = options.wrapperClass;
  }

  wrapper.style.paddingTop = round(aspectRatioPadding, 3) + "%";
  wrapper.style.position = "relative";

  // Wrap SVG with the div
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);

  // Stretch SVG to fill parent
  // Merge any existing inline styles https://stackoverflow.com/a/34490573/673457
  Object.assign(el.style, {
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%"
  });
}
