import { EventEmitter } from "./mod.ts";
const myEmitter = new EventEmitter();

function eventListener1 () : void {
  console.log('An event occured!');
};

function eventListener2 () : void {
  console.log('Another event occured!');
};

myEmitter.on('eventName2', eventListener1);
myEmitter.on('eventName2', eventListener2);
myEmitter.emit('eventName2');
