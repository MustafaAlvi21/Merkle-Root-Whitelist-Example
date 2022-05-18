const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

// List of 4 public Ethereum addresses
let addresses = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
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
let address = addresses[1]
let hashedAddress = keccak256(address)
let proof = merkleTree.getHexProof(hashedAddress)
console.log(proof)

// Check proof
let v = merkleTree.verify(proof, hashedAddress, rootHash)
console.log(v) // returns true