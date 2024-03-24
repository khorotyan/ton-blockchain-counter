import dotenv from "dotenv";
import qs from "qs";
import { Telegraf } from "telegraf";
import { Address, OpenedContract, beginCell, fromNano, toNano } from "ton-core";
import { MainContract } from "../contracts/MainContract";
import { TonClient } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

dotenv.config();

let client: TonClient | null = null;

const bot = new Telegraf(process.env.TG_BOT_TOKEN!);

bot.start((ctx) =>
  ctx.reply("Welcome to our counter app!", {
    reply_markup: {
      keyboard: [
        ["Increment by 5"],
        ["Deposit 0.2 TON"],
        ["Withdraw 0.1 TON"],
        ["Get Contract Balance"],
      ],
    },
  })
);

bot.hears("Increment by 5", (ctx) => {
  const msg_body = beginCell()
    .storeUint(1, 32)
    .storeUint(5, 32)
    .endCell();

  let link = `https://app.tonkeeper.com/transfer/${
    process.env.CONTRACT_ADDRESS
  }?${qs.stringify({
    text: "Simple test transaction",
    amount: toNano("0.05").toString(10),
    bin: msg_body.toBoc({ idx: false }).toString("base64"),
  })}`;

  ctx.reply("To increment counter by 5, please sign a transaction:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Sign transaction",
            url: link,
          },
        ],
      ],
    },
  });
});

bot.hears("Deposit 0.2 TON", (ctx) => {
  const msg_body = beginCell()
    .storeUint(2, 32)
    .endCell();

  let link = `https://app.tonkeeper.com/transfer/${
    process.env.CONTRACT_ADDRESS
  }?${qs.stringify({
    text: "Deposit 0.2 TON",
    amount: toNano("0.2").toString(10),
    bin: msg_body.toBoc({ idx: false }).toString("base64"),
  })}`;

  ctx.reply("To deposit 0.2 TON please sign a transaction:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Sign transaction",
            url: link,
          },
        ],
      ],
    },
  });
});

bot.hears("Withdraw 0.1 TON", (ctx) => {
  const msg_body = beginCell()
    .storeUint(3, 32)
    .endCell();

  let link = `https://app.tonkeeper.com/transfer/${
    process.env.SC_ADDRESS
  }?${qs.stringify({
    text: "Withdraw 0.1 TON",
    amount: toNano("0.05").toString(10),
    bin: msg_body.toBoc({ idx: false }).toString("base64"),
  })}`;

  ctx.reply("To withdraw 0.1 TON please sign a transaction:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Sign transaction",
            url: link,
          },
        ],
      ],
    },
  });
});

bot.hears("Get Contract Balance", (ctx) => {
  (async () => {
    const contractAddress = process.env.CONTRACT_ADDRESS ?? "";
    if (!client) {
      client = new TonClient({
        endpoint: await getHttpEndpoint({ network: "testnet" }),
      });
    }

    const contract = new MainContract(Address.parse(contractAddress));
    const mainContract = client.open(contract) as OpenedContract<MainContract>;
    if (contract) {
      const balance = await mainContract.getBalance(); // Pass the provider argument here

      ctx.reply(`Contract balance is ${fromNano(balance.number ?? 0)}`);
    }
  })().catch((e) => console.error(e));
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
