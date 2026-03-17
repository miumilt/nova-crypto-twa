import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import Dashboard from './components/Dashboard'
import AssetList from './components/AssetList'
import SwapInterface from './components/SwapInterface'
import ProfileScreen from './components/ProfileScreen'
import './index.css'

type TabType = 'home' | 'market' | 'swap' | 'profile'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home')

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard key="dashboard" />
      case 'market':
        return <AssetList key="assetlist" />
      case 'swap':
        return <SwapInterface key="swap" />
      case 'profile':
        return <ProfileScreen key="profile" />
      default:
        return <Dashboard key="dashboard" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center">
      <div className="w-full max-w-[430px] bg-slate-950 relative overflow-hidden safe-area">
        {/* Status Bar Spacer */}
        <div className="h-8" />

        {/* Main Content */}
        <div className="h-[calc(100vh-8rem)] overflow-hidden">
          <AnimatePresence mode="wait">
            {renderScreen()}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default App
