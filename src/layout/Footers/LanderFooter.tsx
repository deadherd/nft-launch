import Image from "next/image";
import Link from "next/link";
import LazySection from "../Containers/LazySection";
import s from "../../styles/Footer.module.sass";

export default function Footer() {
  return (
    <>
      <LazySection>
        <footer className={s.footer}>
          <div className={s.content}>
            <h4>
              You<i> </i>saw<i> </i>too<i> </i>much
            </h4>
            <p>Might as well join...</p>
            <div className={s.links}>
              <Link href="/deep-dive">
                <Image
                  src="/assets/images/get-yolked.svg"
                  alt="MFR Get Yolked"
                  width={200}
                  height={70}
                  className={s.cstore}
                />
              </Link>
            </div>
          </div>
          <video autoPlay loop muted preload="none">
            <source
              src="/assets/video/steam-sewer-manhole-truck.mp4"
              type="video/mp4"
            ></source>
            <source
              src="/assets/video/steam-sewer-manhole-truck.ogg"
              type="video/ogg"
            ></source>
          </video>
        </footer>
      </LazySection>
    </>
  );
}
