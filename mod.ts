export class EventEmitter {
  listeners: object = {};
  on(event: string, fn: Function) : object {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
    return this;
  };
  off(event: string, fn: Function) : object {
    if (!this.listeners[event]) return this;
    else
      for (let i = 0; i < this.listeners[event].length; i++) {
        if (this.listeners[event][i] === fn) this.listeners[event].splice(i,1);
          break;
      }
  };
  once(event: string, fn: Function) : object {
    if (!this.listeners[event]) this.listeners[event] = [];
    const emitOnce = (...args : any[]) => {
      fn(...args);
      this.off(event, emitOnce);
    }
    this.listeners[event].push(emitOnce);
    return this
  };
  emit(event: string, ...args: any[]) : Boolean {
    if (!this.listeners[event]) return false;
    this.listeners[event].forEach((f : Function) => {
      f(...args);
    });
    return true;
  }
}
