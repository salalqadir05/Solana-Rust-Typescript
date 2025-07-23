import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js'

const connection = new Connection(clusterApiUrl('devnet'));
const address = new PublicKey('HVDeAARcgJrFMGaacrbhgaLo5sh8KDJpai5Cdir8kHDb');
const balance = await connection.getBalance(address);

console.log(`Balance for ${address} is ${balance}`);