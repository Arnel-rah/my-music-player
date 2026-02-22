<div align="center">

# 🎵 Musium

**A modern, fluid music streaming experience built with React Native & Expo**

[![React Native](https://img.shields.io/badge/React_Native-0.79-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

[Features](#-features) · [Screenshots](#-screenshots) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Architecture](#-architecture)

</div>

---

## ✨ Features

- 🎧 **Live Streaming** — Instant playback via Jamendo API with real artist content
- 🔒 **Auth** — Secure login & signup powered by Supabase
- ⏭️ **Full Player Controls** — Play, pause, skip, seek, shuffle & repeat
- 📋 **Queue Management** — View and navigate your listening queue
- 🎨 **Modern Dark UI** — Glassmorphism, gradients and smooth animations
- 🔍 **Explore & Search** — Browse by genre, trending charts and new releases
- 📚 **Library** — Manage your saved tracks and playlists
- 🔄 **Background Play** — Music continues while the screen is off
- 📱 **Mini Player** — Persistent controls with prev/next/play throughout the app
- ↕️ **Pull to Refresh** — Fresh content on demand

---


## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Language | TypeScript |
| Navigation | Expo Router (file-based) |
| Auth & DB | Supabase |
| State | Zustand |
| Audio | expo-av |
| Music API | Jamendo API |
| Animations | React Native Reanimated |
| Styling | StyleSheet + NativeWind |
| Package Manager | pnpm |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Expo Go app or Android/iOS simulator
- Supabase account
- Jamendo API client ID

### Installation
```bash
# Clone the repo
git https://github.com/Arnel-rah/my-music-player
cd my-music-player

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
```

Edit `.env` with your credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_JAMENDO_CLIENT_ID=your_client_id
```

### Run
```bash
# Start development server
pnpm expo start

# Android
pnpm expo start --android

# iOS
pnpm expo start --ios
```

---

## 🗂 Architecture
```
musium/
├── app/
│   ├── (auth)/
│   │   ├── launch.tsx        # Welcome screen
│   │   ├── login.tsx         # Login screen
│   │   └── signup.tsx        # Signup screen
│   ├── (tabs)/
│   │   ├── home.tsx          # Home feed
│   │   ├── explore.tsx       # Search & browse
│   │   └── library.tsx       # User library
│   ├── _layout.tsx           # Root layout
│   └── index.tsx             # Entry point
├── components/
│   ├── PlayerModal.tsx       # Full-screen player
│   └── ui/
│       └── ThemedText.tsx
├── hooks/
│   ├── useAudioPlayer.ts     # Audio engine + queue
│   └── useJamendo.ts         # Data fetching hook
├── services/
│   ├── jamendo.ts            # Jamendo API client
│   └── supabase.ts           # Supabase client
├── store/
│   └── useAuthStore.ts       # Auth state (Zustand)
└── assets/
    └── fonts/
```

---

## 🔌 API

Musium uses the **[Jamendo API](https://developer.jamendo.com)** — a free and open music platform with 600,000+ Creative Commons tracks.
```
GET /tracks    → Featured, trending, genre-based tracks
GET /albums    → New releases
GET /search    → Full-text search
```

Get your free API key at [devportal.jamendo.com](https://devportal.jamendo.com).

---

## 🔐 Authentication

Auth is handled by **Supabase** with:
- Email/password sign up & sign in
- Persistent sessions via AsyncStorage
- Auto token refresh

---

## 🤝 Contributing
```bash
# Create a branch
git checkout -b feat/your-feature

# Commit
git commit -m "feat: add your feature"

# Push & open a PR
git push origin feat/your-feature
```

---

## 📄 License

MIT © [Arnel-rah](https://github.com/Arnel-rah)

---

<div align="center">
  Made with ❤️ and React Native
</div>
