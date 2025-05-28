"use client";

import { auth } from "@/lib/firebaseClient";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Avatar,
  Name,
  Address,
  EthBalance,
  Identity,
} from "@coinbase/onchainkit/identity";
import { createSiweMessage } from "viem/siwe";
import { useAccount, useSignMessage, useConfig } from "wagmi";

export default function SignInWithEthereum() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { address, chain, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chains: cfgChains } = useConfig();

  // auto sign-out of firebase when wallet disconnects
  useEffect(() => {
    if (!isConnected) signOut(auth);
  }, [isConnected]);

  async function handleSignIn() {
    if (!address) return;
    setStatusMessage("wallet connected. loading signature…");
    const chainId = chain?.id ?? cfgChains[0].id;
    const { nonce } = await fetch("/api/siwe/nonce").then((r) => r.json());
    const message = createSiweMessage({
      domain: window.location.host,
      address,
      statement: "sign in with ethereum to app",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
    const signature = await signMessageAsync({ message });
    setStatusMessage("signature received. verifying…");
    const res = await fetch("/api/siwe/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, signature }),
    });
    if (!res.ok) {
      console.error("siwe verify failed");
      setStatusMessage(null);
      return;
    }
    const { token } = await res.json();
    await signInWithCustomToken(auth, token);
    console.log("✅ signed in uid:", auth.currentUser?.uid);
    setStatusMessage(null);
  }

  return (
    <Wallet className="ock-wallet">
      <ConnectWallet
        className="ock-connect"
        disconnectedLabel="👤"
        onConnect={handleSignIn}
      >
        <Avatar className="h-6 w-6" />
      </ConnectWallet>

      {statusMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-green-400 p-4 rounded">
            {statusMessage}
          </div>
        </div>
      )}

      <WalletDropdown className="ock-dropdown">
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect className="hover:bg-blue-200" />
      </WalletDropdown>
    </Wallet>
  );
}
