import Image from 'next/image'
import useAuthUser from '@/hooks/useAuthUser'
import s from '../styles/Header.module.sass'

export default function FamilyRank() {
  const { user, userData } = useAuthUser()

  if (!user || !userData) return null

  return (
    <div className={s.statistics}>
      <div className={`${s.stat} ${s.rank}`}>
        <span className={s.statNum}>{userData.level ?? '-'}</span>
        <span className={s.statIcon}>
          <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='15' height='15' alt='Daily' className={s.iconImage} />
        </span>
      </div>

      <div className={`${s.stat} ${s.exp}`}>
        <span className={s.statNum}>{userData.experience ?? '-'}</span>
        <span className={s.statIcon}>
          <Image src='/assets/images/ratioactive-dark.svg' width='18' height='15' alt='Daily' className={s.iconImage} />
        </span>
      </div>

      <div className={`${s.stat} ${s.made}`}>
        <span className={s.statNum}>{userData.made ?? '-'}</span>
        <span className={s.statIcon}>
          <Image src='/assets/images/logo-inverted.svg' width='18' height='17' alt='Daily' className={s.iconImage} />
        </span>
      </div>

      <div className={`${s.stat} ${s.money}`}>
        <span className={s.statNum}>{userData.money ?? '-'}</span>
        <div className={s.statIcon}>
          <Image src='/assets/images/dollar.svg' width='12' height='15' alt='Daily' className={s.iconImage} />
        </div>
      </div>
    </div>
  )
}
