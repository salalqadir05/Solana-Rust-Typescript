import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import 'dotenv/config';

import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
const Keypair = process.env.KEYPAIR;
const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
if(!Keypair) {
  console.log("Keypair not found in environment variables.");
}

console.log(`Keypair: ${Keypair}`);
const connection = new Connection(clusterApiUrl('devnet'));
const OWNER = getKeypairFromEnvironment('KEYPAIR');

const tokenAccount = new PublicKey('5VcriUcKVJNHfbsgwdVYdehN1S9Ebr1NbrKknf71u7fD');

const metaData = {
    name : 'Muhammad Salal Qadir',
    symbol : 'DMC',
    uri: 'https://salalqadir.com',
    sellerFeeBasisPoints: 0,
    creator: null,
    collection: null,
    user: null
}

const metadataTokenSync = PublicKey.findProgramAddressSync(
[
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenAccount.toBuffer() 
],
TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataTokenSync[0];
const transaction = new Transaction();
const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
  {
    metadata: metadataPDA,
    mint: tokenAccount,
    mintAuthority: OWNER.publicKey,
    payer: OWNER.publicKey,
    updateAuthority: OWNER.publicKey
  },
  {
    createMetadataAccountArgsV3: {
      collectionDetails: null,
      data: {
        name: metaData.name,
        symbol: metaData.symbol,
        uri: metaData.uri,
        sellerFeeBasisPoints: metaData.sellerFeeBasisPoints,
        creators: metaData.creator,
        collection: metaData.collection,
        uses: metaData.user 
      },
      isMutable: true,
    }
  }
);

transaction.add(createMetadataInstruction);

const signature = await sendAndConfirmTransaction
(connection,transaction, [OWNER]);

let link = getExplorerLink('transaction', signature.toString(), 'devnet');
console .log(`Done! created token metadata: ${link}`);

link = getExplorerLink('address', tokenAccount.toString(), 'devnet');
console.log(`Token account: ${link}`);