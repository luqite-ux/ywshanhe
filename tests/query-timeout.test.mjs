import assert from 'node:assert/strict'
import test from 'node:test'

import { runAbortableQuery } from '../lib/query-timeout.ts'

test('a stalled data query is aborted within the configured deadline', async () => {
  let receivedSignal
  const stalledQuery = {
    abortSignal(signal) {
      receivedSignal = signal
      return new Promise((resolve) => {
        signal.addEventListener('abort', () => resolve({ data: null, error: new Error('aborted') }), { once: true })
      })
    },
  }

  const startedAt = Date.now()
  const result = await runAbortableQuery(stalledQuery, 20)

  assert.equal(receivedSignal.aborted, true)
  assert.match(String(result.error), /aborted/i)
  assert.ok(Date.now() - startedAt < 250, 'stalled query should not block page rendering')
})
