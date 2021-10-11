import { ActorImpl, Actor } from './actor';
import { Action } from './action';
import Sufluid from './component';

export type UnionStrings<T> = T extends string ? T : never;
export type Zone<Ids> = Record<UnionStrings<Ids>, object>;

export type Witness<C extends Action> = (
  action: Partial<C>,
  actor: UnionStrings<TagName>
) => Promise<string | void>;

export type React = (mutated: string | void) => void;

export type Hook<T, K extends keyof T> = T[K];

export type HookContract<T, C extends Action> = {
  [K in keyof T]: T[K] extends ActorImpl<C> ? T[K] : never;
}[keyof T];

// constructors
export type Constructor<T = {}> = {
  new (...args: any[]): T;
};
export type SufluidConstructor<A extends Action = Action> = Constructor<
  Sufluid<A>
>;

export type TagName = Lowercase<string>;
