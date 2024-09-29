
import { OpenedWallet } from "./utils";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function waitSeqno(seqno: number, wallet: OpenedWallet) {
  for (let attempt = 0; attempt < 10; attempt++) {
    await sleep(2000);
    const seqAfter = await wallet.contract.getSeqno();
    if (seqAfter == seqno + 1) break;
  }
}
