interface State {
  fired: boolean;
  wrapFn: undefined;
  target: EventEmitter;
  eventName: string;
  fn: Function;
}

export class EventEmitter {
  private maxListeners: number = undefined;
  private defaultMaxListeners: number = 10;
  private eventListeners: Map<string, Function[]> = new Map<
    string,
    Function[]
  >();

  setMaxListeners(n: number): EventEmitter {
    this.maxListeners = n;
    return this;
  }

  _getMaxListeners(that: EventEmitter): number {
    if (that.maxListeners === undefined) {
      return that.defaultMaxListeners;
    }
    return that.maxListeners;
  }

  getMaxListeners(): number {
    return this._getMaxListeners(this);
  }

  listenerCount(eventName: string): number {
    return this.eventListeners.get(eventName).length;
  }

  eventNames(): string[] {
    const eventList: string[] = [];
    for (let value of this.eventListeners.keys()) {
      eventList.push(value);
    }
    return eventList;
  }

  //  rawListeners(eventName: string) : Function[] {
  //
  //  }

  listeners(eventName: string): Function[] {
    return this.eventListeners.get(eventName).slice(0);
  }

  on(eventName: string, fn: Function): EventEmitter {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.eventListeners.get(eventName).push(fn);
    return this;
  }

  off(eventName: string, fn: Function): EventEmitter {
    if (this.eventListeners.has(eventName)) {
      const eventListeners: Function[] = this.eventListeners.get(eventName);
      eventListeners.splice(eventListeners.indexOf(fn), 1);
    }
    return this;
  }

  _onceWrap(target: EventEmitter, eventName: string, fn: Function): Function {
    function onceWrapper(...args: any[]) {
      if (!this.fired) {
        this.target.off(this.eventName, this.wrapFn);
        this.fired = true;
        return Reflect.apply(this.listener, this.target, args);
      }
    }

    const state: State = {
      fired: false,
      wrapFn: undefined,
      target,
      eventName,
      fn
    };
    const wrapped = onceWrapper.bind(state);
    wrapped.listener = fn;
    state.wrapFn = wrapped;
    return wrapped;
  }

  once(eventName: string, fn: Function): EventEmitter {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    //const emitOnce = (...args: any[]) => {
    //fn(...args);
    //this.off(eventName, fn);
    //};

    this.on(eventName, this._onceWrap(this, eventName, fn));
    // this.eventListeners.get(eventName).push(emitOnce);
    return this;
  }

  removeAllListeners(eventName?: string): EventEmitter {
    if (eventName) {
      this.eventListeners.set(eventName, []);
    } else {
      const eventList: string[] = this.eventNames();
      eventList.map((value: string) => {
        this.eventListeners.set(value, []);
      });
    }
    return this;
  }

  emit(eventName: string, ...args: any[]): Boolean {
    if (!this.eventListeners.has(eventName)) {
      return false;
    }
    const eventListeners: Function[] = this.eventListeners
      .get(eventName)
      .reverse();
    for (let i = this.listenerCount(eventName); i--; ) {
      eventListeners[i](...args);
    }
    return true;
  }
}
