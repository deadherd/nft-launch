export interface Purchase {
  id: string
  /**
   * Global incremental id assigned at purchase time
   */
  purchaseId?: number
  amount: number
  quantity: number
  nftIds: string[]
  txHash: string
  tagback?: string | null
  createdAt?: import('firebase/firestore').Timestamp | Date
}
