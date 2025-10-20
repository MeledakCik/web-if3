"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Code2,
  Users,
  CalendarDays,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Laptop,
  MessageSquare,
} from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Hero = () => {
  return (
    <section id="dashboard" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-300/20 to-pink-200/20 blur-3xl opacity-70 animate-pulse"></div>
      <div className="container mx-auto px-6 lg:px-16 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 max-w-2xl p-6">
          <GraduationCap className="absolute -top-10 -left-10 text-blue-400 opacity-20 w-28 h-28 animate-spin-slow" />
          <Laptop className="absolute top-20 -right-14 text-green-400 opacity-10 w-32 h-32 animate-pulse" />
          <h1 className="font-extrabold leading-tight text-[clamp(2rem,5vw,3.5rem)] text-gray-900">
            Welcome To{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Class Informatika III
            </span>{" "}
            👩‍💻
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl">
            Portal interaktif untuk{" "}
            <span className="font-semibold text-blue-500">Informatika 3</span> — akses materi, tugas, jadwal kuliah, dan progres belajar dalam satu tempat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dashboard">
              <button className="px-10 py-3 text-lg font-semibold rounded-xl shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-300 hover:scale-105">
                Masuk Dashboard
              </button>
            </Link>
            <Link href="/tugas">
              <button className="px-10 py-3 text-lg font-semibold rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-transform duration-300 hover:scale-105">
                Lihat Tugas
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            🎓 Dikelola oleh Mahasiswa Informatika • Semester Ganjil 2025
          </p>
        </div>
      </div>
      <Users className="absolute bottom-20 left-[10%] text-blue-400 opacity-15 w-16 h-16 animate-bounce" />
      <BookOpen className="absolute bottom-10 right-[25%] text-yellow-400 opacity-20 w-20 h-20 animate-pulse" />
      <ClipboardCheck className="absolute top-[15%] left-[35%] text-purple-400 opacity-10 w-24 h-24 animate-spin-slow" />
      <CalendarDays className="absolute top-[60%] right-10 text-pink-400 opacity-15 w-16 h-16 animate-bounce" />
      <MessageSquare className="absolute bottom-[25%] left-[45%] text-cyan-400 opacity-15 w-14 h-14 animate-pulse" />
      <Code2 className="absolute top-[75%] right-[15%] text-green-400 opacity-10 w-20 h-20 animate-spin-slow" />
      <div className="absolute top-10 -left-10 opacity-10">
        <Image src="/banner/pattern1.svg" alt="pattern 1" width={140} height={140} />
      </div>
      <div className="absolute bottom-0 left-[55%] opacity-10 z-10">
        <Image src="/banner/pattern2.svg" alt="pattern 2" width={140} height={140} />
      </div>
    </section>
  )
}

export default Hero
