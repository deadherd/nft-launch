export interface RouteEntry {
  path: string
  bodyClass: string
  locationId?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  xpReward?: number
  audio?: string
  menuId?: string
}

export interface MenuItem {
  icon: string
  title: string
  link: string
  className?: string
}
