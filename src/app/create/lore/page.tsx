// src/app/lore/create/page.tsx
"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import {
  serverTimestamp,
  type Timestamp,
  type FieldValue,
} from "firebase/firestore";

// persist state in localStorage
function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}

// helper to slugify title
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// define lore item shape for Firestore
type LoreItem = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  parentId?: string;
  relatedIds?: string[];
  order?: number;
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
};

export default function CreateLorePage() {
  // hook now returns items, add and update helpers
  const { items, addItem, updateItem } =
    useFirestoreCollection<LoreItem>("loreItems");

  // selection state: null = new, otherwise editing existing
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // form fields with persistence
  const [slug, setSlug] = usePersistentState("lore:slug", "");
  const [title, setTitle] = usePersistentState("lore:title", "");
  const [summary, setSummary] = usePersistentState("lore:summary", "");
  const [content, setContent] = usePersistentState("lore:content", "");
  const [category, setCategory] = usePersistentState("lore:category", "");
  const [tags, setTags] = usePersistentState("lore:tags", "");
  const [parentId, setParentId] = usePersistentState("lore:parentId", "");
  const [order, setOrder] = usePersistentState("lore:order", "0");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // auto-generate slug from title when title changes and creating new
  useEffect(() => {
    if (title && !selectedId) {
      setSlug(generateSlug(title));
    }
  }, [title, selectedId, setSlug]);

  // when selecting existing item, populate form
  useEffect(() => {
    if (selectedId) {
      const item = items.find((it) => it.id === selectedId);
      if (item) {
        setSlug(item.slug);
        setTitle(item.title);
        setSummary(item.summary);
        setContent(item.content);
        setCategory(item.category);
        setTags(item.tags.join(","));
        setParentId(item.parentId ?? "");
        setOrder((item.order ?? 0).toString());
      }
    } else {
      // clear form for new
      setSlug("");
      setTitle("");
      setSummary("");
      setContent("");
      setCategory("");
      setTags("");
      setParentId("");
      setOrder("0");
    }
  }, [
    selectedId,
    items,
    setSlug,
    setTitle,
    setSummary,
    setContent,
    setCategory,
    setTags,
    setParentId,
    setOrder,
  ]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const baseData = {
        slug,
        title,
        summary,
        content,
        category,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        relatedIds: [] as string[],
        order: parseInt(order, 10) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const data: Partial<LoreItem> & Omit<LoreItem, "updatedAt"> = parentId
        ? { ...baseData, parentId, updatedAt: serverTimestamp() }
        : { ...baseData, updatedAt: serverTimestamp() };

      if (selectedId) {
        // update existing
        await updateItem(selectedId, data);
      } else {
        // add new
        await addItem(data as Omit<LoreItem, "id">);
      }

      // reset selection and clear storage
      setSelectedId(null);
      [
        "lore:slug",
        "lore:title",
        "lore:summary",
        "lore:content",
        "lore:category",
        "lore:tags",
        "lore:parentId",
        "lore:order",
      ].forEach((k) => localStorage.removeItem(k));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>{selectedId ? "Edit Lore" : "Create Lore"}</h1>

      {/* select existing or new */}
      <label>
        <select
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(e.target.value || null)}
          className="w-full"
        >
          <option value="">Select lore item to edit...</option>
          {items.map((it) => (
            <option key={it.id} value={it.id}>
              {it.title}
            </option>
          ))}
        </select>
      </label>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input
          placeholder="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <textarea
          placeholder="content (markdown or HTML)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
        <input
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          placeholder="parentId (optional)"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        />
        <input
          type="number"
          placeholder="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading
            ? selectedId
              ? "updating…"
              : "saving…"
            : selectedId
            ? "update lore"
            : "create lore"}
        </button>
      </form>
    </div>
  );
}
