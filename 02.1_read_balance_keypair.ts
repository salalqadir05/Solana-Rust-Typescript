import 'dotenv/config';
import {clusterApiUrl, Connection, LAMPORTS_PER_SOL} from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers';


const Keypair = process.env.KEYPAIR;

if(!Keypair) {
  console.log("Keypair not found in environment variables.");
}

console.log(`Keypair: ${Keypair}`);
const connection = new Connection(clusterApiUrl('devnet'));
const address = getKeypairFromEnvironment('KEYPAIR');

console.log(`Address: ${address}`);

const balance = await connection.getBalance(address.publicKey);
console.log(`Balance for ${address} is ${balance / LAMPORTS_PER_SOL} SOL`);
