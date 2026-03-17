# Nova Crypto TWA 🪙💎

<p align="center">
  <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
</p>

<p align="center">
  <b>A premium, highly interactive Crypto Exchange / Wallet Dashboard for Telegram Mini Apps.</b><br>
  <i>Stunning glassmorphism UI, fluid animations, and Web3-ready design — perfect for portfolio showcase.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Telegram%20Mini%20App-purple?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=flat-square" alt="Version">
</p>

---

## ✨ Features

### 🏠 Dashboard Screen
- **Glowing Balance Display** — Large $24,532.89 total with animated gradient text
- **Quick Action Buttons** — Send, Receive, Buy, History with tap scale animations
- **Portfolio Growth Chart** — SVG area chart with gradient fill and animated path drawing
- **Real-time Stats** — 24h volume and active positions cards

### 📊 Live Market Screen
- **Animated Asset List** — Staggered entrance animations for each coin row
- **Live Price Simulation** — Updates every 3 seconds with color flash effects
- **Price Change Indicators** — Green/red flash animations on value changes
- **Supported Assets** — TON, BTC, ETH, SOL, USDT

### 🔄 Advanced Swap Interface
- **Dual Input Cards** — "You Pay" and "You Receive" with smooth transitions
- **Rotating Swap Button** — 180° rotation animation on click
- **Three-State Confirm Button** — Idle → Loading (2s) → Success with checkmark
- **Exchange Rate Display** — Real-time conversion calculation

### 👤 Profile & Actions
- **Send Flow** — Two-step: Input → Confirm → Success with animations
- **Receive Screen** — QR code placeholder with copy-to-clipboard address
- **Buy Calculator** — USD to TON conversion with live preview
- **Transaction History** — Scrollable list with type indicators (sent/received/swap)

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| **Background** | `#020617` (slate-950) | Main screen backgrounds |
| **Primary** | `#22d3ee` (cyan-400) | Active states, accents, glows |
| **Secondary** | `#a855f7` (purple-500) | Gradients, secondary actions |
| **Positive** | `#10b981` (emerald-400) | Profit, success states |
| **Negative** | `#f43f5e` (rose-500) | Loss, error states |
| **Surface** | `white/5` | Glassmorphism cards |

### Typography
- **Headlines**: Bold, Slate-50
- **Body**: Normal weight, Slate-400
- **Numbers**: Tight tracking, tabular figures

### Animations
- **Easing**: `easeInOut` for smooth motion
- **Durations**: 300ms (transitions), 500ms (modals), 1500ms (charts)
- **Spring**: `type: 'spring', stiffness: 400, damping: 10` for nav items
- **Micro-interactions**: Scale pulses, color transitions, path drawing

---

## 🏗️ Architecture

```
nova-crypto-twa/
├── src/
│   ├── App.tsx                    # Main container with navigation state
│   ├── index.css                  # Global styles & Tailwind config
│   ├── main.tsx                  # React entry point
│   └── components/
│       ├── BottomNav.tsx         # Animated tab bar with spring effects
│       ├── Dashboard.tsx         # Home screen with balance & modals
│       ├── AssetList.tsx         # Market with live price simulation
│       ├── SwapInterface.tsx     # Token swap with 3-state button
│       └── ProfileScreen.tsx      # User profile & settings
```

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type-safe development |
| **Vite 6** | Fast build tooling |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion 12** | Complex animations & gestures |
| **Lucide React** | Icon library |
| **pnpm** | Fast package manager |

---

## 📱 Gif

<p align="center">
  <img src="trc1.gif" width="400"> <img src="trc2.gif" width="400">
</p>

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nova-crypto-twa.git
cd nova-crypto-twa

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory.

---

## 🎯 Key Implementation Highlights

### Animated Navigation with Spring

```tsx
<motion.div
  animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
  transition={{
    duration: 0.3,
    ease: 'easeInOut',
  }}
>
  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
</motion.div>
```

### Live Price Flash Animation

```tsx
<motion.span
  key={coin.id + coin.change24h}
  initial={{
    backgroundColor: flashColor === 'up' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)',
    color: flashColor === 'up' ? '#10b981' : '#f43f5e',
  }}
  animate={{
    backgroundColor: 'transparent',
    color: isPositive ? '#10b981' : '#f43f5e',
  }}
  transition={{ duration: 0.3 }}
>
  {isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%
</motion.span>
```

### Three-State Swap Button

```tsx
<AnimatePresence mode="wait">
  {isSwapping ? (
    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Loader2 className="animate-spin" />
    </motion.div>
  ) : swapSuccess ? (
    <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Check size={24} />
      <span>Transaction Successful</span>
    </motion.div>
  ) : (
    <motion.span key="idle">Confirm Swap</motion.span>
  )}
</AnimatePresence>
```

### SVG Chart with Path Animation

```tsx
<motion.path
  d={areaPath}
  fill="url(#chartGradient)"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, ease: 'easeInOut' }}
/>
```

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

---

## 🚀 Deployment

The app is optimized for Telegram Mini App deployment:

1. Build the project: `pnpm build`
2. Upload the `dist/` folder to your hosting
3. Configure Telegram Bot Web App URL in BotFather

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

```
MIT License

Copyright (c) 2024 Nova Crypto TWA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<p align="center">
  <b>Built with 💎 using React, Tailwind CSS, and Framer Motion</b><br>
  <i>Showcase-ready crypto wallet for Telegram Mini Apps</i>
</p>
