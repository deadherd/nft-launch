// app/settings/page.tsx
import Link from 'next/link'
//import Image from 'next/image'
import s from '@/styles/Container.module.sass'

export default function SettingsPage() {
  return (
    <div className={s.container}>
      <h2 className={s.centered}>Settings</h2>
      <div className={s.panel}>
        <Link href='/settings/usertag'>Set Usertag</Link>
        <Link href='/settings/role'>Set Role/s</Link>
        <Link href='/settings/purchases'>View Purchases</Link>
        <Link href='/activity'>View Activity</Link>
      </div>
    </div>
  )
}
