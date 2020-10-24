interface State {
  fired: boolean;
  wrapFn: undefined;
  target: EventEmitter;
  eventName: string;
  listener: Function;
}

export class EventEmitter {
  private maxListeners: number | undefined;
  private defaultMaxListeners: number = 10;
  private eventListeners: Map<string, Function[]> = new Map<
    string,
    Function[]
  >();

  private unwrapListeners(arr: Function[]): Function[] {
    var unwrappedListeners: Function[] = new Array(arr.length) as Function[]
    for (let i = 0; i < arr.length; i++) {
      unwrappedListeners[i] = arr[i];
    }
    return unwrappedListeners;
  }

  setMaxListeners(n: number): EventEmitter {
    this.maxListeners = n;
    return this;
  }

  _getMaxListeners(target: EventEmitter): number {
    if (target.maxListeners === undefined) {
      return target.defaultMaxListeners;
    }
    return target.maxListeners;
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

  _listeners(
    target: EventEmitter,
    eventName: string,
    unwrap: boolean
  ): Function[] {
    if (!target.eventListeners.has(eventName)) {
      return [];
    }
    const eventListeners: Function[] = target.eventListeners.get(eventName);

    return unwrap
      ? this.unwrapListeners(eventListeners)
      : eventListeners.slice(0);
  }

  listeners(eventName: string): Function[] {
    return this.eventListeners.get(eventName).slice(0);
  }

  _onceWrap(
    target: EventEmitter,
    eventName: string,
    listener: Function
  ): Function {
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
      target: target,
      eventName: eventName,
      listener: listener
    };

    const wrapped = onceWrapper.bind(state);
    state.wrapFn = wrapped;
    wrapped.listener = listener;
    if (wrapped.listener) {
      return wrapped;
    }
  }

  once(eventName: string, listener: Function): EventEmitter {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.on(eventName, this._onceWrap(this, eventName, listener));
    return this;
  }

  on(eventName: string, listener: Function): EventEmitter {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.eventListeners.get(eventName).push(listener);
    return this;
  }

  off(eventName: string, listener: Function): EventEmitter {
    if (this.eventListeners.has(eventName)) {
      const eventListeners: Function[] = this.eventListeners.get(eventName);
      eventListeners.splice(eventListeners.indexOf(listener), 1);
    }
    return this;
  }

  removeAllListeners(eventName?: string): EventEmitter {
    if (eventName) {
      this.eventListeners.delete(eventName);
    } else {
      const eventList: string[] = this.eventNames();
      eventList.map((value: string) => {
        this.eventListeners.delete(value);
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
