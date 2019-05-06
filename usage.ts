import { EventEmitter } from "./mod.ts";
const myEmitter = new EventEmitter();

function mikeyListener () : void {
  console.log('We in here');
};

function mikeyListener2 () : void {
  console.log('Why why');
};

function rashadListener () : void {
  console.log('Me too.');
};

function rashadListener2 () : void {
  console.log('Zeze.');
};

myEmitter.on('mikey', mikeyListener)
// myEmitter.on('mikey', mikeyListener2)
// myEmitter.on('rashad', rashadListener)
// myEmitter.on('rashad', rashadListener2)
console.log(myEmitter.listeners)

// myEmitter.off('mikey', mikeyListener2)
myEmitter.off('mikey', mikeyListener)
console.log(myEmitter.listeners["rashad"])

myEmitter.once('justOnce', rashadListener)
