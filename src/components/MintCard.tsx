// components/MintCard.tsx
import { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import CraftedCollectionABI from '../../../crafted-nft/artifacts/contracts/CraftedCollection.sol/CraftedCollection.json'

export default function MintCard() {
  const proxyAddress = '0x2e51a8FdC067e415CFD5d00b9add5C6Af72d676c'
  const [quantity, setQuantity] = useState(1)
  const pricePerNFT = parseEther('0.01')
  const totalPrice = pricePerNFT * BigInt(quantity)

  const { writeContract, isPending, isSuccess, error } = useWriteContract()

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value))
  }

  const handleMint = () => {
    writeContract({
      address: proxyAddress,
      abi: CraftedCollectionABI.abi,
      functionName: 'publicMint',
      args: [quantity],
      value: totalPrice,
    })
  }

  return (
    <div className='mint-card'>
      <h2>Mint Your NFT</h2>
      <p>Price: 0.01 ETH each</p>

      <div>
        <label>Quantity: </label>
        <input type='number' min='1' max='10' value={quantity} onChange={handleQuantityChange} />
      </div>

      <button disabled={isPending} onClick={handleMint}>
        {isPending ? 'Minting...' : `Mint ${quantity}`}
      </button>
      <br />
      <br />
      <br />
      <br />
      {isSuccess && <p>✅ Mint Successful!</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}
