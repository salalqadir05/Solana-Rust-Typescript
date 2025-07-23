import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import 'dotenv/config';

const Keypair = process.env.KEYPAIR;

if(!Keypair) {
  console.log("Keypair not found in environment variables.");
}

console.log(`Keypair: ${Keypair}`);
const connection = new Connection(clusterApiUrl('devnet'));
const OWNER = getKeypairFromEnvironment('KEYPAIR');

const token = await createMint(connection,OWNER, OWNER.publicKey, null, 2);
const link = getExplorerLink('address', token.toString(), 'devnet');


console.log(`Done! created token: ${link}`);