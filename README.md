# Nova Crypto TWA

A premium, highly interactive Crypto Exchange / Wallet Dashboard designed for Telegram Mini Apps (TWA). Built with smooth animations and a stunning glassmorphism design, perfect for portfolio showcase.

<p align="center">
  <img src="trc1.gif" width="400"> <img src="trc2.gif" width="400">
</p>

## Features

### Main Layout & Navigation
- Fixed bottom navigation bar with 4 tabs: Home, Market, Swap, Profile
- Smooth fade and slide screen transitions using Framer Motion
- Bouncing spring animation on active tab icons
- Glowing indicator dots for active navigation items

### Dashboard Screen
- Large, glowing total balance display ($24,532.89)
- Four quick action buttons: Send, Receive, Buy, History
- Interactive mock area chart with gradient fill simulating portfolio growth
- Real-time quick stats cards

### Live Asset List
- Scrollable list of cryptocurrencies (TON, BTC, ETH, SOL, USDT)
- Real-time price simulation with color flash animations
- Staggered entrance animations on screen load
- Live 24h change indicators

### Advanced Swap Interface
- Two large input cards for "You Pay" and "You Receive"
- 180-degree rotating swap button animation
- Three-step transaction flow: Input → Processing → Success
- Animated gradient confirm button with loading states

### Action Button Modals
- **Send**: Two-step send flow with confirmation
- **Receive**: QR code display with copy-to-clipboard address
- **Buy**: Real-time USD to TON conversion calculator
- **History**: Transaction history with type indicators

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
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

## Project Structure

```
src/
├── App.tsx                 # Main application container
├── index.css              # Global styles and Tailwind
├── main.tsx              # React entry point
├── components/
│   ├── BottomNav.tsx      # Animated bottom navigation
│   ├── Dashboard.tsx      # Home screen with balance & actions
│   ├── AssetList.tsx      # Market screen with live prices
│   ├── SwapInterface.tsx  # Token swap interface
│   └── ProfileScreen.tsx  # User profile screen
├── hooks/
│   └── use-mobile.tsx    # Mobile detection hook
└── lib/
    └── utils.ts          # Utility functions
```

## Design System

### Color Palette
- **Background**: Deep Slate (`bg-slate-950`)
- **Primary Accent**: Neon Cyan (`#22d3ee`)
- **Secondary Accent**: Electric Purple (`#a855f7`)
- **Positive**: Emerald Green (`#10b981`)
- **Negative**: Rose Red (`#f43f5e`)

### UI Elements
- Glassmorphism with `backdrop-blur-xl`
- Semi-transparent backgrounds (`bg-white/5`)
- Gradient borders and buttons
- Mobile-first design with safe area support

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## Deployment

The app is optimized for Telegram Mini App deployment. To deploy:

1. Build the project: `pnpm build`
2. Upload the `dist/` folder to your hosting
3. Configure Telegram Bot Web App URL

## License

MIT License - feel free to use this project for your own portfolio or Telegram Mini App.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
