import { UnionStrings } from './types';

export type ActionTypeName = 'type';

export interface Action<
  Type extends UnionStrings<string> = UnionStrings<string>
> {
  type: Type;
}
