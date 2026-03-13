/** Type declarations for the Scheduler API (scheduler.yield). */

interface Scheduler {
  yield(): Promise<void>;
  postTask<T>(
    callback: () => T,
    options?: { priority?: "user-blocking" | "user-visible" | "background" }
  ): Promise<T>;
}

declare var scheduler: Scheduler | undefined;
