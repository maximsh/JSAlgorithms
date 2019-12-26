/*jshint esversion: 6 */

import Heap from '../../src/structures/heap.js';

test('abstract heap', () => {
	expect(Heap).toThrow(TypeError);
});
