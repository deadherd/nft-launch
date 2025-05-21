import Link from "next/link";
//import LogoSvg from "@/components/svg/LogoSvg";
import OpenSignSvg from "@/components/svg/OpenSignSvg";
import s from "@/styles/ProfileCard.module.sass";

export default function Page() {
  
  const clawColor = "#59fd53";

  return (
    <div id="profile" className={s.profile}>
      <div className={s.pfp}>{/*<OpenSignSvg color={clawColor} />*/}</div>
      <div className={s.details}>
        <span className={s.nickname}>@Blacktail</span>
        <span className={s.name}>Leo Omeletti</span>
        <span className={s.title}>, Don</span>
      </div>
      <div className={s.toolbar}>
        <Link href="#">
          <OpenSignSvg color={clawColor} />
        </Link>
        <Link href="#">
          <OpenSignSvg color={clawColor} />
        </Link>
        <Link href="#">
          <OpenSignSvg color={clawColor} />
        </Link>
        <Link href="#">
          <OpenSignSvg color={clawColor} />
        </Link>
        <Link href="#">
          <OpenSignSvg color={clawColor} />
        </Link>
      </div>
      <ul className={s.stats}>
        <li>
          <span className={s.statTitle}>Mischief Rank</span>
          <span className={s.statNumber}>1</span>
        </li>
        {/*<li>
          <span className={s.statTitle}>Yolks</span>
          <span className={s.statNumber}>0</span>
        </li>
        <li>
          <span className={s.statTitle}>Pets</span>
          <span className={s.statNumber}>-</span>
        </li>
        <li>
          <span className={s.statTitle}>Nutrition Boost</span>
          <span className={s.statNumber}>
            1.0<b>%</b>
          </span>
        </li>*/}
      </ul>
    </div>
  );
}