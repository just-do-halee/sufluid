import { ActorImpl } from './actor';
import { Action } from './action';

export abstract class Emitter<A extends Action> extends ActorImpl<A> {}
