"use client";

import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef } from "react";
import { db } from "@/lib/firebaseClient";
import { useToasts } from "@/layout/Providers/ToastProvider";
import useAuthUser from "@/hooks/useAuthUser";
import type { TimestampLike } from "@/utils/getTime";
import { getTime } from "@/utils/getTime";

interface PurchaseDoc {
  id: string;
  createdAt?: Date | number | TimestampLike;
  quantity?: number;
  [key: string]: unknown;
}

export function useGlobalPurchaseNotifications() {
  const { addToast } = useToasts();
  const { user } = useAuthUser();
  const initialized = useRef(false);
  const lastSeen = useRef(0);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collectionGroup(db, "purchases"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as PurchaseDoc,
        );
        if (!initialized.current) {
          if (docs.length > 0) lastSeen.current = getTime(docs[0].createdAt);
          initialized.current = true;
          return;
        }

        docs.forEach((doc) => {
          const ts = getTime(doc.createdAt);
          if (ts > lastSeen.current) {
            lastSeen.current = ts;
            const quantity = doc.quantity ?? 1;
            addToast(
              `Someone purchased x${quantity} Shell${quantity > 1 ? "s" : ""}!`,
            );
          }
        });
      },
      (err) => {
        console.error("[Purchases] Snapshot error:", err);
      },
    );

    return () => unsub();
  }, [addToast, user]);
}
