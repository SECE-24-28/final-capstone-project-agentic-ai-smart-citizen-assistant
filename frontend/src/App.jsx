import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AppShell from './components/layout/AppShell'
import { ChatProvider } from './context/ChatContext'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import HelpPage from './pages/HelpPage'

export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  )
}
