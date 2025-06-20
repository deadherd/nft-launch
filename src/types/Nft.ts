export interface NftAttribute {
  trait_type: string
  value: string
}

export interface NftMetadata {
  attributes?: NftAttribute[]
}

export interface OwnedNft {
  rawMetadata?: NftMetadata
}

export interface AlchemyNftsResponse {
  ownedNfts: OwnedNft[]
}
