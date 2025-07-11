'use client'

// app/[username]/page.tsx
import { useEffect, useState } from 'react'
import { doc, getDoc, collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'
import type { OwnedNft, AlchemyNftsResponse } from '@/types/Nft'
import { useParams } from 'next/navigation'
import s from '@/styles/Profile.module.sass'

type ProfileData = {
  uid: string
  username: string
  ratType?: string
  secondaryRatType?: string
  createdAt: Timestamp | Date | number
  experience?: number
  level?: number
}

type ActivityItem = {
  createdAt: Date
  label: string
  type: string
  xp: number
}

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [nfts, setNfts] = useState<OwnedNft[]>([])
  const [filter, setFilter] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!username) return
    const fetchData = async () => {
      try {
        const ref = doc(db, 'profiles', username)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          setNotFound(true)
          return
        }

        const data = snap.data() as ProfileData
        setProfile(data)

        const activityRef = collection(db, 'users', data.uid, 'activity')
        const activitySnap = await getDocs(activityRef)

        const items: ActivityItem[] = activitySnap.docs.map((doc) => {
          const { createdAt, label, type, xp } = doc.data()
          let date: Date

          if (createdAt instanceof Timestamp) {
            date = createdAt.toDate()
          } else if (typeof createdAt === 'number') {
            date = new Date(createdAt)
          } else {
            date = new Date() // fallback
          }

          return { createdAt: date, label, type, xp }
        })

        setActivity(items)

        try {
          const userSnap = await getDoc(doc(db, 'users', data.uid))
          const address = userSnap.exists() ? (userSnap.data() as { address?: string }).address : null
          if (address) {
            const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
            const url = `https://base-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${MAIN_NFT_CONTRACT}`
            const res = await fetch(url)
            const nftData = (await res.json()) as AlchemyNftsResponse
            setNfts(nftData.ownedNfts ?? [])
          }
        } catch (err) {
          console.error('Error loading NFTs:', err)
          setNfts([])
        }
      } catch (err) {
        console.error('Error loading profile or activity:', err)
        setNotFound(true)
      }
    }

    fetchData()
  }, [username])

  if (notFound) return <p>User not found</p>
  if (!profile) return <p>Loading...</p>

  let createdAtDate: Date
  if (profile.createdAt instanceof Timestamp) {
    createdAtDate = profile.createdAt.toDate()
  } else if (typeof profile.createdAt === 'number') {
    createdAtDate = new Date(profile.createdAt)
  } else {
    createdAtDate = profile.createdAt as Date
  }

  return (
    <div className={s.profile}>
      <h3>@{profile.username}</h3>
      <p>
        <i>Joined {createdAtDate.toLocaleDateString()}</i>
      </p>
      {profile.ratType && (
        <p>
          <b>Primary</b>: {profile.ratType}
        </p>
      )}
      {profile.secondaryRatType && (
        <p>
          <b>Secondary</b>: {profile.secondaryRatType}
        </p>
      )}
      {profile.level !== undefined && (
        <p>
          <b>Level</b>: {profile.level}
        </p>
      )}
      {profile.experience !== undefined && (
        <p>
          <b>XP</b>: {profile.experience}
        </p>
      )}

      {activity.length > 0 && (
        <>
          <h4 style={{ marginTop: '2rem' }}>Recent Activity</h4>
          <ul>
            {activity.map((item, index) => (
              <li key={index}>
                <strong>{item.label}</strong> — {item.xp} XP on {item.createdAt.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}

      {nfts.length > 0 && (
        <>
          <h4 style={{ marginTop: '2rem' }}>Shells</h4>
          <input type='text' placeholder='Filter traits' value={filter} onChange={(e) => setFilter(e.target.value)} />
          <ul>
            {nfts
              .filter((nft) =>
                filter ? nft.rawMetadata?.attributes?.some((a) => `${a.trait_type} ${a.value}`.toLowerCase().includes(filter.toLowerCase())) : true
              )
              .map((nft, idx) => {
                const tokenId = parseInt(nft.tokenId ?? '0', 16)
                return (
                  <li key={idx}>
                    <a href={`/shell/${tokenId}`}>Shell #{tokenId}</a>
                  </li>
                )
              })}
          </ul>
        </>
      )}
    </div>
  )
}
