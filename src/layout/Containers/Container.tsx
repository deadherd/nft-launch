// app/layout/Containers/Container.tsx

import s from '@/styles/Container.module.sass'

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={s.container}>{children}</div>
}
