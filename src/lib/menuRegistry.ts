import type { MenuItem } from '@/types/Route'

export const MenuRegistry: Record<string, MenuItem[]> = {
  default: [
    { icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' },
  ],
  sunnyside: [
    { icon: 'buynow_128.png', title: 'Stash', link: '/sunnyside/stash', className: '' },
  ],
  sunnysideExit: [
    { icon: 'arrow_left_128.png', title: 'Exit', link: '/sunnyside', className: 'exit' },
  ],
}

export function getMenuItems(menuId?: string): MenuItem[] {
  if (menuId && MenuRegistry[menuId]) {
    return MenuRegistry[menuId]
  }
  return MenuRegistry['default']
}
