'use client'

// app/settings/page.tsx
import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import s from '@/styles/Container.module.sass'
//import Link from 'next/link'
import { containsBannedWords } from '@/utils/bannedWords'
import NftCountGate from '@/components/gates/NftCountGate'

export default function UsertagSettingsPage() {
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
  const [usernameValid, setUsernameValid] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState<'loading' | 'available' | 'unavailable' | null>(null)

  const sanitizeUsername = (value: string) => {
    let v = value.replace(/[-\s]+/g, '_').toLowerCase()
    // strip any characters except letters, numbers and underscores
    v = v.replace(/[^a-z0-9_]/g, '')
    return v
  }

  const isValidUsername = (value: string) => {
    if (value.length < 6) return false
    if (!/^[a-z]/.test(value)) return false
    if (/__/.test(value)) return false
    if ((value.match(/_/g) || []).length > 2) return false
    if (/[^a-z0-9_]/.test(value)) return false
    if (/_$/.test(value)) return false
    if (containsBannedWords(value)) return false
    return true
  }

  // role fields are loaded for completeness but not edited on this page

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
          setUsernameValid(true)
          setUsernameStatus(null)
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

  useEffect(() => {
    if (!usernameValid || newUsername === currentUsername) {
      setUsernameStatus(null)
      return
    }

    setUsernameStatus('loading')
    const timer = setTimeout(async () => {
      try {
        const ref = doc(db, 'profiles', newUsername)
        const snap = await getDoc(ref)
        setUsernameStatus(snap.exists() ? 'unavailable' : 'available')
      } catch (err) {
        console.error(err)
        setUsernameStatus(null)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [newUsername, usernameValid, currentUsername])

  const handleUsernameChange = (val: string) => {
    const cleaned = sanitizeUsername(val)
    setNewUsername(cleaned)
    const valid = isValidUsername(cleaned)
    setUsernameValid(valid)
    setUsernameStatus(null)
  }

  const handleSave = async () => {
    if (!uid) return

    const cleanedUsername = sanitizeUsername(newUsername.trim())

    if (cleanedUsername !== currentUsername && !isValidUsername(cleanedUsername)) {
      setMessage('⚠️ Invalid username.')
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
      setMessage('Settings updated successfully.')
    } catch (err) {
      console.error(err)
      setMessage('Error saving settings.')
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
        <h1 className='feature'>TagbAcks</h1>
        <span className='linkTitle'>{newUsername && <a target='_blank'>🔒 View Profile</a>}</span>
        <label>
          <span>Usertag</span>
          <NftCountGate minimum={1} fallback={'Currently only for Fiending Fathers. Please check back later or get your hustle on.'}>
            <input
              type='text'
              value={newUsername}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className={currentUsername && newUsername !== currentUsername ? 'changed' : ''}
            />
          </NftCountGate>
          {(() => {
            const msg =
              usernameStatus === 'loading'
                ? 'Checking...'
                : usernameStatus === 'available'
                ? 'Username available'
                : usernameStatus === 'unavailable'
                ? 'Username unavailable'
                : !usernameStatus && !usernameValid && newUsername !== currentUsername
                ? 'Invalid username'
                : ''
            return msg ? <p className='labelNotify'>{msg}</p> : null
          })()}
        </label>

        {/*<label>
          <span>Bio</span>
          <textarea disabled value='🔒' onChange={(e) => setBio(e.target.value)} rows={3} />
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
        </label>*/}

        <NftCountGate minimum={1}>
          <div className='pushRight'>
            <button
              onClick={handleSave}
              disabled={loading || !hasChanges || !usernameValid || (usernameStatus === 'unavailable' && newUsername !== currentUsername)}
              className={`button ${!hasChanges || !usernameValid || (usernameStatus === 'unavailable' && newUsername !== currentUsername) ? 'disabled' : ''}`}
            >
              Save
            </button>
          </div>
        </NftCountGate>

        {message && <p className='formnote'>{message}</p>}
      </form>
    </div>
  )
}
