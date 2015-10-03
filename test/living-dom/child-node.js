"use strict";

const jsdom = require("../..");

function createChildNodeTestDoc() {
  const doc = jsdom.jsdom(`
<div id="one">1</div>
<div id="two">2</div>
<div id="three">3</div>`);

  doc.one = doc.getElementById("one");
  doc.two = doc.getElementById("two");
  doc.three = doc.getElementById("three");

  return doc;
}

exports["ChildNode's before() smoke test"] = function (t) {
  const doc = createChildNodeTestDoc();
  doc.two.before("before");

  t.strictEqual(doc.two.previousSibling.textContent, "before");
  t.done();
};

exports["ChildNode's after() smoke test"] = function (t) {
  const doc = createChildNodeTestDoc();
  doc.two.after("after");

  t.strictEqual(doc.two.nextSibling.textContent, "after");
  t.done();
};

exports["ChildNode's remove() smoke test"] = function (t) {
  const doc = createChildNodeTestDoc();
  doc.two.remove();
  t.strictEqual(doc.two.parentNode, null);
  t.done();
};
