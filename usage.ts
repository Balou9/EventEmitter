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
// myEmitter.off('mikey', mikeyListener)
// console.log(myEmitter.listeners, 'Listener array should be empty.')
myEmitter.on('mikey', mikeyListener2)
myEmitter.emit('mikey')
console.log(myEmitter.listeners)
myEmitter.once('justOnce', rashadListener)
myEmitter.once('justOnce', rashadListener2)
console.log(myEmitter.listeners, 'register justOnce')
myEmitter.emit('justOnce', rashadListener)
myEmitter.emit('justOnce', rashadListener2)
console.log(myEmitter.listeners, 'justOnce Should be empty as well.')
// myEmitter.on('mikey', mikeyListener2)
// myEmitter.off('mikey', mikeyListener2)
// myEmitter.on('rashad', rashadListener)
// myEmitter.on('rashad', rashadListener2)
