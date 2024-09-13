import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
    contract_balance: number;
  }>();

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQC0Z36C7I_8dEKp0iXwK1YD6Jw6zwATyk_q8exLpNwyeMOx")
    );
    console.log(contract);
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const val = await mainContract!.getData();
      const contractBalance = await mainContract!.getBalance();
      setContractData({
        counter_value: val.counter,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
        contract_balance: contractBalance.number,
      });
      await sleep(5000);
      getValue();
    }

    getValue();
  }, [mainContract] );

  return {
    contract_address: mainContract?.address.toString(),
    ...contractData,
    sendIncrement: async() => {
      return await mainContract?.sendIncrement(sender, toNano("0.05"), 5)
    },
    sendDeposit: async () => {
      return await mainContract?.sendDeposit(sender, toNano("1"));
    }
  };
}
