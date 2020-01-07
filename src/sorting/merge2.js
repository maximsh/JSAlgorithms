/*jshint esversion: 6 */

import compare from '../core/compare.js';

function insertionSort(data, begin, size, compareFunction) {
	const length = Math.min(size, data.length - begin);
	let bufferSize = 1;

	while (bufferSize < length) {
		let index = begin + bufferSize;
		while ((index >= begin + 1) && compareFunction(data[index-1], data[index]) > 0) {
			[data[index-1], data[index]] = [data[index], data[index-1]];
			index--;
		}
		bufferSize++;
	}

	return data;
}

function sort(data, compareFunction = compare) {
	const size = data.length;

	if (size < 2) {
		return data;
	}

	const maxChunk = size - (size >> 1);
	let chunkSize = 64;


	for (let pos = 0; pos < size; pos += chunkSize) {
		insertionSort(data, pos, chunkSize, compareFunction);
	}

	if (size <= chunkSize) {
		return data;
	}

	do {
		const blockSize = chunkSize << 1;
		for (let pos = 0; pos < size; pos += blockSize) {
			const block = data.slice(pos, pos + blockSize);
			const leftSize = chunkSize;
			const rightSize = block.length;
			let mainPos = pos;
			let leftPos = 0;
			let rightPos = chunkSize;
			while (leftPos < leftSize && rightPos < rightSize) {
				data[mainPos++] = compareFunction(block[leftPos], block[rightPos]) < 0 ? block[leftPos++] : block[rightPos++];
			}
			while (leftPos < leftSize) {
				data[mainPos++] = block[leftPos++];
			}
			while (rightPos < rightSize) {
				data[mainPos++] = block[rightPos++];
			}
		}
		chunkSize = blockSize;
	} while (chunkSize <= maxChunk);

	return data;
}

export default sort;