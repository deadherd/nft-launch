'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import s from '@/styles/Container.module.sass'
import Link from 'next/link'
import Image from 'next/image'

export default function SettingsPage() {
  const [uid, setUid] = useState<string | null>(null)
  const [currentUsername, setCurrentUsername] = useState('')
  const [bio, setBio] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [ratType, setRatType] = useState('')
  const [secondaryRatType, setSecondaryRatType] = useState('')
  const [originalBio, setOriginalBio] = useState('')
  const [originalRatType, setOriginalRatType] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const ratDescriptions: Record<string, { text: string; icon: string }> = {
    trader: {
      text: 'Finds useful resources, tools, or content and brings them back to the crew. Mission: Scavenger',
      icon: '/assets/images/icons/png/fork&knife128.png',
    },
    hacker: {
      text: 'Builds and breaks code, automates tasks, and improves project tools. Mission: Hacker',
      icon: '/assets/images/icons/png/function_128.png',
    },
    shiller: {
      text: 'Protects the community, enforces rules, and helps manage moderation. Mission: Muscle',
      icon: '/assets/images/icons/png/history_128.png',
    },
    explorer: {
      text: 'Gathers intel, watches for threats or scams, and keeps the crew informed. Mission: Lookout',
      icon: '/assets/images/icons/png/binoculars_128.png',
    },
    engineer: {
      text: 'Creates bots, builds features, and experiments with new tech ideas. Mission: Inventor',
      icon: '/assets/images/icons/png/geometry1_128.png',
    },
    recruiter: {
      text: 'Helps grow the project by recruiting, teaching, or onboarding others. Mission: Breeder',
      icon: '/assets/images/icons/png/heart2_128.png',
    },
    distributor: {
      text: 'Handles trades, sells items or NFTs, and runs drops or market actions. Mission: Dealer',
      icon: '/assets/images/icons/png/handshake_128.png',
    },
    writer: {
      text: 'Crafts stories, scripts, or copy that strengthen our world and message. Mission: Intelligence',
      icon: '/assets/images/icons/png/pencil_128.png',
    },
    designer: {
      text: 'Shapes the visual language of the project through layouts and brand assets. Mission: Architect',
      icon: '/assets/images/icons/png/geometry2_128.png',
    },
  }

  const selected = ratDescriptions[ratType]
  const secondarySelected = ratDescriptions[secondaryRatType]

  const [originalSecondaryRatType, setOriginalSecondaryRatType] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)

        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          const userData = userSnap.data()
          const u = userData.username || ''
          setCurrentUsername(u)
          setNewUsername(u)
          const ratTypeVal = userData.ratType || ''
          setRatType(ratTypeVal)
          setOriginalRatType(ratTypeVal)

          if (u) {
            const profileRef = doc(db, 'profiles', u)
            const profileSnap = await getDoc(profileRef)

            if (profileSnap.exists()) {
              const profileData = profileSnap.data()
              const bioVal = profileData.bio || ''
              const ratTypeVal = profileData.ratType || ''
              const secondaryRat = profileData.secondaryRatType || ''
              setBio(bioVal)
              setOriginalBio(bioVal)
              setRatType(ratTypeVal)
              setOriginalRatType(ratTypeVal)
              setSecondaryRatType(secondaryRat)
              setOriginalSecondaryRatType(secondaryRat)
            }
          }
        }
      }

      setLoading(false)
    })

    return () => unsub()
  }, [])

  const handleSave = async () => {
    if (!uid) return

    const cleanedUsername = newUsername
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')

    if (cleanedUsername.length < 5) {
      setMessage('⚠️ Username must be at least 5 characters and contain only letters, numbers, or underscores.')
      return
    }

    setMessage('Saving...')
    setLoading(true)

    const newProfileRef = doc(db, 'profiles', cleanedUsername)
    const userRef = doc(db, 'users', uid)
    const oldProfileRef = currentUsername && currentUsername !== cleanedUsername ? doc(db, 'profiles', currentUsername) : null

    try {
      const existing = await getDoc(newProfileRef)
      if (existing.exists() && cleanedUsername !== currentUsername) {
        setMessage('⚠️ Username is already taken.')
        setLoading(false)
        return
      }

      const data = {
        uid,
        username: cleanedUsername,
        bio,
        ratType,
        secondaryRatType: secondaryRatType || null,
        createdAt: serverTimestamp(),
      }

      await setDoc(newProfileRef, data)
      await setDoc(userRef, { username: cleanedUsername, bio, ratType, secondaryRatType: secondaryRatType || null }, { merge: true })

      if (oldProfileRef) {
        await deleteDoc(oldProfileRef)
      }

      // Activity log for username change
      await addDoc(collection(db, 'users', uid, 'activity'), {
        label: `Updated username to "${cleanedUsername}"`,
        type: 'username_change',
        xp: 0,
        createdAt: Date.now(), // or use serverTimestamp() if preferred
      })

      setCurrentUsername(cleanedUsername)
      setOriginalBio(bio)
      setOriginalRatType(ratType)
      setMessage('✅ Settings updated successfully.')
    } catch (err) {
      console.error(err)
      setMessage('❌ Error saving settings.')
    } finally {
      setLoading(false)
    }
  }

  const hasChanges = newUsername !== currentUsername || bio !== originalBio || ratType !== originalRatType || secondaryRatType !== originalSecondaryRatType

  useEffect(() => {
    if (!ratType && secondaryRatType) {
      setSecondaryRatType('')
    }
  }, [ratType, secondaryRatType])

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-gray-800 text-green-400 p-4 rounded'>Loading...</div>
      </div>
    )

  return (
    <div className={s.container}>
      <form className={s.form}>
        <h1 className='feature'>Settings</h1>

        <label>
          <span className='linkTitle'>
            Username{' '}
            {newUsername && (
              <Link href={`/${newUsername}`} target='_blank'>
                View Profile
              </Link>
            )}
          </span>
          <input type='text' value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        </label>

        <label>
          <span>Bio</span>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
        </label>

        <label>
          <span>Primary Role</span>
          <div className='select'>
            <select value={ratType} onChange={(e) => setRatType(e.target.value)}>
              <option value=''>Select a role</option>
              {Object.keys(ratDescriptions).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {selected && (
            <p className='labelDesc'>
              <Image src={selected.icon} alt={ratType} width={60} height={60} />
              <span>{selected.text}</span>
            </p>
          )}
        </label>

        <label className={`${!ratType ? 'disabled' : ''}`}>
          <span>Secondary Role</span>
          <div className='select'>
            <select value={secondaryRatType} onChange={(e) => setSecondaryRatType(e.target.value)} disabled={!ratType}>
              <option value=''>Select a secondary role</option>
              {Object.keys(ratDescriptions)
                .filter((key) => key !== ratType)
                .map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
            </select>
          </div>
          {secondarySelected && (
            <p className='labelDesc'>
              <Image src={secondarySelected.icon} alt={secondaryRatType} width={60} height={60} />
              <span>{secondarySelected.text}</span>
            </p>
          )}
        </label>

        <div className='pushRight'>
          <button
            onClick={handleSave}
            disabled={loading || !hasChanges || newUsername.trim().length < 5}
            className={`button ${!hasChanges || newUsername.trim().length < 5 ? 'disabled' : ''}`}
          >
            Save
          </button>
        </div>

        {message && <p className='formnote'>{message}</p>}
      </form>
    </div>
  )
}
