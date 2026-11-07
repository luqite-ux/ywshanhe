export const PRODUCT_QUERY_TIMEOUT_MS = 3_000

type AbortableQuery<TResult> = {
  abortSignal(signal: AbortSignal): PromiseLike<TResult>
}

export async function runAbortableQuery<TResult>(
  query: AbortableQuery<TResult>,
  timeoutMs = PRODUCT_QUERY_TIMEOUT_MS,
): Promise<TResult> {
  return await query.abortSignal(AbortSignal.timeout(timeoutMs))
}
