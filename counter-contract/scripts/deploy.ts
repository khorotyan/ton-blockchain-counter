import { address, toNano } from "ton-core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton-community/blueprint";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("kQDP0rlp4TNV-h6bQ1jbLwg1WHR0s14WcUU_j83OEgvll61i"),
      owner_address: address(
        "kQDP0rlp4TNV-h6bQ1jbLwg1WHR0s14WcUU_j83OEgvll61i"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}
