import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";
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

const MINOR_UNITS_PER_MAJOR_UNIT = Math.pow(10, 2);

const signature = await mintTo(
  connection,
  OWNER,
  tokenAccount,
  receipientAccount,
  OWNER,
  MINOR_UNITS_PER_MAJOR_UNIT * 6,
);
const link = getExplorerLink('transaction', signature.toString(), 'devnet');
console.log(`Successful: ${link}`);