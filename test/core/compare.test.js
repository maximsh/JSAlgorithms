/*jshint esversion: 6 */

import compare from '../../src/core/compare.js';

test('positive is greater than negative', () => {
    for (let i = 0; i < 100; i++) {
        expect(compare(Math.random(), -Math.random())).toEqual(1);
    }
});

test('negative is less than positive', () => {
    for (let i = 0; i < 100; i++) {
        expect(compare(-Math.random(), Math.random())).toEqual(-1);
    }
});

test('the number is equal to itself', () => {
    for (let i = 0; i < 100; i++) {
        const a = Math.random();
        expect(compare(a, a)).toEqual(0);
    }
});

test('changing the numbers by an equal value does not change the result', () => {
    for (let i = 0; i < 100; i++) {
        const a = Math.random();
        const b = a  + Math.random();
        const delta = 0.5 - Math.random();
        expect(compare(a, b)).toEqual(compare(a + delta, b + delta));
    }
});