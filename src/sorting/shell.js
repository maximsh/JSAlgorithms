/*jshint esversion: 6 */

import compare from '../core/compare.js';

function* pow(maxValue, base) {
	let value = 1;
	while (value < maxValue) {
		yield value;
		value *= base;
	}
}

function* getSteps(maxValue) {
	const pow2values = Array.from(pow(maxValue, 2));
	const pow3values = Array.from(pow(maxValue, 3));
	let lastValue = maxValue;
	let pow2value = maxValue;
	let pow3value = maxValue;
	do {
		while (pow2value >= lastValue && pow2values.length) {
			pow2value = pow2values.pop();
		}
		while (pow3value >= lastValue && pow3values.length) {
			pow3value = pow3values.pop();
		}
		lastValue = pow3value > pow2value ? pow3value : pow2value;
		yield lastValue;
	} while(pow2values.length || pow3values.length);
}

function sort(data, compareFunction = compare) {
	const length = data.length;
	let steps = getSteps(length);

	for (let step of steps) {
		let bufferSize = 1;
		while (bufferSize*step < length) {
			let index = bufferSize*step;
			while (index >= step && compareFunction(data[index-step], data[index]) > 0) {
				[data[index-step], data[index]] = [data[index], data[index-step]];
				index-=step;
			}
			bufferSize++;
		}
	}

	return data;
}

export default sort;