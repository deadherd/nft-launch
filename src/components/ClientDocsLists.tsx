// src/components/ClientDocsList.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import RandomBlob from "./RandomBlob";
import type { DocMeta } from "@/lib/mdxService";
import s from "@/styles/Docs.module.sass";

interface ClientDocsListProps {
  docs: DocMeta[];
}

export default function ClientDocsList({ docs }: ClientDocsListProps) {
  // split into top-level docs vs subfolder docs
  const rootDocs = docs.filter((doc) => !doc.slug.includes("/"));
  const subMap: Record<string, DocMeta[]> = {};
  docs.forEach((doc) => {
    const [folder, ...rest] = doc.slug.split("/");
    if (rest.length) {
      if (!subMap[folder]) subMap[folder] = [];
      subMap[folder].push(doc);
    }
  });

  return (
    <ul className={s.indexList}>
      {/* top-level pages */}
      {rootDocs.map((doc) => (
        <li key={doc.slug} className={s.indexItem} suppressHydrationWarning>
          <Link href={`/deep-dive/${doc.slug}`} className={s.indexLink}>
            {doc.icon && (
              <RandomBlob size={40} fill="#59fd53">
                <Image
                  src={doc.icon}
                  alt={doc.title}
                  width={40}
                  height={40}
                  style={{ display: "block" }}
                />
              </RandomBlob>
            )}
            {doc.title}
          </Link>
        </li>
      ))}

      {/* grouped subfolders */}
      {Object.entries(subMap).map(([folder, items]) => (
        <li key={folder} className={s.indexFolder} suppressHydrationWarning>
          <h2 className={s.folderTitle}>{folder.replace(/-/g, " ")}</h2>
          <ul>
            {items.map((doc) => (
              <li key={doc.slug} className={s.indexItem}>
                <Link href={`/deep-dive/${doc.slug}`} className={s.indexLink}>
                  {doc.icon && (
                    <RandomBlob size={30} fill="#59fd53">
                      <Image
                        src={doc.icon}
                        alt={doc.title}
                        width={30}
                        height={30}
                        style={{ display: "block" }}
                      />
                    </RandomBlob>
                  )}
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
