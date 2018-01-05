'use strict';

/**
 *
 This class is responsible for binding all functions of a class
 to `this` instance.
 Just extend your class from this and call the constructor and let it handle everything else.
 *
**/

class Bindable {

	constructor() {
		this._bindAll();
	}

	_bindAll() {
		//Binding every function to an instance of the class
		let prop = Object.getOwnPropertyNames(this.__proto__);
		for (let pr of prop) {
			if (pr != "constructor") {
				let descriptor = Object.getOwnPropertyDescriptor(this.__proto__, pr);
				if (typeof descriptor.value === "function") {
					this[pr] = this[pr].bind(this);

				}
			}
		}
	}
}

module.exports = Bindable;