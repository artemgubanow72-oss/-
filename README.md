# SHERSTON B2B Platform

> Оптовая B2B платформа производителя шерстяных носков бренда **SHERSTON**.
> Рассказово, Тамбовская область — 20 лет на рынке.

---

## 🌐 Сайт

- **Production:** [tan-phi-43.vercel.app](https://tan-phi-43.vercel.app)
- **Будущий домен:** sherston.ru

---

## ⚡ Технологический стек

| Слой | Технология |
|------|-----------|
| Framework | Next.js 14.2 (App Router) |
| UI | React 18.3 + TypeScript |
| Стили | Tailwind CSS 3.4 |
| Анимации | Framer Motion 11 |
| Скролл | Lenis 1.1 (smooth scroll) |
| Анимации скролла | GSAP 3.12 + ScrollTrigger |
| Деплой | Vercel (auto CI/CD) |
| Репозиторий | GitHub |

---

## 🚀 Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/artemgubanow72-oss/-.git
cd -

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev
# → http://localhost:3000

# Сборка для продакшена
npm run build
npm run start
```

---

## 📁 Структура проекта

```
sherston/
├── app/                     # Next.js App Router
│   ├── page.tsx             # Главная страница
│   ├── layout.tsx           # Root layout + Lenis
│   ├── globals.css          # Глобальные стили
│   ├── about/page.tsx       # О компании
│   ├── catalog/page.tsx     # Каталог носков
│   ├── custom/page.tsx      # Конструктор (web)
│   ├── constructor/page.tsx # Конструктор (alt)
│   ├── b2b/dealer/page.tsx  # Стать дилером
│   ├── contact/page.tsx     # Контакты
│   ├── sitemap.ts           # Карта сайта
│   ├── robots.ts            # SEO robots
│   └── api/
│       └── stats/route.ts   # API статистики
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Навигация
│   │   └── Footer.tsx       # Футер
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx  # Lenis + GSAP
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── CatalogPreview.tsx
│   │   ├── B2BSection.tsx
│   │   ├── ROISection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   └── AnimatedCounter.tsx  # Анимированный счётчик
│
├── data/
│   ├── catalog.ts           # Каталог продуктов (60 SKU)
│   └── stats.ts             # Статистика компании
│
├── public/
│   └── manifest.json        # PWA манифест
│
├── .npmrc                   # legacy-peer-deps=true
├── .env.local               # Переменные окружения
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🔑 Переменные окружения

Создайте `.env.local` в корне:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SHERSTON
NEXT_PUBLIC_APP_VERSION=1.0.0

# Заполнить после регистрации:
NEXT_PUBLIC_YM_ID=           # Яндекс.Метрика
NEXT_PUBLIC_GA_ID=           # Google Analytics
TELEGRAM_BOT_TOKEN=          # @BotFather
MANAGER_TELEGRAM_ID=         # ID менеджера
```

---

## 📄 Страницы

| URL | Описание |
|-----|---------|
| `/` | Главная — Hero, Каталог, B2B, ROI |
| `/catalog` | Полный каталог 60+ SKU с фильтрами |
| `/custom` | Конструктор носков с drag&drop |
| `/constructor` | Альтернативная страница конструктора |
| `/b2b/dealer` | Стать дилером — форма заявки |
| `/about` | О компании, история, реквизиты |
| `/contact` | Контакты и форма обращения |
| `/sitemap.xml` | Карта сайта для SEO |

---

## 🎨 Дизайн-система

```
Цвета:
  Primary:    #E94560  (Wool Red)
  Secondary:  #F5A623  (Wool Gold)
  Dark bg:    #060608
  Navy:       #1A1A2E

Шрифты:
  Inter (100–900) — всё

Анимации:
  Framer Motion — компонентные
  GSAP ScrollTrigger — scroll-based
  Lenis — smooth scroll
```

---

## 🏗️ Архитектор

**AI Architect A-01** — главный AI руководитель проекта.

Разработка: 50 AI-агентов, май 2026.
