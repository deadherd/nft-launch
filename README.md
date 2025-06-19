This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Access Gates

The project includes optional wrapper components for gating access based on wallet state, Firebase authentication and NFT ownership.

### `WalletGate`
Wraps its children only when a wallet is connected.

```tsx
<WalletGate fallback={<ConnectWallet />}>
  {...content}
</WalletGate>
```

### `FirebaseGate`
Ensures the user is signed in with Firebase before rendering children.

```tsx
<FirebaseGate fallback={<SignInWithEthereum />}>
  {...content}
</FirebaseGate>
```

### `NftTraitGate`
Checks that the connected wallet owns an NFT from the configured contract with a specific trait.

```tsx
<NftTraitGate traitType="Role" traitValue="Founder" fallback={<p>No access</p>}>
  {...content}
</NftTraitGate>
```

### Nesting Gates
Gates can be combined to protect sections of the UI:

```tsx
<WalletGate fallback={<ConnectWallet />}> 
  <FirebaseGate fallback={<SignInWithEthereum />}> 
    <NftTraitGate traitType="Role" traitValue="Founder" fallback={<p>No access</p>}>
      {children}
    </NftTraitGate>
  </FirebaseGate>
</WalletGate>
```

The NFT contract address used by `NftTraitGate` is defined in `src/lib/contracts.ts` as `MAIN_NFT_CONTRACT`.
Update it in one place if the address changes.

