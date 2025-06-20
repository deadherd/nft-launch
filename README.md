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

### `NftCountGate`
Checks that the connected wallet holds at least a minimum number of NFTs from the configured contract.

```tsx
<NftCountGate minimum={2} fallback={<p>No access</p>}>
  {...content}
</NftCountGate>
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

The NFT contract address used by `NftTraitGate` and `NftCountGate` is defined in `src/lib/contracts.ts` as `MAIN_NFT_CONTRACT`.
Update it in one place if the address changes.

### `AuthGate`
Renders children only when `userData` has loaded and the user is authenticated.

```tsx
<AuthGate fallback={<p>Please sign in</p>}>
  {...content}
</AuthGate>
```

### `DataGate`
Checks custom conditions against `UserData`.

```tsx
<DataGate condition={(u) => u.rank > 3} fallback={<p>No access</p>}>
  {...content}
</DataGate>
```

### `LocationGate`
Ensures the connected user has visited a location before showing the content.

```tsx
<LocationGate locationId="sunnyside" fallback={<p>Visit Sunnyside first</p>}>
  {...content}
</LocationGate>
```

## Environment Variables

Create a `.env.local` file in the project root and provide the following keys:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ONCHAINKIT_API_KEY=...
NEXT_PUBLIC_ALCHEMY_KEY=...
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

## Development

Run the type checker and linter before committing:

```bash
npx tsc --noEmit
npm run lint
```

To start the app locally:

```bash
npm run dev
```


## Troubleshooting

If you encounter `FirebaseError: Missing or insufficient permissions`, check your Firestore Security Rules. For local development you can allow authenticated users to read and write by using:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Errors such as `Unexpected token 'M', "Must be au" is not valid JSON` usually mean an API route returned an HTML error page. Verify that all environment variables listed above are set correctly so the backend can authenticate with Firebase.
