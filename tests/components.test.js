import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { build, transform } from 'esbuild';

test('GitHub card distinguishes loading, failure and a successful zero', async () => {
  const result = await build({
    stdin: {
      resolveDir: process.cwd(),
      contents: `
        import React from 'react';
        import { renderToStaticMarkup } from 'react-dom/server';
        import { GithubCard } from './src/components/ui/contact-cards.jsx';
        export function render(days) {
          return renderToStaticMarkup(React.createElement(GithubCard, {
            github: { username: 'AldyOkta', days },
            loadingLabel: 'Loading contributions', errorLabel: 'Could not load contributions',
            contributionsLabel: 'contributions'
          }));
        }
      `,
    },
    bundle: true, write: false, platform: 'node', format: 'cjs', logLevel: 'silent',
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
  assert.match(module.exports.render(undefined), /Loading contributions/);
  assert.doesNotMatch(module.exports.render(undefined), /0 contributions/);
  assert.match(module.exports.render({}), /Could not load contributions/);
  assert.match(module.exports.render([]), /0 contributions/);
  assert.match(module.exports.render([{ date: '2026-10-24', count: 3 }]), /3 contributions/);
});

test('StrictMode setup/cleanup leaves one managed scroll loop and none after unmount', async () => {
  let effect;
  let nextId = 0;
  const frames = new Map();
  const requestAnimationFrame = (callback) => { frames.set(++nextId, callback); return nextId; };
  const cancelAnimationFrame = (id) => frames.delete(id);
  // Model Lenis' autoRaf/destroy contract; a second app-owned loop must not survive.
  class Lenis {
    constructor(options) {
      assert.equal(options.autoRaf, true);
      this.frame = requestAnimationFrame(() => {});
    }
    destroy() { cancelAnimationFrame(this.frame); }
  }
  const code = await transform(readFileSync('src/components/ui/SmoothScroll.jsx', 'utf8'), { format: 'cjs', loader: 'jsx' });
  const module = { exports: {} };
  const window = {};
  runInNewContext(code.code, {
    module, exports: module.exports, window, requestAnimationFrame, cancelAnimationFrame,
    require: (name) => name === 'react' ? { useEffect: (callback) => { effect = callback; } } : Lenis,
  });
  module.exports.default({ children: null });
  effect()();
  assert.equal(frames.size, 0);
  const cleanup = effect();
  assert.equal(frames.size, 1);
  assert.ok(window.__lenis);
  cleanup();
  assert.equal(frames.size, 0);
  assert.equal(window.__lenis, undefined);
});
