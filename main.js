import {Tree, prettyPrint} from './balancedBST.js';

const randomArray = (size, max) => Array.from({ length: size }, () => Math.floor(Math.random() * max));

const tree = new Tree(randomArray(15, 100));
console.log("Tree is balanced:", tree.isBalanced());
console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));
console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));
console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));
console.log("In Order:");
tree.inOrder((node) => console.log(node.data));

tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log("Tree is balanced after inserting > 100:", tree.isBalanced());

tree.rebalance();
console.log("Tree is balanced after rebalancing:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));
console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));
console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));
console.log("In Order:");
tree.inOrder((node) => console.log(node.data));

// Pretty print the tree
console.log("Pretty Print of the Tree:");
prettyPrint(tree.root);

tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log("Tree is balanced after inserting > 100:", tree.isBalanced());

// Pretty print the tree after insertions
console.log("Pretty Print of the Tree after insertions:");
prettyPrint(tree.root);

tree.rebalance();
