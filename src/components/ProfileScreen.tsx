import { motion } from 'framer-motion'
import { Settings, Shield, HelpCircle, LogOut, Bell, Wallet, CreditCard, QrCode } from 'lucide-react'

const menuItems = [
  { icon: Wallet, label: 'My Wallet', value: '0x1234...5678' },
  { icon: CreditCard, label: 'Payment Methods', value: '3 cards' },
  { icon: QrCode, label: 'QR Code', value: '' },
  { icon: Bell, label: 'Notifications', value: 'On' },
  { icon: Shield, label: 'Security', value: '2FA Enabled' },
  { icon: HelpCircle, label: 'Help & Support', value: '' },
]

export default function ProfileScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-4"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-xl font-bold text-white">Profile</h2>
        <p className="text-slate-400 text-sm">Manage your account</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6"
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
            A
          </div>

          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">Alex Trader</h3>
            <p className="text-slate-400 text-sm">alex@email.com</p>
            <p className="text-cyan-400 text-xs mt-1">Premium Member</p>
          </div>

          <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <Settings size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          {[
            { label: 'Trades', value: '247' },
            { label: 'Volume', value: '$1.2M' },
            { label: 'Referrals', value: '12' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white font-bold">{stat.value}</p>
              <p className="text-slate-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.label}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 flex items-center justify-between hover:border-cyan-400/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon size={20} className="text-cyan-400" />
                </div>
                <span className="text-white font-medium">{item.label}</span>
              </div>
              {item.value && (
                <span className="text-slate-400 text-sm">{item.value}</span>
              )}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Logout Button */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-rose-500/10 rounded-2xl p-4 border border-rose-500/30 flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-colors"
      >
        <LogOut size={20} className="text-rose-400" />
        <span className="text-rose-400 font-medium">Log Out</span>
      </motion.button>

      {/* App Version */}
      <p className="text-center text-slate-500 text-xs mt-6">
        Nova Crypto v1.0.0
      </p>
    </motion.div>
  )
}
