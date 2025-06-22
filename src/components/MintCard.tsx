'use client'

// components/MintCard.tsx
import { useState, type ChangeEvent } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { JsonRpcProvider, Interface } from 'ethers'
import CraftedCollectionABI from '@/abi/CraftedCollection.json'
import useAuthUser from '@/hooks/useAuthUser'
import { useAddExperience } from '@/hooks/useAddExperience'
import { logActivity } from '@/lib/logActivity'
import { db } from '@/lib/firebaseClient'
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore'
import { getNextPurchaseId } from '@/lib/purchaseCounter'
import useNftCount from '@/hooks/useNftCount'

export default function MintCard() {
  const proxyAddress = '0x2e51a8FdC067e415CFD5d00b9add5C6Af72d676c'
  const [quantity, setQuantity] = useState<number>(1)
  const pricePerNFT: bigint = parseEther('0.01')
  const totalPrice: bigint = pricePerNFT * BigInt(quantity)

  const { writeContractAsync, isPending, error } = useWriteContract()
  const { user, address } = useAuthUser()
  const addXP = useAddExperience(user)
  const { count } = useNftCount()
  const maxAllowed = Math.max(0, 3 - count)

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setQuantity(val > maxAllowed ? maxAllowed : val)
  }

  const handleMint = async (): Promise<void> => {
    if (!user) return
    if (maxAllowed === 0) return
    try {
      const hash = await writeContractAsync({
        address: proxyAddress,
        abi: CraftedCollectionABI.abi,
        functionName: 'publicMint',
        args: [quantity],
        value: totalPrice,
      })

      const provider = new JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`)
      const receipt = await provider.waitForTransaction(hash)
      const iface = new Interface(CraftedCollectionABI.abi)
      const ids: string[] = []
      for (const log of receipt.logs) {
        try {
          const parsed = iface.parseLog(log)
          if (parsed.name === 'Transfer' && parsed.args?.to?.toLowerCase() === address?.toLowerCase()) {
            ids.push(parsed.args.tokenId.toString())
          }
        } catch {}
      }

      const purchaseId = await getNextPurchaseId()

      await addDoc(collection(db, 'users', user.uid, 'purchases'), {
        amount: Number(totalPrice) / 1e18,
        quantity,
        nftIds: ids,
        txHash: hash,
        createdAt: serverTimestamp(),
        purchaseId,
      })

      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        purchasesCount: increment(1),
        totalSpent: increment(Number(totalPrice) / 1e18),
      })

      await logActivity({
        uid: user.uid,
        type: 'transaction',
        label: `Purchased ${quantity} shell${quantity > 1 ? 's' : ''}`,
        xp: 23 * quantity,
        meta: { txHash: hash, amount: Number(totalPrice) / 1e18 },
      })

      await addXP(23 * quantity)
    } catch (err) {
      console.error('Mint error:', err)
    }
  }

  return (
    <div className='mint-card'>
      <h2>Mint Your NFT</h2>
      <p>Price: 0.01 ETH each</p>

      <div>
        <label>Quantity: </label>
        <input type='number' min='1' max={maxAllowed} value={quantity} onChange={handleQuantityChange} />
      </div>

      <button disabled={isPending || maxAllowed === 0} onClick={handleMint}>
        {isPending ? 'Minting...' : `Mint ${quantity}`}
      </button>
      {maxAllowed === 0 && <p>You already hold the max. three (3) shells</p>}
      <br />
      <br />
      <br />
      <br />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}
