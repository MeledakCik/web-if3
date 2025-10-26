'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import { NavLinkType } from '@/app/types/navlink'
import { Icon } from '@iconify/react'

const Header: React.FC = () => {
  const [navlink, setNavlink] = useState<NavLinkType[]>([])
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setNavlink(data.NavLinkData)
      } catch (error) {
        console.error('Error fetching service', error)
      }
    }
    fetchData()
  }, [])

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${sticky
        ? 'bg-white/90 backdrop-blur-md shadow-md text-gray-900'
        : 'bg-white/90 backdrop-blur-md shadow-md text-gray-900'
        }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-6 lg:px-12 ${sticky ? 'py-3' : 'py-4'
          } transition-all duration-300`}
      >
        <Link href="/" className="font-bold text-xl tracking-wide">
          <span
            className={`${sticky
              ? 'text-blue-600'
              : 'text-blue-600'
              }`}
          >
            INFORMATIKA-3
          </span>{' '}
          <span className="font-light">Dashboard</span>
        </Link>

        {/* Navlink Desktop */}
        <nav>
          <ul
            className={`hidden xl:flex items-center gap-8 ${sticky ? 'text-gray-700' : 'text-white'
              }`}
          >
            {navlink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </ul>
        </nav>

        {/* Tombol kanan */}
        <div className="flex items-center gap-4">
          <Link
            href="/class/aib"
            className={`hidden xl:block px-5 py-2 rounded-lg font-semibold border transition-all duration-300 ${sticky
              ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              : 'border-blue-400 text-blue-800 hover:bg-white hover:text-blue-600'
              }`}
          >
            Masuk
          </Link>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="block xl:hidden p-2 rounded-lg hover:bg-white/10"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 ${sticky ? 'bg-gray-800' : 'bg-white'
                }`}
            ></span>
            <span
              className={`block w-6 h-0.5 mt-1.5 ${sticky ? 'bg-gray-800' : 'bg-white'
                }`}
            ></span>
            <span
              className={`block w-6 h-0.5 mt-1.5 ${sticky ? 'bg-gray-800' : 'bg-white'
                }`}
            ></span>
          </button>
        </div>
      </div>

      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-40" />
      )}

      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-full xl:hidden text-blue-900 shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50 bg-gradient-to-b from-white to-blue-50`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold tracking-wide">
            Menu Navigasi
          </span>
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label="Close mobile menu"
          >
            <Icon
              icon="solar:close-circle-linear"
              width={26}
              height={26}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            />

          </button>
        </div>
        <nav className="flex flex-col items-start p-4 gap-4 bg-white">
          {navlink.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className="mt-6 w-full">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-500 text-blue-900 border border-gray-200 focus:border-blue-400 outline-none backdrop-blur-sm"
            />
          </div>
          <Link
            href="/class/aib"
            className="hidden xl:block px-5 py-2 rounded-lg font-semibold border transition-all duration-300 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => setNavbarOpen(false)}
          >
            Masuk
          </Link>
          <Link
            href="/#contact"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 w-full text-center shadow-sm"
            onClick={() => setNavbarOpen(false)}
          >
            Contact Us
          </Link>

        </nav>
      </div>
    </header>
  )
}

export default Header
