'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const S = Symbol;
const block = S('block');
const LIFECYCLE_CREATE = Symbol();
const LIFECYCLE_RENDER = Symbol();
class Sufluid extends HTMLElement {
    constructor() {
        super();
        this.name = this.tagName.toLowerCase();
        this.shadowTemplate = this.attachShadow({
            mode: 'open',
        });
        this[LIFECYCLE_CREATE]();
    }
    static sub(child) {
        var _a;
        (_a = this.constructor.suChildren) === null || _a === void 0 ? void 0 : _a.push(child);
    }
    static witness(action, actor) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    broadcast(action) {
        var _a;
        (_a = this.constructor.suChildren) === null || _a === void 0 ? void 0 : _a.forEach((c) => c.witness(action, this).then(this.react));
    }
    react() { }
    [LIFECYCLE_RENDER](action, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const plainCode = yield (this.constructor).witness(action, actor);
            if (!plainCode) {
                return;
            }
            const compiledCode = plainCode;
            if (compiledCode !== this.shadowTemplate.innerHTML) {
                this.shadowTemplate.innerHTML = compiledCode;
                Promise.resolve().then(() => {
                });
                return compiledCode;
            }
            return;
        });
    }
    onBeforeCreated() { }
    onCreated() { }
    onAdded() { }
    onRemoved() { }
    onRender() { }
    connectedCallback() {
        var _a;
        (_a = this.constructor.parentList) === null || _a === void 0 ? void 0 : _a.forEach((p) => p.sub(this.constructor));
        this[LIFECYCLE_RENDER]({}, this);
        this.onAdded();
    }
    disconnectedCallback() {
        this.onRemoved();
    }
    [LIFECYCLE_CREATE]() {
        if (this[block] === 'abort')
            return;
        if (this[block]) {
            requestAnimationFrame(() => this[LIFECYCLE_CREATE]());
            return;
        }
        this.onBeforeCreated();
        this.shadowTemplate.innerHTML = this.constructor.fixedTemplate;
    }
}
Sufluid.suChildren = [];
Sufluid.parentList = [];
Sufluid.fixedTemplate = '';
Sufluid.useShadow = true;

function define(name) {
    return function (target) {
        customElements.define(name, target);
        return class extends target {
            static get observedAttributes() {
                return ['actor', 'type'];
            }
            constructor(...args) {
                super();
            }
            witness() {
                return __awaiter(this, void 0, void 0, function* () { });
            }
        };
    };
}
function parents(...sufluidClass) {
    return function (target) {
        var _a;
        return _a = class extends target {
            },
            _a.parentList = sufluidClass,
            _a;
    };
}

var _App_name, _App_year;
let App = class App extends Sufluid {
    constructor() {
        super(...arguments);
        _App_name.set(this, 'aaa');
        _App_year.set(this, true);
    }
    static witness(action, actor) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.name);
            return `
    <my-button actor="root" type="2" name="nep2i" age="15"></my-button>
    <my-button actor="root" type="3" name="nep2i" age="15"></my-button>
    <my-button actor="root" name="nqwdqwdep2i" age="15"></my-button>
    `;
        });
    }
};
_App_name = new WeakMap(), _App_year = new WeakMap();
App = __decorate([
    define('app-root')
], App);
let MyButton = class MyButton extends Sufluid {
    constructor() {
        super(...arguments);
        this.name = 'aaa';
        this.year = true;
    }
    static witness(action, actor) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static aaa() { }
};
MyButton = __decorate([
    define('my-button'),
    parents(App)
], MyButton);
//# sourceMappingURL=main.js.map
