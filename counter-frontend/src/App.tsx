import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";

function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();
  const { connected } = useTonConnect();

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className="Hint">{fromNano(contract_balance)}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <div className="List">
          {connected && (
            <>
              <a
                onClick={() => {
                  sendIncrement();
                }}
              >
                Increment by 5
              </a>
              <a
                onClick={() => {
                  sendDeposit();
                }}
              >
                Request Deposit of 0.2 TON
              </a>
              <a
                onClick={() => {
                  sendWithdrawalRequest();
                }}
              >
                Request Withdrawal of 0.1 TON
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
