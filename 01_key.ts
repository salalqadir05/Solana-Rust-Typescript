import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();


console.log(`This is Public key ${keypair.publicKey.toBase58()}`);
console.log(`This is Secret key ${keypair.secretKey}`);
