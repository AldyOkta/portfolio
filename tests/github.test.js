import assert from 'node:assert/strict';
import test from 'node:test';
import { loadGithubContributions, parseContributionDays } from '../src/utils/github.js';

const day = { date: '2026-10-24', count: 3, level: 2 };

test('accepts valid contributions, including genuine zero activity', () => {
  assert.deepEqual(parseContributionDays([day]), [day]);
  assert.deepEqual(parseContributionDays([{ ...day, count: 0, level: 0 }]), [{ ...day, count: 0, level: 0 }]);
  assert.deepEqual(parseContributionDays([]), []);
});

test('rejects malformed arrays, dates, counts and intensity levels', () => {
  for (const value of [undefined, null, {}, [null], [{}],
    [{ ...day, date: 'invalid' }], [{ ...day, date: '2026-02-30' }],
    [{ ...day, count: '3' }], [{ ...day, count: -1 }],
    [{ ...day, count: Infinity }], [{ ...day, count: 1.5 }],
    [{ ...day, level: 5 }]]) {
    assert.throws(() => parseContributionDays(value), /Invalid GitHub/);
  }
});

test('loads valid API data and passes the cancellation signal', async (t) => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://github-contributions-api.jogruber.de/v4/AldyOkta?y=last');
    assert.equal(options.signal, controller.signal);
    return { ok: true, json: async () => ({ contributions: [day] }) };
  });
  assert.deepEqual(await loadGithubContributions('AldyOkta', controller.signal), [day]);
});

test('HTTP, network, JSON and payload failures stay failures instead of zero activity', async (t) => {
  const mocked = t.mock.method(globalThis, 'fetch');
  for (const response of [
    async () => ({ ok: false, status: 503 }),
    async () => { throw new TypeError('Network unavailable'); },
    async () => ({ ok: true, json: async () => { throw new SyntaxError('Bad JSON'); } }),
    async () => ({ ok: true, json: async () => ({ contributions: {} }) }),
  ]) {
    mocked.mock.mockImplementation(response);
    await assert.rejects(loadGithubContributions('AldyOkta'));
  }
});

test('an aborted request does not turn into an empty result', async (t) => {
  const controller = new AbortController();
  controller.abort();
  t.mock.method(globalThis, 'fetch', async (_url, { signal }) => {
    signal.throwIfAborted();
  });
  await assert.rejects(loadGithubContributions('AldyOkta', controller.signal), { name: 'AbortError' });
});
