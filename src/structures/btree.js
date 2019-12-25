/*jshint esversion: 6 */

import defaultComparator from '../core/compare.js';
import defaultIterator from './btree.iterator.js';

const data = Symbol('data');
const parentNode = Symbol('parentNode');
const leftNode = Symbol('leftNode');
const rightNode = Symbol('rightNode');
const nodeComparator = Symbol('compare');
const emptyNode = Symbol('emptyNode');
const nodeIterator = Symbol('nodeIterator');

class BTree {
    constructor(value = emptyNode) {
        this[data] = value;
        this[leftNode] = null;
        this[rightNode] = null;
        this[parentNode] = null;

        this.setComparator(defaultComparator);
        this.setIterator(defaultIterator);
    }

    setComparator(compare) {
        this[nodeComparator] = compare;
    }

    setIterator(className) {
        this[nodeIterator] = className;
    }

    value() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this[data];
    }

    parent() {
        return this[parentNode];
    }

    left() {
        return this[leftNode];
    }

    right() {
        return this[rightNode];
    }

    isEmpty() {
        return this[data] === emptyNode;
    }

    compare(value) {
        return this[nodeComparator](this[data], value);
    }

    chooseBranch(nodeComparison) {
        return nodeComparison >= 0 ? leftNode : rightNode;
    }

    findMin() {
        return this[leftNode] ? this[leftNode].findMin() : this;
    }

    findMax() {
        return this[rightNode] ? this[rightNode].findMax() : this;
    }

    find(value) {
        if (this.isEmpty()) {
            return null;
        }
        const nodeComparison = this.compare(value);
        if (nodeComparison === 0) {
            return this;
        }
        const branch = this.chooseBranch(nodeComparison);
        return this[branch] ? this[branch].find(value) : null;
    }

    put(value) {
        if (this.isEmpty()) {
            this[data] = value;
            return this;
        }
        const branch = this.chooseBranch(this.compare(value));
        if (this[branch]) {
            return this[branch].put(value);
        } else {
            const node = new BTree(value);
            node[parentNode] = this;
            this[branch] = node;
            return node;
        }
    }

    replace(node1, node2 = null) {
        if (this[leftNode] === node1) {
            this[leftNode] = node2;
        }

        if (this[rightNode] === node1) {
            this[rightNode] = node2;
        }
    }

    delete(value) {
        const node = this.find(value);
        if (node) {
            let childNode;
            if (node[leftNode] && node[rightNode]) {
                childNode = node[rightNode].findMin();
                childNode[parentNode].replace(childNode);
                childNode[leftNode] = node[leftNode];
                childNode[rightNode] = node[rightNode];
            } else {
                childNode = node[leftNode] || node[rightNode];
            }
            const owner = node[parentNode];
            if (owner !== null) {
                owner.replace(node, childNode);
            } else {
                for (let key in this) {
                    delete this[key];
                }
                node[data] = emptyNode;
            }
        }
    }

    [Symbol.iterator]() {
        return new this[nodeIterator](this);
    }
}

export default BTree;