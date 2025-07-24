import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import 'dotenv/config';


const Keypair = process.env.KEYPAIR;
if(!Keypair) {
  console.log("Keypair not found in environment variables.");
}

console.log(`Keypair: ${Keypair}`);
const connection = new Connection(clusterApiUrl('devnet'));
const OWNER = getKeypairFromEnvironment('KEYPAIR');

const tokenAccount = new PublicKey('5VcriUcKVJNHfbsgwdVYdehN1S9Ebr1NbrKknf71u7fD');

const receipientAccount = new PublicKey('Hdb52MBnM7d2NZxeU5jqm3wkrYVWsmSzxHyfiTRDZYDA');

const ata = await getOrCreateAssociatedTokenAccount(
  connection,
  OWNER,
  tokenAccount,
  receipientAccount
);
console.log(`Associated Token Account: ${ata.address}`);
const link = getExplorerLink('address', ata.address.toString(), 'devnet');
console.log(`Token account: ${link}`);