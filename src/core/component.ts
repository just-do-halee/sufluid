import { Actor } from './actor';
import { Action } from './action';
import { Emitter } from './emitter';
import { SufluidConstructor, TagName, UnionStrings } from './types';

const S = Symbol;

export const block = S('block');
export const repeatCtx = S('repeat');
export const requestIdleCallback =
  window.requestIdleCallback || ((cb, ...args) => setTimeout(cb));

const LIFECYCLE_CREATE: unique symbol = Symbol();
const LIFECYCLE_RENDER: unique symbol = Symbol();

export interface SufluidClass<A extends Action = Action> {
  witness(action: Partial<A>, actor: Sufluid<A>): Promise<string | void>;
  sub(child: SufluidClass<A>): void;
}

export default abstract class Sufluid<A extends Action> extends HTMLElement {
  [sym: symbol]:
    | string
    | (() => void)
    | ((...args: any[]) => Promise<string | void>);
  ['constructor']: typeof Sufluid;

  static readonly suChildren: SufluidClass<any>[] = []; /* children */

  static sub(child: SufluidClass<any>): void {
    (<typeof Sufluid>this.constructor).suChildren?.push(child);
  }

  static parentList: SufluidClass[] = [];

  static fixedTemplate = '';
  static useShadow = true;

  private readonly shadowTemplate: ShadowRoot;

  protected name: TagName = this.tagName.toLowerCase();

  static async witness(
    action: Partial<any>,
    actor: Sufluid<any>
  ): Promise<string | void> {}

  protected broadcast(action: A): void {
    (<typeof Sufluid>this.constructor).suChildren?.forEach((c) =>
      (c as SufluidClass<A>).witness(action, this).then(this.react)
    );
  }

  protected react() {}

  private async [LIFECYCLE_RENDER](action: Partial<A>, actor: Sufluid<A>) {
    const plainCode: string | void = await (<typeof Sufluid>(
      this.constructor
    )).witness(action, actor); // User process
    if (!plainCode) {
      return;
    }

    const compiledCode: string = plainCode; // compile(plaincode) <- rollup plugin

    /* only diff */
    if (compiledCode !== this.shadowTemplate.innerHTML) {
      this.shadowTemplate.innerHTML = compiledCode;

      Promise.resolve().then(() => {
        // const { flush } = processDOM(this, tpl.content);
        // markFlush(this, flush);
        // flush();
        // this.onCreated();
        // (this.shadowRoot || this).appendChild(tpl.content);
        // this.onRender();
      });

      return compiledCode;
    }
    return;
  }

  constructor() {
    super();
    this.shadowTemplate = this.attachShadow({
      mode: 'open',
    });
    this[LIFECYCLE_CREATE]();
  }

  /** @abstract */
  onBeforeCreated() {}

  /** @abstract */
  onCreated() {}

  /** @abstract */
  onAdded() {}

  /** @abstract */
  onRemoved() {}

  /** @abstract */
  onRender() {}

  connectedCallback() {
    (<typeof Sufluid>this.constructor).parentList?.forEach((p) =>
      p.sub(<typeof Sufluid>this.constructor)
    );
    this[LIFECYCLE_RENDER]({}, this);
    this.onAdded();
  }

  disconnectedCallback() {
    this.onRemoved();
  }

  [LIFECYCLE_CREATE]() {
    if (this[block] === 'abort') return;
    if (this[block]) {
      requestAnimationFrame(() => this[LIFECYCLE_CREATE]());
      return;
    }
    this.onBeforeCreated();
    this.shadowTemplate.innerHTML = this.constructor.fixedTemplate;
  }
}
