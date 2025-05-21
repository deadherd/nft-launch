"use client";

import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { createSiweMessage } from "viem/siwe";
import { useAccount, useSignMessage, useConfig } from "wagmi";

// siwe + onchainkit connect button
export default function SiweButton() {
  const { address, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chains: configuredChains } = useConfig();

  async function handleSignIn() {
    // lowercase, shorthand comments
    // bail if no wallet or no chain
    if (!address) return;
    const chainId = chain?.id ?? configuredChains[0].id;

    // fetch nonce
    const { nonce } = await fetch("/api/siwe/nonce").then((r) => r.json());

    // build siwe message
    const message = createSiweMessage({
      domain: window.location.host,
      address,
      statement: "sign in with ethereum to app",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });

    // user signs
    const signature = await signMessageAsync({ message });

    // verify on server
    const res = await fetch("/api/siwe/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, signature }),
    });
    if (!res.ok) throw new Error("siwe verification failed");
    // now user is authenticated…
  }

  return (
    <Wallet>
      <ConnectWallet onConnect={handleSignIn} />
    </Wallet>
  );
}
