import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'

export default function AppShell() {
  const location = useLocation()
  const isChatPage = location.pathname === '/chat'

  return (
    <div
      className={`flex flex-col ${
        isChatPage ? 'h-[100dvh] overflow-hidden' : 'min-h-[100dvh]'
      }`}
    >
      <Header />
      <main className={`flex-1 ${isChatPage ? 'flex flex-col overflow-hidden' : ''}`}>
        <Outlet />
      </main>
      {!isChatPage && <Footer />}
    </div>
  )
}
