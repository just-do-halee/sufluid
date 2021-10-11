const addons: symbol = Symbol();

interface Registry<T> {
  readonly [addons: symbol]: T[];
  add(addon: T, priority: boolean): void;
  getAll(): T[];
}

class RegistryImpl<T> implements Registry<T> {
  readonly [addons: symbol]: T[];
  constructor() {}
  add(addon: T, priority: boolean = false): boolean {
    const beforeLen = this[addons].length;
    const afterLen = priority
      ? this[addons].unshift(addon)
      : this[addons].push(addon);
    return beforeLen !== afterLen;
  }
  getAll(): T[] {
    return [...this[addons]];
  }
}

