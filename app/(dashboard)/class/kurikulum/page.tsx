import Hero from '@/components/Home/Hero'
import Pricing from '@/components/Home/Pricing'
import Project from '@/components/Home/Project'

export default function Home() {
    return (
        <main className='bg-gray-900'>
            <Hero />
            <Project />
            <Pricing />
        </main>
    )
}
