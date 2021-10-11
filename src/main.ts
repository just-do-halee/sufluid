import Component from './core/component';
import Sufluid from './core/component';
import { Actor } from './core/actor';
import { Action } from './core/action';
import { Emitter } from './core/emitter';
import { define, parents } from './core/decorators';
import { TagName, UnionStrings } from './core/types';

type AuthAct = Action<'1' | '2' | '3'> & {
  name: string;
  age: number;
};

@define('app-root')
class App extends Sufluid<AuthAct> {
  #name: string = 'aaa';
  #year: boolean = true;

  static async witness(action: Partial<AuthAct>, actor: Sufluid<AuthAct>) {
    console.log(this.name);
    return `
    <my-button actor="root" type="2" name="nep2i" age="15"></my-button>
    <my-button actor="root" type="3" name="nep2i" age="15"></my-button>
    <my-button actor="root" name="nqwdqwdep2i" age="15"></my-button>
    `;
  }
}

@define('my-button')
@parents(App)
class MyButton extends Sufluid<AuthAct> {
  name: string = 'aaa';
  year: boolean = true;

  static async witness(action: Partial<AuthAct>, actor: Sufluid<AuthAct>) {
    switch (action.type) {
      case '1':
        return `<span>1</span>`;
      case '2':
        return `<h3>2</h3>`;
      case '3':
        return `<h1>3</h1>`;
      default:
      
        return `<button>${actor.tagName}</button>`;
    }
  }
  static aaa() {}
}
