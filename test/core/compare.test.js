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

test('any number less than NaN', () => {
    expect(compare(-Math.random(), NaN)).toEqual(-1);
    expect(compare(Math.random(), NaN)).toEqual(-1);
    expect(compare(-Infinity, NaN)).toEqual(-1);
    expect(compare(Infinity, NaN)).toEqual(-1);
    expect(compare(0, NaN)).toEqual(-1);
});

test('NaN is great than any number', () => {
    expect(compare(NaN, -Math.random())).toEqual(1);
    expect(compare(NaN, Math.random())).toEqual(1);
    expect(compare(NaN, -Infinity)).toEqual(1);
    expect(compare(NaN, Infinity)).toEqual(1);
    expect(compare(NaN, 0)).toEqual(1);
});

test('NaN is equal NaN', () => {
    expect(compare(NaN, NaN)).toEqual(0);
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