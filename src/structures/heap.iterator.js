/*jshint esversion: 6 */

import Heap from "./heap.js";

class Iterator {
	constructor(heap) {
		function* helper(heap) {
			while (!heap.isEmpty) {
				yield heap.shift();
			}
		}

		this.iterator = helper(heap.clone());
	}

	next() {
        return this.iterator.next();
	}
}

export default Iterator;