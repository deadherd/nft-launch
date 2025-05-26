"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import s from "../../styles/Container.module.sass";

export default function SettingsPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // must be signed in
    if (!auth.currentUser) {
      setError("you must be signed in");
      return;
    }
    // simple username rule: 3-15 chars, lowercase letters/numbers/underscore
    if (!/^[a-z0-9_]{3,15}$/.test(username)) {
      setError("invalid username");
      return;
    }

    // check if taken
    const ref = doc(db, "profiles", username);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setError("username taken");
      return;
    }

    // create profile
    await setDoc(ref, {
      uid: auth.currentUser.uid,
      username,
      createdAt: serverTimestamp(),
    });

    // redirect to new profile page
    router.push(`/${username}`);
  }

  return (
    <div className={s.container}>
      <br/><br/><br/><br/>
      <h1>settings</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          placeholder="choose username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p className={s.error}>{error}</p>}
        <button type="submit" className={s.button}>
          save username
        </button>
      </form>
    </div>
  );
}
