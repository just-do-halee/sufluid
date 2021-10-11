import { Action, ActionTypeName } from './action';
import { Hook, Witness, React, TagName } from './types';

export type ActionType<A extends Action> = Hook<A, ActionTypeName>;

export interface Actor<A extends Action> {
  /* id in Action */
  readonly name: TagName;
  /* changes internal properties */
  readonly witness: Witness<A>;
  /* add child */
  sub(child: Actor<A>): void;
  /* broadcast internal properties to children */
  broadcast(action: A): void;
}

export class ActorImpl<A extends Action> implements Actor<A> {
  private readonly children: Actor<A>[] = []; /* children */
  protected constructor(
    public readonly name: TagName,
    public readonly witness: Witness<A>,
    protected readonly parents: ActorImpl<A>[],
    private readonly react: React
  ) {
    parents.forEach((p) => p.sub(this)); /* attach to parents */
  }
  static new<A extends Action>(
    name: TagName,
    witness: Witness<A> = async () => undefined,
    parents: ActorImpl<A>[] = [],
    react: React = () => {}
  ) {
    return new ActorImpl<A>(name, witness, parents, react);
  }
  sub(child: Actor<A>): void {
    this.children.push(child);
  }
  broadcast(action: A): void {
    this.children.forEach((c) => c.witness(action, this.name).then(this.react));
  }
}
