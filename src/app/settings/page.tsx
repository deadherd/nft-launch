// app/settings/page.tsx
import Link from 'next/link'
//import Image from 'next/image'
import s from '@/styles/Container.module.sass'

export default function SettingsPage() {
  return (
    <div className={`${s.container} ${s.tight}`}>
      <h2 className='center feature'>Settings</h2>
      <div className={s.panel}>
        <Link href='/settings/usertag'>Set Usertag</Link>
        <Link href='/settings/role'>Set Role/s</Link>
        <hr />
        <Link href='/purchases'>View Purchases</Link>
        <Link href='/activity'>View Activity</Link>
      </div>
    </div>
  )
}
