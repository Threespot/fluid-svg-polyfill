// https://stackoverflow.com/a/41619307/673457
global.window.matchMedia = jest.fn(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});
