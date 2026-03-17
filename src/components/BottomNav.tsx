import { motion } from 'framer-motion'
import { Home, TrendingUp, RefreshCw, User } from 'lucide-react'

type TabType = 'home' | 'market' | 'swap' | 'profile'

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: 'home' as TabType, icon: Home, label: 'Home' },
  { id: 'market' as TabType, icon: TrendingUp, label: 'Market' },
  { id: 'swap' as TabType, icon: RefreshCw, label: 'Swap' },
  { id: 'profile' as TabType, icon: User, label: 'Profile' },
]

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
      {/* Glassmorphism Navigation Bar */}
      <div className="bg-slate-950/80 backdrop-blur-xl border-t border-white/10 px-4 py-2 pb-6">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center p-2"
                whileTap={{ scale: 0.9 }}
              >
                {/* Active Icon with Spring Animation */}
                <motion.div
                  animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-cyan-400/10 text-cyan-400'
                      : 'text-slate-500'
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-xs mt-1 transition-colors ${
                    isActive ? 'text-cyan-400 font-medium' : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Glowing Indicator Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute -bottom-1 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
                />
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
