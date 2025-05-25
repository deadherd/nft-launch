"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseClient";
import { useParams } from "next/navigation";
//import styles from "./page.module.sass";

type ProfileData = {
  uid: string;
  username: string;
  createdAt: { toDate: () => Date };
};

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    const ref = doc(db, "profiles", username);
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        setProfile(snap.data() as ProfileData);
      } else {
        setNotFound(true);
      }
    });
  }, [username]);

  if (notFound) return <p>user not found</p>;
  if (!profile) return <p>loading...</p>;

  return (
    <div>
      <h1>@{profile.username}</h1>
      <p>member since {profile.createdAt.toDate().toLocaleDateString()}</p>
    </div>
  );
}
