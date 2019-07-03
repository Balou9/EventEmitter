import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { EventEmitter } from "./mod.ts";

function eventListener1 () : void {
  console.log('An event occured!');
};

function eventListener2 () : void {
  console.log('Another event occured!');
};

function eventListener3 () : void {
  console.log('Third event occured!');
};

function eventListener4 () : void {
  console.log('Fourth event occured!');
};

function StatusListener (code: number, msg: string) : void {
  console.log(`Got ${code} and ${msg}`)
};

test(function addListener () : void {
  const myEmitter = new EventEmitter();

  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  assertEquals(myEmitter.listenerCount('eventName') == 2, true);
});

test(function removeListener () : void {
  const myEmitter = new EventEmitter();

  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  myEmitter.off('eventName', eventListener1);
  assertEquals(myEmitter.listenerCount('eventName'), 1);
});

test(function emitRegisteredEvent () : void {
  const myEmitter = new EventEmitter();

  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  myEmitter.on('eventName', eventListener3);
  assertEquals(myEmitter.emit('eventName'), true);
});

test(function emitUnRegisteredEvent () : void {
  const myEmitter = new EventEmitter();

  myEmitter.on('eventName', eventListener1);
  myEmitter.on('eventName', eventListener2);
  myEmitter.on('eventName', eventListener3);
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
  myEmitter.once('eventNameOnce', eventListener2);
  myEmitter.once('eventNameOnce', eventListener3);
  myEmitter.once('eventNameOnce', eventListener4);
  myEmitter.emit('eventNameOnce');
  assertEquals(myEmitter.listenerCount('eventNameOnce'), 0);
});

test(function removeAllListenersFromSpecifiedEvent () : void {
  const myEmitter = new EventEmitter();

  myEmitter.on('eventName1', eventListener1);
  myEmitter.on('eventName1', eventListener2);
  myEmitter.on('eventName2', eventListener3);
  myEmitter.on('eventName2', eventListener4);
  myEmitter.removeAllListeners('eventName1');
  assertEquals(myEmitter.listenerCount('eventName1'), 0);

});

test(function removeAllListenersFromAllEvents () : void {
  const myEmitter = new EventEmitter();

  myEmitter.on('eventName1', eventListener1);
  myEmitter.on('eventName1', eventListener2);
  myEmitter.on('eventName2', eventListener3);
  myEmitter.on('eventName2', eventListener4);
  myEmitter.removeAllListeners();
  // const eventNamesofMyEmitter : String[] = myEmitter.eventNames()
  // compare listener Function[] === []
  assertEquals(myEmitter.listenerCount('eventName1'), 0);
  assertEquals(myEmitter.listenerCount('eventName2'), 0);
});

runTests();
