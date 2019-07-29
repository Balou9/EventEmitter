import { EventEmitter } from "./mod.ts";
const myEmitter = new EventEmitter();

function eventListener1(): void {
  console.log("An event occured!");
}

function eventListener2(): void {
  console.log("Another event occured!");
}

function eventListener3(): void {
  console.log("Third event occured!");
}

function eventListener4(): void {
  console.log("Fourth event occured!");
}

myEmitter.on("eventName1", eventListener1);
myEmitter.on("eventName1", eventListener2);
myEmitter.on("eventName1", eventListener3);
myEmitter.once("eventName1", eventListener4);
// console.log(myEmitter.eventNames());
// console.log(myEmitter.removeAllListeners("eventName1"));
// console.log(myEmitter.removeAllListeners())
// console.log(myEmitter.listeners("eventName2"));

console.log(myEmitter.listeners('eventName1'))
console.log(myEmitter._onceWrap(myEmitter, "eventName1", eventListener2));
myEmitter.emit('eventName1')
console.log(myEmitter.listeners('eventName1'))
