class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }

export class Tree {
constructor(array) {
    this.root = this.buildTree(array);
}

buildTree(array) {
    array = [...new Set(array)].sort((a, b) => a - b);
    return this.buildTreeHelper(array, 0, array.length - 1);
}

buildTreeHelper(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTreeHelper(array, start, mid - 1);
    node.right = this.buildTreeHelper(array, mid + 1, end);
    return node;
}

insert(value) {
    this.root = this.insertHelper(this.root, value);
}

insertHelper(node, value) {
    if (node === null) return new Node(value);
    if (value < node.data) {
    node.left = this.insertHelper(node.left, value);
    } else if (value > node.data) {
    node.right = this.insertHelper(node.right, value);
    }
    return node;
}

deleteItem(value) {
    this.root = this.deleteHelper(this.root, value);
}

deleteHelper(node, value) {
    if (node === null) return node;
    if (value < node.data) {
    node.left = this.deleteHelper(node.left, value);
    } else if (value > node.data) {
    node.right = this.deleteHelper(node.right, value);
    } else {
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;
    node.data = this.minValue(node.right);
    node.right = this.deleteHelper(node.right, node.data);
    }
    return node;
}

minValue(node) {
    let min = node.data;
    while (node.left !== null) {
    min = node.left.data;
    node = node.left;
    }
    return min;
}

find(value) {
    return this.findHelper(this.root, value);
}

findHelper(node, value) {
    if (node === null || node.data === value) return node;
    if (value < node.data) return this.findHelper(node.left, value);
    return this.findHelper(node.right, value);
}

levelOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    const queue = [this.root];
    while (queue.length > 0) {
    const node = queue.shift();
    callback(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    }
}

inOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    this.inOrderHelper(this.root, callback);
}

inOrderHelper(node, callback) {
    if (node !== null) {
    this.inOrderHelper(node.left, callback);
    callback(node);
    this.inOrderHelper(node.right, callback);
    }
}

preOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    this.preOrderHelper(this.root, callback);
}

preOrderHelper(node, callback) {
    if (node !== null) {
    callback(node);
    this.preOrderHelper(node.left, callback);
    this.preOrderHelper(node.right, callback);
    }
}

postOrder(callback) {
    if (!callback) throw new Error("Callback is required");
    this.postOrderHelper(this.root, callback);
}

postOrderHelper(node, callback) {
    if (node !== null) {
    this.postOrderHelper(node.left, callback);
    this.postOrderHelper(node.right, callback);
    callback(node);
    }
}

height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
}

depth(node) {
    return this.depthHelper(this.root, node, 0);
}

depthHelper(root, node, depth) {
    if (root === null) return -1;
    if (root === node) return depth;
    const leftDepth = this.depthHelper(root.left, node, depth + 1);
    if (leftDepth !== -1) return leftDepth;
    return this.depthHelper(root.right, node, depth + 1);
}

isBalanced() {
    return this.isBalancedHelper(this.root);
}

isBalancedHelper(node) {
    if (node === null) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    this.isBalancedHelper(node.left) &&
    this.isBalancedHelper(node.right)
    );
}

rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
}
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
if (node === null) {
    return;
}
if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
}
console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}
};

