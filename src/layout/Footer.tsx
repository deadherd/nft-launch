import LazySection from "../layout/LazySection";
import s from "../styles/Footer.module.sass";

export default function Footer() {
  return (
    <>
      <LazySection>
        <footer className={s.footer}>
          <video autoPlay loop muted preload="none">
            <source
              src="assets/video/steam-sewer-manhole-truck.mp4"
              type="video/mp4"
            ></source>
            <source
              src="assets/video/steam-sewer-manhole-truck.ogg"
              type="video/ogg"
            ></source>
          </video>
        </footer>
      </LazySection>
    </>
  );
}
