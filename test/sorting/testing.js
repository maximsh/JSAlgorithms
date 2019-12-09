/*jshint esversion: 6 */

import compare from '../../src/core/compare.js';

function testing(sort) {
	test('sort []', () => {
		expect(sort([])).toEqual([]);
	});

	test('sort [0]', () => {
		expect(sort([0])).toEqual([0]);
	});

	test('sort [-1,0]', () => {
		expect(sort([-1,0])).toEqual([-1,0]);
	});

	test('sort [-1,0,1]', () => {
		expect(sort([-1,0,1])).toEqual([-1,0,1]);
	});

	test('sort [1,1,1]', () => {
		expect(sort([1,1,1])).toEqual([1,1,1]);
	});

	test('result is equal to system sort', () => {
		for (let i = 0; i < 10; i++) {
			const data = Array.from({length: 1024}, Math.random);
			const sortedSystem = data.slice().sort(compare);
			expect(sort(data)).toEqual(sortedSystem);
		}
	});

	test('sorted array is not changed', () => {
		const original = Array.from({length: 1024}, Math.random).sort(compare);
		expect(sort(original.slice())).toEqual(original);
	});
}

export default testing;

