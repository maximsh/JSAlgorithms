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

        this.comparator = defaultComparator;
        this.iterator = defaultIterator;
    }

    get comparator() {
        return this[nodeComparator];
    }

    set comparator(compareFunction) {
        this[nodeComparator] = compareFunction;
    }

    get iterator() {
        return this[nodeIterator];
    }

    set iterator(className) {
        this[nodeIterator] = className;
    }

    get value() {
        if (this.isEmpty) {
            return undefined;
        }
        return this[data];
    }

    get parent() {
        return this[parentNode];
    }

    get left() {
        return this[leftNode];
    }

    get right() {
        return this[rightNode];
    }

    get isEmpty() {
        return this[data] === emptyNode;
    }

    get min() {
        return this.left ? this.left.min : this;
    }

    get max() {
        return this.right ? this.right.max : this;
    }

    compare(value) {
        return this.comparator(this.value, value);
    }

    chooseBranch(nodeComparison) {
        return nodeComparison >= 0 ? leftNode : rightNode;
    }

    find(value) {
        if (this.isEmpty) {
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
        if (this.isEmpty) {
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
        if (this.left === node1) {
            this[leftNode] = node2;
        }

        if (this.right === node1) {
            this[rightNode] = node2;
        }
    }

    delete(value) {
        const node = this.find(value);
        if (node) {
            let childNode;
            if (node.left && node.right) {
                childNode = node.right.min;
                childNode.parent.replace(childNode);
                childNode[leftNode] = node.left;
                childNode[rightNode] = node.right;
            } else {
                childNode = node.left || node.right;
            }
            const owner = node.parent;
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
        return new this.iterator(this);
    }
}

export default BTree;