/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
    let isChanged= false;
    let isFinished = false;
    let begin = 1;
    let end = data.length-1;
    let step = 1;
    let index = begin;

    while (!isFinished && begin <= end) {
        if (compareFunction(data[index-1], data[index]) > 0) {
            [data[index-1], data[index]] = [data[index], data[index-1]];
            isChanged = true;
        }
        if (step === 1) {
            if (index === end) {
                isFinished = !isChanged;
                isChanged = false;
                step = -1;
                end--;
            }
        } else {
            if (index === begin) {
                isFinished = !isChanged;
                isChanged = false;
                step = 1;
                begin++;
            }
        }
        index += step;
    }

	return data;
}

export default sort;