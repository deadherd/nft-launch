import Image from 'next/image'
import useAuthUser from '@/hooks/useAuthUser'
import s from '../styles/Header.module.sass'

// -- start: user stats display --
export default function FamilyRank() {
  const { user, userData } = useAuthUser()

  // don't render if user not signed in or missing data
  if (!user || !userData) return null

  return (
    <>
      {/* -- level stat -- */}
      <div className={`${s.stat} ${s.rank}`}>
        <span className={s.statNum}>{userData.level ?? '-'}</span>
        <span className={s.statIcon}>
          <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='15' height='15' alt='Level' className={s.iconImage} />
        </span>
      </div>

      {/* -- experience stat -- */}
      <div className={`${s.stat} ${s.exp}`}>
        <span className={s.statNum}>{userData.experience ?? '0'}</span>
        <span className={s.statNum}>
          <small>/69</small>
        </span>
        {/*<span className={s.statIcon}><Image src='/assets/images/ratioactive-dark.svg' width='18' height='15' alt='XP' className={s.iconImage} /></span>*/}
      </div>

      {/* -- "made" stat (custom game metric) -- */}
      <div className={`${s.stat} ${s.made}`}>
        <span className={s.statNum}>{userData.made ?? '0'}</span>
        <span className={s.statIcon}>
          <Image src='/assets/images/logo-inverted.svg' width='16' height='15' alt='Made' className={s.iconImage} />
        </span>
      </div>

      {/* -- money stat -- */}
      <div className={`${s.stat} ${s.money}`}>
        <span className={s.statNum}>{userData.money ?? '0'}</span>
        <div className={s.statIcon}>
          <Image src='/assets/images/dollar.svg' width='12' height='15' alt='Money' className={s.iconImage} />
        </div>
      </div>
    </>
  )
}
// -- end: FamilyRank --
