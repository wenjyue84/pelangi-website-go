/**
 * Yields to the main thread using the Scheduler API when available,
 * falling back to setTimeout(0) for browsers without support.
 *
 * Unlike setTimeout(0) which deprioritises continuation,
 * scheduler.yield() resumes execution at the same priority.
 *
 * @see https://web.dev/articles/optimize-long-tasks
 */
export function yieldToMain(): Promise<void> {
  if (typeof scheduler !== "undefined" && typeof scheduler.yield === "function") {
    return scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}
