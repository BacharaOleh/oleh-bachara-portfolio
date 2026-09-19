# PROJECT CONTEXT: oleh-bachara-portfolio (Web Developer for Product Platforms)

> **Версія проєкту:** `v0.1.0` (Осінь 2026 / Next.js Portfolio & Case Studies)  
> **Локація:** `/Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio`  
> **Головна мета:** Презентація комерційного досвіду розробки продуктових платформ, технічного SEO, WordPress/PHP та продуктових каталогів для Олега Бачари (член команди `czoDelat`).  
> **Зв'язок з екосистемою:** Інтегровано з `czoDelat` ([`team/roster.md`](../czoDelat/team/roster.md)).

---

## 1. Контекст та Позиціонування
- **Особа:** Олег Бачара (Oleh Bachara), Ярослав, Підкарпатське воєводство, Польща.
- **Головна посада:**
  - **EN:** Web Developer for Product Platforms & Technical Growth
  - **PL:** Web Developer — platformy produktowe i rozwój techniczny
- **Позиціонування:** Практичний web-розробник комерційних веб-платформ (WordPress/PHP, індивідуальні каталоги, технічне SEO, продуктивність Core Web Vitals / PageSpeed 90+, аналітика GA4/GSC). Уникати штучно завищених назв (наприклад, "Systems Architect") без підтвердження.

---

## 2. Технологічний Стек
- **Фреймворк:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Стилізація:** Tailwind CSS v4 + `@tailwindcss/postcss`
- **Анімації та UI:** Framer Motion, Lucide React, clsx, tailwind-merge
- **Утиліти:** PDFKit (генерація CV), Roboto fonts

---

## 3. Карта Модульної Архітектури

```text
📁 oleh-bachara-portfolio/
├── 📄 PROJECT_CONTEXT.md                  # Онтологія та інструкції системи для ШІ
├── 📄 OLEH_BACHARA_PROFILE_SOURCE_OF_TRUTH.md # Фактологічне першоджерело профілю (без вигадок)
├── 📄 PORTFOLIO_CONTENT_FOUNDATION.md     # Редакційний фундамент та структура сайту
├── 📄 README.md                           # Запуск та розгортання проєкту
├── 📄 package.json                        # Залежності та скрипти
├── 📄 generate-pdf.js                     # Генерація PDF-версії резюме
│
├── 📁 src/
│   ├── 📁 app/                            # Next.js App Router (сторінки та макети)
│   │   ├── 📄 layout.tsx                  # Базовий макет (шрифти, метадані)
│   │   ├── 📄 page.tsx                    # Головна сторінка (Hero, SelectedWork, About, Contact)
│   │   ├── 📄 globals.css                 # Стилі Tailwind v4
│   │   ├── 📁 api/                        # API routes
│   │   └── 📁 projects/                   # Сторінки окремих кейсів
│   │
│   ├── 📁 components/                     # Компоненти інтерфейсу
│   │   ├── 📄 Navbar.tsx                  # Навігація та перемикач мов (EN/PL)
│   │   ├── 📄 Hero.tsx                    # Головний екран
│   │   ├── 📄 SelectedWork.tsx            # Добірка ключових проектів/кейсів
│   │   ├── 📄 About.tsx                   # Блок "Про мене", освіта, стек
│   │   ├── 📄 Contact.tsx                 # Форма та канали зв'язку
│   │   ├── 📄 Footer.tsx                  # Футер сайту
│   │   └── 📁 ui/                         # Базові UI примітиви
│   │
│   ├── 📁 data/                           # Джерела даних та типізація контенту
│   │   └── 📄 portfolio-data.ts           # Повний набір даних (тексти, проекти, метрики EN/PL)
│   │
│   ├── 📁 hooks/                          # Користувацькі React-хуки
│   └── 📁 lib/                            # Допоміжні утиліти (cn, formatting)
│
└── 📁 public/                             # Статичні файли (зображення, PDF резюме)
```

---

## 4. Джерела Правди та Правила Роботи
1. **Source of Truth:** Будь-які нові тексти, метрики чи кейси мають базуватися виключно на [`OLEH_BACHARA_PROFILE_SOURCE_OF_TRUTH.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/OLEH_BACHARA_PROFILE_SOURCE_OF_TRUTH.md) та [`PORTFOLIO_CONTENT_FOUNDATION.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/PORTFOLIO_CONTENT_FOUNDATION.md). Не вигадувати досягнень, технологій чи відгуків.
2. **Безпека інфраструктури:** Жодного прямого підключення до зовнішніх серверів чи Raspberry Pi з цього робочого простору.
3. **Мовна підтримка:** Двомовність EN / PL зберігається в `portfolio-data.ts` та синхронізується між компонентами.
