/*jshint esversion: 6 */

import Heap from './src/structures/minheap.js';

const heap = new Heap();
heap.put(8);
heap.put(3);
heap.put(6);
heap.put(10);
heap.put(7);
heap.put(1);
heap.put(14);
heap.put(4);
heap.put(13);

console.log(Array.from(heap));