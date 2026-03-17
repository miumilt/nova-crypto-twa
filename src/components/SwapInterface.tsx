import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpDown, Loader2, Check, ChevronDown } from 'lucide-react'

interface Token {
  symbol: string
  name: string
  icon: string
  balance: string
}

const tokens: Token[] = [
  { symbol: 'TON', name: 'Toncoin', icon: '🔶', balance: '125.50' },
  { symbol: 'USDT', name: 'Tether', icon: '₮', balance: '5,000.00' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: '3.20' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', balance: '0.25' },
]

export default function SwapInterface() {
  const [payToken, setPayToken] = useState<Token>(tokens[0])
  const [receiveToken, setReceiveToken] = useState<Token>(tokens[1])
  const [payAmount, setPayAmount] = useState('100')
  const [receiveAmount, setReceiveAmount] = useState('18.45')
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapSuccess, setSwapSuccess] = useState(false)
  const [isRotating, setIsRotating] = useState(false)

  const handleSwap = () => {
    setIsRotating(true)

    // Rotate animation
    setTimeout(() => {
      // Swap tokens
      const tempToken = payToken
      setPayToken(receiveToken)
      setReceiveToken(tempToken)

      // Swap amounts
      const tempAmount = payAmount
      setPayAmount(receiveAmount)
      setReceiveAmount(tempAmount)

      setIsRotating(false)
    }, 300)
  }

  const handleConfirmSwap = async () => {
    if (isSwapping || swapSuccess) return

    setIsSwapping(true)

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSwapping(false)
    setSwapSuccess(true)

    // Reset after showing success
    setTimeout(() => {
      setSwapSuccess(false)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        <h2 className="text-xl font-bold text-white">Swap</h2>
        <p className="text-slate-400 text-sm">Exchange tokens instantly</p>
      </motion.div>

      {/* Swap Interface */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Pay Card */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-sm">You Pay</span>
              <span className="text-slate-500 text-xs">
                Balance: {payToken.balance} {payToken.symbol}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Token Selector */}
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors">
                <span className="text-xl">{payToken.icon}</span>
                <span className="text-white font-semibold">{payToken.symbol}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              {/* Amount Input */}
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="flex-1 bg-transparent text-right text-2xl font-bold text-white outline-none"
                placeholder="0.00"
              />
            </div>
          </div>
        </motion.div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <motion.button
            onClick={handleSwap}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isRotating ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-[1px]"
          >
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <ArrowUpDown size={20} className="text-white" />
            </div>
          </motion.button>
        </div>

        {/* Receive Card */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-sm">You Receive</span>
              <span className="text-slate-500 text-xs">
                Balance: {receiveToken.balance} {receiveToken.symbol}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Token Selector */}
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors">
                <span className="text-xl">{receiveToken.icon}</span>
                <span className="text-white font-semibold">{receiveToken.symbol}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              {/* Amount Input */}
              <input
                type="number"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="flex-1 bg-transparent text-right text-2xl font-bold text-white outline-none"
                placeholder="0.00"
              />
            </div>
          </div>
        </motion.div>

        {/* Exchange Rate */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-slate-400 text-sm">
            1 {payToken.symbol} ≈ {receiveToken.symbol === 'USDT'
              ? (parseFloat(receiveAmount) / parseFloat(payAmount) || 0).toFixed(2)
              : (parseFloat(receiveAmount) / parseFloat(payAmount) || 0).toFixed(6)}{' '}
            {receiveToken.symbol}
          </p>
        </motion.div>

        {/* Confirm Swap Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={handleConfirmSwap}
            disabled={isSwapping || swapSuccess}
            whileTap={!isSwapping && !swapSuccess ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 overflow-hidden transition-all ${
              swapSuccess
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient'
            }`}
          >
            <AnimatePresence mode="wait">
              {isSwapping ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Loader2 className="animate-spin" size={24} />
                </motion.div>
              ) : swapSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={24} />
                  <span>Transaction Successful</span>
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Confirm Swap
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Swap Details */}
        <motion.div variants={itemVariants} className="space-y-2">
          {[
            { label: 'Network Fee', value: '~0.5 USDT' },
            { label: 'Slippage Tolerance', value: '0.5%' },
            { label: 'Exchange', value: 'Ston.fi' },
          ].map((detail) => (
            <div
              key={detail.label}
              className="flex justify-between text-sm"
            >
              <span className="text-slate-400">{detail.label}</span>
              <span className="text-white">{detail.value}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
