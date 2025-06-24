export interface Purchase {
  id: string
  amount: number
  quantity: number
  nftIds: string[]
  txHash: string
  tagback?: string | null
  createdAt?: import('firebase/firestore').Timestamp | Date
}
