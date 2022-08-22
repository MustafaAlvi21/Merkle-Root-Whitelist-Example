const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256")

// List of 4 public Ethereum addresses
let addresses = [
  "0x23dd8a60C4bc14053Ea7690c66d12F8b3af9c006",
  "0x6aC646018d6c82c1e51836658F9ca95885443e1c",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
]

// Hash addresses to get the leaves
let leaves = addresses.map(addr => keccak256(addr))

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})

// Get root
let rootHash = merkleTree.getRoot().toString('hex')

// ----------------------------------------------------------
console.log("rootHash");
console.log(rootHash);
// ----------------------------------------------------------


// -- This code is below the previous code since we use some of the other variables --
// 'Serverside' code
let address = addresses[0]
let hashedAddress = keccak256("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
let proof = merkleTree.getHexProof(hashedAddress)
console.log(proof)

// Check proof
// let v = merkleTree.verify(proof, hashedAddress, "f41b629e9928cdee2ab10b784f6ba0ffe73878eac5f5d4786b2b603b793f1703")
let v = merkleTree.verify(proof, hashedAddress, rootHash)
console.log(v) // returns true


// const { MerkleTree } = require('merkletreejs')
// const keccak256 = require("keccak256")
// // const SHA256 = require('crypto-js/sha256')

// const leaves = ['0x6aC646018d6c82c1e51836658F9ca95885443e1a', '0x6aC646018d6c82c1e51836658F9ca95885443e55'].map(x => keccak256(x))
// const tree = new MerkleTree(leaves, keccak256)
// const root = tree.getRoot().toString('hex')
// const leaf = keccak256('0x6aC646018d6c82c1e51836658F9ca95885443e1a')
// const proof = tree.getHexProof(leaf)
// console.log(root) // true
// console.log(proof.toString()) // true
// console.log(tree.verify(proof, leaf, root)) // true


// // const badLeaves = ['a', 'x', 'c'].map(x => SHA256(x))
// // const badTree = new MerkleTree(badLeaves, SHA256)
// // const badLeaf = SHA256('x')
// // const badProof = tree.getProof(badLeaf)
// // console.log(tree.verify(badProof, leaf, root))