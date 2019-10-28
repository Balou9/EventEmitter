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
myEmitter.removeAllListeners("eventName1");

console.log(myEmitter.emit("eventName1"));
console.log(myEmitter.eventNames());
