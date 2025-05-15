// src/components/DocsLayout.tsx
"use client";
import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { DocMeta } from "@/utils/mdx.server";
import s from "@/styles/Docs.module.sass";

// dynamically load random blob only in client
const RandomBlob = dynamic(() => import("./RandomBlob"), { ssr: false });

type TOCItem = { text: string; slug: string; level: number };

interface Props {
  docs: DocMeta[];
  toc: TOCItem[];
  title: string;
  icon?: string | null;
  banner: string | null;
  children: React.ReactNode;
}

const STORAGE_KEY = "docs-open-keys";

const DocsLayout: React.FC<Props> = ({ docs, toc, title, banner, children }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    const folder = parts[1] || "deep-dive";
    const cls = `${folder}`;

    document.body.classList.add(cls);
    return () => {
      document.body.classList.remove(cls);
    };
  }, [pathname]);

  // load persisted state
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setOpenKeys(JSON.parse(stored));
    } catch {}
  }, []);

  // compute pagination
  const currentIndex = docs.findIndex((d) => pathname === `/deep-dive/${d.slug}`);
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  // decide whether to hide pagination
  const hidePagination =
    pathname === "/deep-dive" || pathname === "/deep-dive/get-started-example";

  // group docs into a tree by top-level folder
  const tree = useMemo(() => {
    const map: Record<string, { meta?: DocMeta; children: DocMeta[] }> = {};
    docs.forEach((doc) => {
      const [folder, ...rest] = doc.slug.split("/");
      if (!map[folder]) map[folder] = { children: [] };
      if (rest.length === 0) {
        map[folder].meta = doc;
      } else {
        map[folder].children.push(doc);
      }
    });
    return map;
  }, [docs]);

  // toggle open state
  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className={s.docsLayout}>
      <nav className={s.leftNav}>
        <ul>
          {Object.entries(tree).map(([folder, { meta, children }]) => {
            const isActiveFolder = children.some(
              (child) => pathname === `/deep-dive/${child.slug}`
            );
            const isOpen = openKeys.includes(folder) || isActiveFolder;
            return (
              <li
                key={folder}
                className={[
                  s.navGroup,
                  children.length > 0 && s.hasChildren,
                  isOpen && s.expanded,
                  isActiveFolder && s.activeFolder,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {meta ? (
                  <Link
                    href={`/deep-dive/${meta.slug}`}
                    className={[
                      s.navLink,
                      pathname === `/deep-dive/${meta.slug}` && s.active,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {meta.icon && (
                      <RandomBlob size={40} fill="#59fd53">
                        <Image
                          src={meta.icon}
                          alt={meta.title}
                          width={40}
                          height={40}
                          style={{ display: "block" }}
                        />
                      </RandomBlob>
                    )}
                    <span className={s.navTitle}>{meta.title}</span>
                  </Link>
                ) : (
                  <div
                    className={s.navFolder}
                    onClick={() => {
                      if (!isActiveFolder) toggle(folder);
                    }}
                  >
                    <span className={s.navTitle}>
                      {folder.replace(/-/g, " ")}
                    </span>
                    <span className={s.toggleIcon}>{isOpen ? "-" : "+"}</span>
                  </div>
                )}

                {children.length > 0 && isOpen && (
                  <ul className={s.subList}>
                    {children.map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`/deep-dive/${child.slug}`}
                          className={[
                            s.navLinkChild,
                            pathname === `/deep-dive/${child.slug}` && s.active,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {child.icon && (
                            <RandomBlob size={30} fill="#59fd53">
                              <Image
                                src={child.icon}
                                alt={child.title}
                                width={30}
                                height={30}
                                style={{ display: "block" }}
                              />
                            </RandomBlob>
                          )}
                          <span className={s.navTitleChild}>{child.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <main className={s.mainContent}>
        {banner && (
          <div className={s.bannerContainer}>
            <Image
              src={banner}
              alt={`${title} banner`}
              width={1200}
              height={300}
              className={s.bannerImage}
            />
          </div>
        )}
        <div className={s.mainTitle}>
          <h1>{title}</h1>
        </div>
        <div className={s.mainArticle}>{children}</div>

        {!hidePagination && (
          <div className={s.pagination}>
            {prevDoc ? (
              <Link href={`/deep-dive/${prevDoc.slug}`} className={s.prevLink}>
                <RandomBlob size={30} fill="#59fd53">
                  <Image
                    src={prevDoc.icon!}
                    alt={prevDoc.title}
                    width={30}
                    height={30}
                    style={{ display: "block" }}
                  />
                </RandomBlob>
                <span className={s.linkText}>⬅️{prevDoc.title}</span>
              </Link>
            ) : (
              <div></div>
            )}
            {nextDoc && (
              <Link href={`/deep-dive/${nextDoc.slug}`} className={s.nextLink}>
                <RandomBlob size={30} fill="#59fd53">
                  <Image
                    src={nextDoc.icon!}
                    alt={nextDoc.title}
                    width={30}
                    height={30}
                    style={{ display: "block" }}
                  />
                </RandomBlob>
                <span className={s.linkText}>{nextDoc.title}➡️</span>
              </Link>
            )}
          </div>
        )}
      </main>

      <aside className={s.rightToc}>
        <ul>
          {toc.map((h) => (
            <li key={h.slug} className={s[`level${h.level}`]}>
              <Link href={`#${h.slug}`}>{h.text}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default DocsLayout;
