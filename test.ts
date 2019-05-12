import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { EventEmitter } from "./mod.ts";

function eventListener1 () : void {
  console.log('An event occured!');
};

function eventListener2 () : void {
  console.log('Another event occured!');
};

function StatusListener (code: number, msg: string) : void {
  console.log(`Got ${code} and ${msg}`)
}

test(function addListener () : void {
  const myEmitter = new EventEmitter();
  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  assertEquals(myEmitter.listenerCount('eventName') > 0, true);
  assertEquals(myEmitter.listenerCount('eventName') == 2, true);
});

test(function removeListener () : void {
  const myEmitter = new EventEmitter();
  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  myEmitter.off('eventName', eventListener1);
  assertEquals(myEmitter.listenerCount('eventName'), 1);
});

test(function emit () : void {
  const myEmitter = new EventEmitter();
  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  assertEquals(myEmitter.emit('eventName'), true);
  assertEquals(myEmitter.emit('eventNameNotRegistered'), false);
});

test(function emitWithCallbackParameters () : void {
  const myEmitter = new EventEmitter();
  myEmitter.on('eventName', StatusListener);
  assertEquals(myEmitter.emit('eventName', 200, 'OK'), true);
});

test(function emitOnce () : void {
  const myEmitter = new EventEmitter();
  myEmitter.once('eventNameOnce', eventListener1);
  myEmitter.emit('eventNameOnce');
  assertEquals(myEmitter.listenerCount('eventNameOnce'), 0);
});

runTests();
