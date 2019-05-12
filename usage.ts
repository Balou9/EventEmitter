import { EventEmitter } from "./mod.ts";
const myEmitter = new EventEmitter();

function EventListener1 () : void {
  console.log('An event occured!');
};

function EventListener2 () : void {
  console.log('Another event occured!');
};

myEmitter.on('eventName2', EventListener1);
myEmitter.on('eventName2', EventListener2);
myEmitter.emit('eventName2');
console.log(myEmitter);

myEmitter.once('eventName', EventListener1)
myEmitter.once('eventName', EventListener2);
myEmitter.emit('eventName');
// Should emit both once Listeners? Is this even a use case?
console.log(myEmitter);
