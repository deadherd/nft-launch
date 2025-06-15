'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import s from '@/styles/Container.module.sass'
import Image from 'next/image'

export default function RoleSettingsPage() {
  const [uid, setUid] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [ratType, setRatType] = useState('')
  const [secondaryRatType, setSecondaryRatType] = useState('')
  const [originalRatType, setOriginalRatType] = useState('')
  const [originalSecondaryRatType, setOriginalSecondaryRatType] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          const userData = userSnap.data()
          const u = userData.username || ''
          setUsername(u)
          const rat = userData.ratType || ''
          setRatType(rat)
          setOriginalRatType(rat)
        }
        if (userSnap.exists()) {
          const u = userSnap.data().username
          if (u) {
            const profileRef = doc(db, 'profiles', u)
            const profileSnap = await getDoc(profileRef)
            if (profileSnap.exists()) {
              const data = profileSnap.data()
              const r = data.ratType || ''
              const sec = data.secondaryRatType || ''
              setRatType(r)
              setOriginalRatType(r)
              setSecondaryRatType(sec)
              setOriginalSecondaryRatType(sec)
            }
          }
        }
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!ratType && secondaryRatType) setSecondaryRatType('')
  }, [ratType, secondaryRatType])

  const handleSave = async () => {
    if (!uid || !username) return
    setMessage('Saving...')
    setLoading(true)
    const profileRef = doc(db, 'profiles', username)
    const userRef = doc(db, 'users', uid)
    try {
      await setDoc(profileRef, { ratType, secondaryRatType: secondaryRatType || null }, { merge: true })
      await setDoc(userRef, { ratType, secondaryRatType: secondaryRatType || null }, { merge: true })
      setOriginalRatType(ratType)
      setOriginalSecondaryRatType(secondaryRatType)
      setMessage('✅ Settings updated successfully.')
    } catch (err) {
      console.error(err)
      setMessage('❌ Error saving settings.')
    } finally {
      setLoading(false)
    }
  }

  const hasChanges = ratType !== originalRatType || secondaryRatType !== originalSecondaryRatType

  if (loading)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-gray-800 text-green-400 p-4 rounded'>Loading...</div>
      </div>
    )

  return (
    <div className={s.container}>
      <form className={s.form}>
        <h1 className='feature'>Role</h1>

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
          <button onClick={handleSave} disabled={loading || !hasChanges} className={`button ${!hasChanges ? 'disabled' : ''}`}>
            Save
          </button>
        </div>

        {message && <p className='formnote'>{message}</p>}
      </form>
    </div>
  )
}
