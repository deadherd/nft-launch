import type { MenuItem } from '@/types/Route'

export const MenuRegistry: Record<string, MenuItem[]> = {
  default: [
    { icon: 'buildings_128.png', title: 'New Yolk', link: '/', className: 'new-yolk' },
    { icon: 'icon_egg-threader.svg', title: 'Stash', link: '/sunnyside/stash', className: 'stash' },
    { icon: 'radiation_128.png', title: 'Sunnyside', link: '/sunnyside', className: 'sunnyside' },
  ],
  settings: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/sunnyside', className: 'exit' }],
}

export function getMenuItems(menuId?: string): MenuItem[] {
  if (menuId && MenuRegistry[menuId]) {
    return MenuRegistry[menuId]
  }
  return MenuRegistry['default']
}
