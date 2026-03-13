/** Type declarations for the Scheduler API (scheduler.yield). */

interface Scheduler {
  yield(): Promise<void>;
  postTask<T>(
    callback: () => T,
    options?: { priority?: "user-blocking" | "user-visible" | "background" }
  ): Promise<T>;
}

// eslint-disable-next-line no-var -- `declare var` is required syntax for ambient global declarations in .d.ts files
declare var scheduler: Scheduler | undefined;
