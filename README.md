<div align="center">

# 🎵 Music-player

**Modern music streaming app built with React Native & Expo**

[![React Native](https://img.shields.io/badge/React_Native-0.79-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

## ✨ Features

🎧 Live streaming · 🔒 Auth · ⏭️ Queue & controls · 🔍 Search · 📱 Mini player · 🔄 Background play

---

## 🛠 Stack

| | |
|---|---|
| Mobile | React Native + Expo SDK 54 |
| Language | TypeScript |
| Auth | Supabase |
| State | Zustand |
| Audio | expo-av |
| Music | Jamendo API |
| Navigation | Expo Router |

---

## 🚀 Getting Started
```bash
git clone https://github.com/Arnel-rah/my-music-player
cd my-music-player
pnpm install
cp .env.example .env
pnpm expo start
```

**.env**
```env
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
EXPO_PUBLIC_JAMENDO_CLIENT_ID=your_id
```

---

## 🗂 Structure
```
app/
├── (auth)/     # launch, login, signup
├── (tabs)/     # home, explore, library
components/     # PlayerModal, ThemedText
hooks/          # useAudioPlayer, useJamendo
services/       # jamendo.ts, supabase.ts
store/          # useAuthStore.ts
```

---

## 📄 License

MIT © [Arnel-rah](https://github.com/Arnel-rah)

<div align="center">Made with ❤️ and React Native</div>