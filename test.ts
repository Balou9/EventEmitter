import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { EventEmitter } from "./mod.ts";

function mikeyListener () : void {
  console.log('We in here');
};

test(function addListener () : void {
  const myEmitter = new EventEmitter();
  myEmitter.on('mikey', mikeyListener);
  assertEquals(myEmitter.listeners, { mikey: [ mikeyListener ] });
});

test(function removeListener () : void {
  const myEmitter = new EventEmitter();
  myEmitter.on('mikey', mikeyListener);
  myEmitter.off('mikey', mikeyListener);
  assertEquals(myEmitter.listeners, { mikey: [] });
});

runTests();
