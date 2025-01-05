import { KeyPair, mnemonicToPrivateKey } from "ton-crypto";
import {
  beginCell,
  Cell,
  OpenedContract,
  TonClient,
  WalletContractV4,
} from "ton";

export type OpenedWallet = {
  contract: OpenedContract<WalletContractV4>;
  keyPair: KeyPair;
};
const toncenterBaseEndpoint: string = "https://testnet.toncenter.com";
const client = new TonClient({
  endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
  apiKey: import.meta.env.VITE_TONCENTER_API_KEY,
});

export async function openWallet(mnenonics: string[]) {
  const keyPair = await mnemonicToPrivateKey(mnenonics);
  const wallet = await WalletContractV4.create({
    publicKey: keyPair.publicKey,
    workchain: 0
  })
  const contract = client.open(wallet);
  return {contract, keyPair}
}
function bufferToChunks(buff: Buffer, chunkSize: number) {
  const chunks: Buffer[] = [];
  while (buff.byteLength > 0) {
    chunks.push(buff.subarray(0, chunkSize));
    buff = buff.subarray(chunkSize);
  }
  return chunks;
}
function makeSnakeCell(data: Buffer): Cell {
  const chunks = bufferToChunks(data, 127);

  if (chunks.length === 0) {
    return beginCell().endCell();
  }

  if (chunks.length === 1) {
    return beginCell().storeBuffer(chunks[0]).endCell();
  }

  let curCell = beginCell();

  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];

    curCell.storeBuffer(chunk);

    if (i - 1 >= 0) {
      const nextCell = beginCell();
      nextCell.storeRef(curCell);
      curCell = nextCell;
    }
  }

  return curCell.endCell();
}
export function encodeOffChainContent(content: string) {
  let data = Buffer.from(content);
  const offChainPrefix = Buffer.from([0x01]);
  data = Buffer.concat([offChainPrefix, data]);
  return makeSnakeCell(data);
}

export function getTONPrice(price: number) {
  return parseFloat((price / (25000 *  5.66)).toFixed(2));
}