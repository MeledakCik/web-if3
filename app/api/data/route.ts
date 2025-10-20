import { NextResponse } from 'next/server'

import { NavLinkType } from '@/app/types/navlink'
import { FooterLinkType } from '@/app/types/footerlinks'

const NavLinkData: NavLinkType[] = [
  {
    label: 'Dashboard',
    href: '/#dashboard',
  },
  {
    label: 'About Us',
    href: '/#tentang',
  },
  {
    label: 'Talent Interest',
    href: '/#talent',
  },
  {
    label: 'Categories',
    href: '/#categories',
  },
]
export const GET = () => {
  return NextResponse.json({
    NavLinkData,
  })
}
