'use client'

// components/UserProfileCard.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebaseClient'
import ffLogo from '@images/ff.svg'
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

const UserProfileCard = () => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          const profileRef = doc(db, 'users', firebaseUser.uid)
          const profileSnap = await getDoc(profileRef)

          if (!profileSnap.exists()) {
            setNotFound(true)
            return
          }

          const profileData = profileSnap.data() as ProfileData
          setProfile(profileData)
        } catch (err) {
          console.error('Error fetching profile:', err)
          setNotFound(true)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  if (notFound) return <p className={s.miniLoading}>User not found.</p>
  if (!user || !profile) return <p className={s.miniLoading}>Loading...</p>

  const createdAtDate =
    profile.createdAt instanceof Timestamp
      ? profile.createdAt.toDate()
      : typeof profile.createdAt === 'number'
      ? new Date(profile.createdAt)
      : (profile.createdAt as Date)

  return (
    <div className={s.dropdownProfile}>
      <span className={s.levelCorner}>{profile.level}</span>
      {profile.username ? <h3>{profile.username}</h3> : <Link href='/settings'>Select Username</Link>}
      {profile.ratType ? (
        <p>
          <b>{profile.ratType}</b>, {profile.secondaryRatType}
        </p>
      ) : (
        <Link href='/settings'>Select Role</Link>
      )}
      {profile.level !== undefined && (
        <p className={s.level}>
          <b>Level {profile.level}</b> <span className='xpPill'>{profile.experience} / 69</span>
        </p>
      )}
      <p className={s.date}>
        <i>Joined {createdAtDate.toLocaleDateString()}</i>
      </p>
      <span className={s.badge}>
        <Image src={ffLogo.src} width='80' height='40' alt='Fiending Fathers' />
      </span>
    </div>
  )
}

export default UserProfileCard
