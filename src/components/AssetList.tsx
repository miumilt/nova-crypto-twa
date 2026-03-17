import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Coin data interface
interface CoinData {
  id: string
  symbol: string
  name: string
  amount: number
  price: number
  change24h: number
  icon: string
}

// Initial coin data
const initialCoins: CoinData[] = [
  { id: 'ton', symbol: 'TON', name: 'Toncoin', amount: 125.5, price: 5.42, change24h: 5.4, icon: '🔶' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', amount: 0.25, price: 67234.50, change24h: 2.1, icon: '₿' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', amount: 3.2, price: 3456.78, change24h: -1.2, icon: 'Ξ' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', amount: 28.5, price: 178.90, change24h: 8.7, icon: '◎' },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', amount: 5000, price: 1.00, change24h: 0.01, icon: '₮' },
]

export default function AssetList() {
  const [coins, setCoins] = useState<CoinData[]>(initialCoins)
  const [flashingId, setFlashingId] = useState<string | null>(null)
  const [flashColor, setFlashColor] = useState<'up' | 'down' | null>(null)

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) => {
        // Randomly select a coin to update
        const randomIndex = Math.floor(Math.random() * prevCoins.length)
        const coin = { ...prevCoins[randomIndex] }

        // Generate random change between -0.5% and +0.5%
        const changePercent = (Math.random() - 0.5) * 1
        const oldChange = coin.change24h
        const newChange = Number((oldChange + changePercent).toFixed(2))

        // Determine flash color based on whether the change went up or down
        const wentUp = changePercent > 0

        // Update the coin
        const newCoins = [...prevCoins]
        newCoins[randomIndex] = {
          ...coin,
          change24h: newChange,
        }

        // Trigger flash animation
        setFlashingId(coin.id)
        setFlashColor(wentUp ? 'up' : 'down')

        // Clear flash after animation
        setTimeout(() => {
          setFlashingId(null)
          setFlashColor(null)
        }, 500)

        return newCoins
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Market</h2>
          <p className="text-slate-400 text-sm">Live prices</p>
        </div>
        <div className="bg-cyan-400/10 px-3 py-1.5 rounded-full">
          <span className="text-cyan-400 text-xs font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Coin List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {coins.map((coin) => {
          const fiatValue = (coin.amount * coin.price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })

          const isPositive = coin.change24h >= 0

          return (
            <motion.div
              key={coin.id}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Left - Coin Info */}
                <div className="flex items-center gap-3">
                  {/* Coin Icon */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-xl">
                    {coin.icon}
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">{coin.symbol}</h3>
                    <p className="text-slate-400 text-xs">{coin.name}</p>
                  </div>
                </div>

                {/* Right - Value & Change */}
                <div className="text-right">
                  {/* Fiat Value */}
                  <p className="text-white font-semibold">{fiatValue}</p>

                  {/* Amount & Change */}
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-slate-400 text-xs">
                      {coin.amount.toLocaleString()} {coin.symbol}
                    </span>

                    {/* Live Change Indicator with Flash */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={coin.id + coin.change24h}
                        initial={{
                          backgroundColor: flashColor === 'up' ? 'rgba(16, 185, 129, 0.3)' : flashColor === 'down' ? 'rgba(244, 63, 94, 0.3)' : 'transparent',
                          color: flashColor === 'up' ? '#10b981' : flashColor === 'down' ? '#f43f5e' : isPositive ? '#10b981' : '#f43f5e',
                        }}
                        animate={{
                          backgroundColor: 'transparent',
                          color: isPositive ? '#10b981' : '#f43f5e',
                        }}
                        exit={{
                          backgroundColor: 'transparent',
                        }}
                        transition={{ duration: 0.3 }}
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          isPositive ? 'text-emerald-400' : 'text-rose-500'
                        }`}
                      >
                        {isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Market Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-3 gap-3"
      >
        {[
          { label: 'Market Cap', value: '$2.4T' },
          { label: '24h Volume', value: '$89B' },
          { label: 'Dominance', value: 'BTC 52%' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-white/10 text-center"
          >
            <p className="text-slate-400 text-xs">{stat.label}</p>
            <p className="text-white font-semibold text-sm">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
