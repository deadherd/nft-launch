"use client";

import { useRef, useEffect } from "react";
import { useActivityLog } from "@/hooks/useActivityLog";
import useAuthUser from "@/hooks/useAuthUser";
import { useToasts } from "@/layout/Providers/ToastProvider";
import { getTime } from "@/utils/getTime";

export function useActivityToasts() {
  const { user } = useAuthUser();
  const log = useActivityLog(user?.uid ?? "");
  const { addToast } = useToasts();

  const initialized = useRef(false);
  const lastSeen = useRef(0);

  useEffect(() => {
    if (log.length === 0) return;

    if (!initialized.current) {
      const latest = getTime(log[0].createdAt) || Date.now();
      lastSeen.current = latest;
      initialized.current = true;
      return;
    }

    const newEntries = log.filter((entry) => {
      const t = getTime(entry.createdAt);
      return t > lastSeen.current;
    });

    if (newEntries.length > 0) {
      lastSeen.current = Math.max(
        ...newEntries.map((e) => getTime(e.createdAt)),
      );
      newEntries
        .slice()
        .reverse()
        .forEach((e) => addToast(e.label));
    }
  }, [log, addToast]);
}
