import 'dotenv/config';
import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers';


const Keypair = process.env.KEYPAIR;

if(!Keypair) {
  console.log("Keypair not found in environment variables.");
}

console.log(`Keypair: ${Keypair}`);
const connection = new Connection(clusterApiUrl('devnet'));
const sender = getKeypairFromEnvironment('KEYPAIR');
const receiverAddress = new PublicKey('Hdb52MBnM7d2NZxeU5jqm3wkrYVWsmSzxHyfiTRDZYDA');


const amount = 1.5;
const transaction = new Transaction();
const transferTransaction = SystemProgram.transfer(
  {
    fromPubkey: sender.publicKey,
    toPubkey: receiverAddress,
    lamports: amount * LAMPORTS_PER_SOL,
  }
);

transaction.add(transferTransaction);
const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(`Tx successful, ${amount} SOL sent to: ${receiverAddress}`);
console.log(`Transaction signature ${signature}`);

