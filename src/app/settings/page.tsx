'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

import s from '../../styles/Container.module.sass'
import Link from 'next/link'

export default function SettingsPage() {
  const [uid, setUid] = useState<string | null>(null)
  const [currentUsername, setCurrentUsername] = useState('')
  const [bio, setBio] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // Ensure value is always a string (not undefined)
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

          // ✅ Now get bio from the profile document
          if (u) {
            const profileRef = doc(db, 'profiles', u)
            const profileSnap = await getDoc(profileRef)

            if (profileSnap.exists()) {
              const profileData = profileSnap.data()
              setBio(profileData.bio || '')
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

    // Sanitize and validate username
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

      // 1. Create/Update new profile index
      await setDoc(newProfileRef, {
        uid,
        username: cleanedUsername,
        bio,
        createdAt: serverTimestamp(),
      })

      // 2. Update user's personal document
      await setDoc(userRef, { username: cleanedUsername, bio }, { merge: true })

      // 3. Delete old profile (if name changed)
      if (oldProfileRef) {
        await deleteDoc(oldProfileRef)
      }

      setCurrentUsername(cleanedUsername)
      setMessage('✅ Settings updated successfully.')
    } catch (err) {
      console.error(err)
      setMessage('❌ Error saving settings.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className={s.container}>
      <h1>settings</h1>
      <form className={s.form}>
        <label style={{ display: 'block', marginTop: '1rem' }}>
          Username:
          <input
            type='text'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          <div className='block text-right'>
            <Link href={`/${newUsername}`} target='_blank'>
              View Profile
            </Link>
          </div>
        </label>

        <label style={{ display: 'block', marginTop: '1rem' }}>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </label>

        <button
          onClick={handleSave}
          disabled={loading || newUsername.trim().length < 5}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save
        </button>

        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </form>
    </div>
  )
}
