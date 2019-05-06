export class EventEmitter {
  listeners: object = {};
  on(event: string, fn: Function) : object {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(fn)
    return this
  };
  off(event: string, fn: Function) : object {
    if (!this.listeners[event]) { return this }
    else {
//      this.listeners[event].map(function (func : Function) : Boolean {
//      return func != fn });
      for (let i = 0; i < this.listeners[event].length; i++) {
        if (this.listeners[event][i] === fn) this.listeners[event].splice(i,1);
          break;
      }
      return this;
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
}
