export interface NftAttribute {
  trait_type: string
  value: string
}

export interface NftMetadata {
  attributes?: NftAttribute[]
}

export interface OwnedNft {
  tokenId?: string
  rawMetadata?: NftMetadata
}

export interface AlchemyNftsResponse {
  ownedNfts: OwnedNft[]
}
