'use client'

// components/MintCard.tsx
import { useState, useEffect, type ChangeEvent } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { JsonRpcProvider, Interface } from 'ethers'
import CraftedCollectionABI from '@/abi/CraftedCollection.json'
import useAuthUser from '@/hooks/useAuthUser'
import { useAddExperience } from '@/hooks/useAddExperience'
import { logActivity } from '@/lib/logActivity'
import { db } from '@/lib/firebaseClient'
import { addDoc, collection, serverTimestamp, doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { getNextPurchaseId } from '@/lib/purchaseCounter'
import useNftCount from '@/hooks/useNftCount'
//import Image from 'next/image'
import CountdownTimer from './CountdownTimer'

export default function MintCard() {
  const proxyAddress = '0x2e51a8FdC067e415CFD5d00b9add5C6Af72d676c'
  const [quantity, setQuantity] = useState<number>(1)
  const pricePerNFT: bigint = parseEther('0.03')
  const totalPrice: bigint = pricePerNFT * BigInt(quantity)

  const { writeContractAsync, isPending, error } = useWriteContract()
  const { user, userData, address } = useAuthUser()
  const addXP = useAddExperience(user)
  const { count } = useNftCount()
  const maxAllowed = Math.max(0, 3 - count)

  const [referral, setReferral] = useState('')
  const [refStatus, setRefStatus] = useState<'loading' | 'found' | 'not_found' | null>(null)

  const referralClass =
    refStatus === 'loading'
      ? 'checking'
      : refStatus === 'found'
      ? 'success'
      : refStatus === 'not_found'
      ? 'error'
      : ''

  const sanitizeUsername = (value: string) => {
    let v = value.replace(/[-\s]+/g, '_').toLowerCase()
    v = v.replace(/[^a-z0-9_]/g, '')
    return v
  }

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (Number.isNaN(val)) return
    const clamped = Math.max(1, Math.min(maxAllowed, val))
    setQuantity(clamped)
  }

  const increase = () => setQuantity((q) => Math.min(maxAllowed, q + 1))
  const decrease = () => setQuantity((q) => Math.max(1, q - 1))

  const handleReferralChange = (val: string) => {
    const cleaned = sanitizeUsername(val)
    setReferral(cleaned)
    setRefStatus(null)
  }

  useEffect(() => {
    if (!referral) {
      setRefStatus(null)
      return
    }
    setRefStatus('loading')
    const timer = setTimeout(async () => {
      try {
        const snap = await getDoc(doc(db, 'profiles', referral))
        setRefStatus(snap.exists() ? 'found' : 'not_found')
      } catch (err) {
        console.error('Referral check failed:', err)
        setRefStatus(null)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [referral])

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
      if (!receipt) {
        throw new Error('Transaction receipt not found')
      }

      const iface = new Interface(CraftedCollectionABI.abi)
      const ids: string[] = []
      for (const log of receipt.logs) {
        try {
          const parsed = iface.parseLog(log)
          if (parsed && parsed.name === 'Transfer' && parsed.args?.to?.toLowerCase() === address?.toLowerCase()) {
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

      if (referral && refStatus === 'found' && !(userData && userData.tagback)) {
        await updateDoc(userRef, { tagback: referral })
      }

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
      <div className='mint-image'>Maximum three (3) per wallet.</div>
      <div className='mint-content'>
        <div className='label'>
          Current Price (<CountdownTimer targetDate='2025-06-23T23:59:00Z' />)
        </div>
        <p className='priceBox'>{(Number(totalPrice) / 1e18).toFixed(2)}</p>

        <div className='gap-2 mb-4'>
          <label className='block hidden'>How Many?</label>
          <div className='qtyRow'>
            <button type='button' onClick={decrease} disabled={quantity <= 1} className='px-3 bg-gray-700 border border-gray-600 rounded-l disabled:opacity-50'>
              -
            </button>
            <input
              type='number'
              min='1'
              max={maxAllowed}
              value={quantity}
              onChange={handleQuantityChange}
              className='text-center bg-gray-700 border-t border-b border-gray-600 flex-1 mb-0'
            />
            <button
              type='button'
              onClick={increase}
              disabled={quantity >= maxAllowed}
              className='px-3 bg-gray-700 border border-gray-600 rounded-r disabled:opacity-50'
            >
              +
            </button>
          </div>
        </div>

        <button className='mintButton' disabled={isPending || maxAllowed === 0} onClick={handleMint}>
          {isPending ? 'Minting...' : `Mint x${quantity}`}
        </button>
        {maxAllowed === 0 && <p className='errorMessage'>You hold max. (3) shells, baller.</p>}
        <hr />
        <div className='tagBox'>
          <label className='block hidden'>Tag a Connect?</label>
          <input
            className={`w-full mb-0 ${referralClass}`}
            type='text'
            value={referral}
            onChange={(e) => handleReferralChange(e.target.value)}
            placeholder='Tag Your Connect'
          />
        </div>
        <div className='errorMessage'>
          {error && <p>Error: {error.message}</p>}
          {refStatus === 'not_found' && <p>User not found</p>}
        </div>
      </div>
    </div>
  )
}
