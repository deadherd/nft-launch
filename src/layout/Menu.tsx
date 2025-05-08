// components/Menu.tsx

import Image from "next/image";

export default function Menu() {
  return (
    <>
      <div className="menu-links">
        <a href="#">
          <span className="linkcon">
            <Image
              src="/assets/images/food-truck.svg"
              alt="MFR Snackhouse"
              width={938}
              height={766}
            />
          </span>
          Snackhouse
        </a>
        <a href="#">
          <span className="linkcon">
            <Image
              src="/assets/images/pizza-place.svg"
              alt="MFR Kitchen"
              width={704}
              height={672}
            />
          </span>
          View DoCs
        </a>
        <a href="#">
          <span className="linkcon">
            <Image
              src="/assets/images/sewer-grate-wall.svg"
              alt="MFR Sewer Grate"
              width={943}
              height={959}
              className="-mb-[1vw]"
            />
          </span>
          NYC SewEr
        </a>
        <a href="#">
          <span className="linkcon">
            <Image
              src="/assets/images/fridge-open.svg"
              alt="MFR Fridge"
              width={781}
              height={947}
            />
          </span>
          COoler
        </a>
        <a href="#">
          <span className="linkcon">
            <Image
              src="/assets/images/pizza-bin.svg"
              alt="MFR Pizza Bin"
              width={704}
              height={672}
            />
          </span>
          FoOd BIn
        </a>
        <a href="#">
          <span className="linkcon">
            <Image
              src="/assets/images/pipeline.svg"
              alt="MFR Pipeline"
              width={610}
              height={870}
            />
          </span>
          PipelInE
        </a>
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