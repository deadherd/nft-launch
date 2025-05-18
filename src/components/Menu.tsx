// components/Menu.tsx

import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <>
      <div className="menu-links">
        <Link href="/deep-dive">
          <Image
            src="/assets/images/menu/dark-deep-dive.svg"
            alt="MFR Deep Dive"
            width={150}
            height={300}
          />
        </Link>
        <Link href="/store">
          <Image
            src="/assets/images/menu/dark-cook-book.svg"
            alt="MFR Cook Book"
            width={150}
            height={300}
          />
        </Link>
        <Link href="/store">
          <Image
            src="/assets/images/menu/dark-snack-house.svg"
            alt="MFR Snack House"
            width={150}
            height={300}
          />
        </Link>
      </div>
      <div className="menu">
        <Image
          src="/assets/images/blob.svg"
          alt="Slime Blob"
          width={155}
          height={184}
          className="menublob"
        />
      </div>
    </>
  );
}