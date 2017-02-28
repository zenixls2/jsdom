"use strict";

const EventImpl = require("./Event-impl").implementation;

class StorageEventImpl extends EventImpl {

}

module.exports = {
  implementation: StorageEventImpl
};
