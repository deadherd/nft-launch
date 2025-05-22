"use client";

import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { createSiweMessage } from "viem/siwe";
import { useAccount, useSignMessage, useConfig } from "wagmi";

// init firebase once
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};
if (!getApps().length) initializeApp(firebaseConfig);

export default function SignInWithEthereum() {
  const { address, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chains: cfgChains } = useConfig();
  const auth = getAuth();

  // runs only when user clicks connect
  async function handleSignIn() {
    if (!address) return; // bail if no wallet
    const chainId = chain?.id ?? cfgChains[0].id;

    // fetch siwe nonce
    const { nonce } = await fetch("/api/siwe/nonce").then((r) => r.json());

    // build message
    const message = createSiweMessage({
      domain: window.location.host,
      address,
      statement: "sign in with ethereum to app",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });

    // prompt wallet
    const signature = await signMessageAsync({ message });

    // verify + get firebase token
    const res = await fetch("/api/siwe/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, signature }),
    });
    if (!res.ok) {
      console.error("siwe verify failed");
      return;
    }
    const { token } = await res.json();

    // sign into firebase
    await signInWithCustomToken(auth, token);
    console.log("✅ signed in uid:", auth.currentUser?.uid);
  }

  return (
    <Wallet>
      <ConnectWallet onConnect={handleSignIn} />
    </Wallet>
  );
}
