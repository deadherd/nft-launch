export interface Purchase {
  id: string
  amount: number
  quantity: number
  nftIds: string[]
  txHash: string
  createdAt?: import('firebase/firestore').Timestamp | Date
}
