import { Action } from './action';
import { SufluidClass } from './component';
import { SufluidConstructor, TagName } from './types';

export function define(name: TagName) {
  return function <T extends SufluidConstructor>(target: T) {
    customElements.define(name, target);
    return class extends target {
      static get observedAttributes(): string[] {
        return ['actor', 'type'];
      }
      constructor(...args: any[]) {
        super();
      }
      async witness() {}
    };
  };
}

export function parents(...sufluidClass: SufluidClass[]) {
  return function <T extends SufluidConstructor>(target: T) {
    return class extends target {
      static parentList: SufluidClass[] = sufluidClass;
    };
  };
}
