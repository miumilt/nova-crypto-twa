import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Download, Plus, History, TrendingUp, X, Copy, Check, QrCode, Wallet, ArrowRightLeft } from 'lucide-react'

type ActionModal = 'send' | 'receive' | 'buy' | 'history' | null

const actionButtons = [
  { id: 'send', icon: Send, label: 'Send', color: 'from-cyan-500 to-blue-500' },
  { id: 'receive', icon: Download, label: 'Receive', color: 'from-purple-500 to-pink-500' },
  { id: 'buy', icon: Plus, label: 'Buy', color: 'from-emerald-500 to-teal-500' },
  { id: 'history', icon: History, label: 'History', color: 'from-orange-500 to-red-500' },
]

// Mock chart data - smooth upward curve
const chartData = [
  0, 5, 3, 8, 6, 12, 9, 15, 11, 18, 14, 22, 17, 25, 20, 28, 24, 32, 28, 35
]

// Mock transaction history
const mockTransactions = [
  { id: 1, type: 'received', amount: '50.00 USDT', from: '0x1234...5678', time: '2 hours ago' },
  { id: 2, type: 'sent', amount: '25.50 TON', to: '0xabcd...efgh', time: '5 hours ago' },
  { id: 3, type: 'swap', amount: '0.1 BTC → 6.5 ETH', time: '1 day ago' },
  { id: 4, type: 'received', amount: '100.00 USDT', from: '0x9999...8888', time: '2 days ago' },
  { id: 5, type: 'sent', amount: '500.00 USDT', to: '0x7777...6666', time: '3 days ago' },
]

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<ActionModal>(null)
  const [sendAmount, setSendAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [copied, setCopied] = useState(false)
  const [sendStep, setSendStep] = useState<'input' | 'confirm' | 'success'>('input')
  const [buyStep, setBuyStep] = useState<'input' | 'processing' | 'success'>('input')

  const walletAddress = 'EQC1234567890abcdefghijklmnopqrstuvwxyz'

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = () => {
    if (sendStep === 'input') {
      setSendStep('confirm')
    } else if (sendStep === 'confirm') {
      setSendStep('success')
      setTimeout(() => {
        setSendStep('input')
        setSendAmount('')
        setActiveModal(null)
      }, 2000)
    }
  }

  const handleBuy = () => {
    if (buyStep === 'input') {
      setBuyStep('processing')
      setTimeout(() => {
        setBuyStep('success')
        setTimeout(() => {
          setBuyStep('input')
          setBuyAmount('')
          setActiveModal(null)
        }, 2000)
      }, 2000)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSendStep('input')
    setBuyStep('input')
    setSendAmount('')
    setReceiveAmount('')
    setBuyAmount('')
  }

  // Create SVG path for the chart
  const width = 320
  const height = 120
  const maxVal = Math.max(...chartData)
  const minVal = Math.min(...chartData)
  const range = maxVal - minVal

  const points = chartData.map((val, i) => ({
    x: (i / (chartData.length - 1)) * width,
    y: height - ((val - minVal) / range) * height,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="px-4 py-4 space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants}>
            <p className="text-slate-400 text-sm">Total Balance</p>
          </motion.div>

          {/* Balance */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              $24,532.<span className="text-3xl">89</span>
            </h1>
            <div className="flex items-center gap-1 mt-2 text-emerald-400">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+12.5%</span>
              <span className="text-slate-500 text-sm">this month</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between gap-3"
          >
            {actionButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <motion.button
                  key={btn.id}
                  onClick={() => setActiveModal(btn.id as ActionModal)}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${btn.color} p-[1px]`}
                  >
                    <div className="w-full h-full bg-slate-900/90 rounded-2xl flex items-center justify-center">
                      <Icon size={22} className="text-white" />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{btn.label}</span>
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Mock Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Glassmorphism Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Portfolio growth</h3>
              <span className="text-xs text-slate-400">Last 30 days</span>
            </div>

            {/* SVG Chart */}
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-28"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <motion.path
                d={areaPath}
                fill="url(#chartGradient)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              {/* Line */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              {/* Glow Effect at the end */}
              <motion.circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="4"
                fill="#22d3ee"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { label: '24h Volume', value: '$1.2M', change: '+5.2%' },
            { label: 'Active Positions', value: '8', change: '+2' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
            >
              <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
              <p className="text-white text-xl font-bold">{stat.value}</p>
              <p className="text-emerald-400 text-xs">{stat.change}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[430px] mx-auto bg-slate-900 rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  {activeModal === 'send' && 'Send'}
                  {activeModal === 'receive' && 'Receive'}
                  {activeModal === 'buy' && 'Buy Crypto'}
                  {activeModal === 'history' && 'History'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Send Modal Content */}
              {activeModal === 'send' && (
                <div className="space-y-4">
                  {sendStep === 'input' && (
                    <>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <label className="text-slate-400 text-sm">Recipient Address</label>
                        <input
                          type="text"
                          placeholder="Enter wallet address"
                          className="w-full bg-transparent text-white outline-none mt-1"
                        />
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <label className="text-slate-400 text-sm">Amount (TON)</label>
                        <input
                          type="number"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full bg-transparent text-white text-2xl font-bold outline-none mt-1"
                        />
                      </div>
                      <button
                        onClick={handleSend}
                        disabled={!sendAmount}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white disabled:opacity-50"
                      >
                        Continue
                      </button>
                    </>
                  )}
                  {sendStep === 'confirm' && (
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                        <p className="text-slate-400 text-sm mb-2">You are sending</p>
                        <p className="text-3xl font-bold text-white">{sendAmount} TON</p>
                        <p className="text-slate-400 text-sm mt-2">to 0x1234...5678</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSendStep('input')}
                          className="flex-1 py-4 bg-white/10 rounded-2xl font-bold text-white"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleSend}
                          className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                  {sendStep === 'success' && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-white" />
                      </div>
                      <p className="text-xl font-bold text-white">Transaction Sent!</p>
                      <p className="text-slate-400 text-sm mt-2">Your transaction is being processed</p>
                    </div>
                  )}
                </div>
              )}

              {/* Receive Modal Content */}
              {activeModal === 'receive' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-3xl p-4">
                    {/* QR Code Placeholder */}
                    <div className="w-48 h-48 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center">
                      <QrCode size={80} className="text-slate-700" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <label className="text-slate-400 text-sm">Your Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-white text-sm flex-1 truncate">{walletAddress}</p>
                      <button
                        onClick={copyAddress}
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-slate-400" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-center text-slate-400 text-sm">Scan to receive TON and other tokens</p>
                </div>
              )}

              {/* Buy Modal Content */}
              {activeModal === 'buy' && (
                <div className="space-y-4">
                  {buyStep === 'input' && (
                    <>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <label className="text-slate-400 text-sm">You Pay</label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-white">$</span>
                          <input
                            type="number"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent text-white text-2xl font-bold outline-none flex-1"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <ArrowRightLeft size={20} className="text-slate-400" />
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <label className="text-slate-400 text-sm">You Receive (TON)</label>
                        <p className="text-2xl font-bold text-white mt-1">
                          {buyAmount ? (parseFloat(buyAmount) / 5.42).toFixed(4) : '0.0000'}
                        </p>
                      </div>
                      <button
                        onClick={handleBuy}
                        disabled={!buyAmount}
                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl font-bold text-white disabled:opacity-50"
                      >
                        Buy Now
                      </button>
                    </>
                  )}
                  {buyStep === 'processing' && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-xl font-bold text-white">Processing...</p>
                      <p className="text-slate-400 text-sm mt-2">Please wait while we process your order</p>
                    </div>
                  )}
                  {buyStep === 'success' && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-white" />
                      </div>
                      <p className="text-xl font-bold text-white">Purchase Complete!</p>
                      <p className="text-slate-400 text-sm mt-2">Your crypto has been added to your wallet</p>
                    </div>
                  )}
                </div>
              )}

              {/* History Modal Content */}
              {activeModal === 'history' && (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {mockTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'received' ? 'bg-emerald-500/20' :
                          tx.type === 'sent' ? 'bg-rose-500/20' : 'bg-purple-500/20'
                        }`}>
                          {tx.type === 'received' && <Download size={18} className="text-emerald-400" />}
                          {tx.type === 'sent' && <Send size={18} className="text-rose-400" />}
                          {tx.type === 'swap' && <ArrowRightLeft size={18} className="text-purple-400" />}
                        </div>
                        <div>
                          <p className="text-white font-medium capitalize">{tx.type}</p>
                          <p className="text-slate-400 text-xs">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          tx.type === 'received' ? 'text-emerald-400' : 'text-white'
                        }`}>
                          {tx.type === 'received' ? '+' : tx.type === 'sent' ? '-' : ''}{tx.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
