export class EventEmitter {
  private eventListeners: Map<string, Function[]> = new Map<
    string,
    Function[]
  >();

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

  once(eventName: string, fn: Function): EventEmitter {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    const emitOnce = (...args: any[]) => {
      fn(...args);
      this.off(eventName, fn);
    };
    this.eventListeners.get(eventName).push(emitOnce);
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


  listeners(eventName: string): Function[] {
    return this.eventListeners.get(eventName).slice(0);
  }
}
