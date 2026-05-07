import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Masthead />
      {children}
      <Footer />
      <ThemeSwitcher />
    </>
  )
}
