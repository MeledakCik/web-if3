"use client"

import { Icon } from "@iconify/react"

const features = [
  {
    icon: "mdi:account-school",
    title: "Kelas Informatika 3",
    description: "Kelas yang solid dan penuh semangat dalam dunia teknologi informasi.",
  },
  {
    icon: "mdi:laptop",
    title: "Praktikum & Proyek Nyata",
    description: "Belajar melalui implementasi nyata: coding, analisis sistem, dan proyek tim.",
  },
  {
    icon: "mdi:calendar-clock",
    title: "Jadwal",
    description: "Jadwal Materi Kuliah Anak Informatika 3",
  },
  {
    icon: "mdi:account-group",
    title: "Kolaborasi Mahasiswa",
    description: "Kerjasama antar mahasiswa melalui forum, tugas kelompok, dan riset mini.",
  },
  {
    icon: "mdi:book-open-page-variant",
    title: "Materi Terintegrasi",
    description: "Akses semua materi, catatan kuliah, dan tugas dalam satu portal terpusat.",
  },
  {
    icon: "mdi:medal-outline",
    title: "Prestasi & Progres",
    description: "Prestasi anak kelas Informatika 3 dan juga progres perkembangan kelas Informatika 3.",
  },
]

export default function TentangInformatika3() {
  return (
    <section
      id="tentang"
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-300/10 to-pink-200/10 blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Tentang{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Class Informatika 3
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Kami adalah komunitas mahasiswa Informatika yang berfokus pada pembelajaran kolaboratif, inovasi digital, dan eksplorasi teknologi terkini.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300"
            >
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-xl shadow-md">
                <Icon
                  icon={feature.icon}
                  className="text-white"
                  width="32"
                  height="32"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
