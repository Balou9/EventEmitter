export class EventEmitter {
  private listeners: Map<string, Function[]> = new Map<string, Function[]>();

  on(eventName: string, fn: Function): EventEmitter {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(fn);
    return this;
  };

  off(eventName: string, fn: Function) : EventEmitter {
    if (this.listeners.has(eventName)) {
      const eventListeners: Function[] = this.listeners.get(eventName);
      eventListeners.splice(eventListeners.indexOf(fn), 1);
    }
    return this;
  };

  once(eventName: string, fn: Function) : EventEmitter {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    const emitOnce = (...args : any[]) => {
      fn(...args);
      this.off(eventName, fn);
    };
    this.listeners.get(eventName).push(emitOnce);
    return this;
  };

  emit(eventName: string, ...args: any[]) : Boolean {
    if (!this.listeners.has(eventName)) {
      return false;
    }
    const eventListeners: Function[] = this.listeners.get(eventName).reverse();
    for (let i = this.listenerCount(eventName); i--;) {
      eventListeners[i](...args)
    }
    return true;
  };

  listenerCount(eventName: string) : number {
    return this.listeners.get(eventName).length;
  };
}
