"use strict";

const StorageEvent = require("../generated/StorageEvent");

class StorageImpl {
  constructor(args, privateData) {
    this._ownerDocument = privateData.ownerDocument;
    this.clear();
  }

  key(index) {
    if (this._keys.length <= index) {
    return null;
    }
    return this._keys[index];
  }

  getItem(key) {
    return this._data[key];
  }

  setItem(key, value) {
    const evtInit = this._createEvent(key);
    if (key in this._keys) {
      evtInit.oldValue = this._data[key];
    } else {
      this._keys.push(key);
    }
    evtInit.newValue = this._data[key] = value;
    this._fireEvent(evtInit);
  }

  removeItem(key) {
    if (key in this._keys) {
      const evtInit = this._createEvent(key);
      evtInit.oldValue = this._data[key];

      delete this._data[key];
      this._keys.splice(this._keys.indexOf(key), 1);

      this._fireEvent(evtInit);
    }
  }

  clear() {
    this._keys = [];
    this._data = Object.create(null);
    const evtInit = this._createEvent(null);
    this._fireEvent(evtInit);
  }

  _createEvent(key) {
    return {
      key,
      url: this._ownerDocument.URL,
      storageArea: this,
      oldValue: null,
      newValue: null
    };
  }

  _fireEvent(evtInit) {
    if (this._ownerDocument.defaultView) {
      const evt = StorageEvent.createImpl(["storage", evtInit]);
      this._ownerDocument.defaultView.dispatchEvent(evt);
    }
  }
}

module.exports = {
  implementation: StorageImpl
};
