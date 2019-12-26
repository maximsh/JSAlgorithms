/*jshint esversion: 6 */

import Heap from "./heap.js";

class MinHeap extends Heap {
	constructor(items = []) {
		super(items);
		this.comparisonValue = -1;
	}
}

export default MinHeap;