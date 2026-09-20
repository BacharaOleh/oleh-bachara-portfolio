# PROJECT CONTEXT: oleh-bachara-portfolio / roman-deyneko (Hardware, Embedded & Full-Stack)

> **Версія проєкту:** `v0.2.0` (Осінь 2026 / Branch: `roman-deyneko`)  
> **Локація:** `/Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio`  
> **Головна мета гілки `roman-deyneko`:** Персональне інженерне портфоліо Романа Дейнека (CTO, Lead Hardware, Embedded Systems & Full-Stack Architect, член команди `czoDelat`).  
> **Зв'язок з екосистемою:** Інтегровано з `czoDelat` ([`team/roster.md`](../czoDelat/team/roster.md)) та `startup` ([`profiles/current_startup/team.md`](../startup/profiles/current_startup/team.md)).

---

## 1. Контекст та Позиціонування
- **Особа:** Роман Дейнеко (Roman Deyneko / @roman / @neko), Пшехлево, Поморське воєводство, Польща.
- **Головна посада:**
  - **EN:** CTO / Lead Hardware, Embedded Systems & Full-Stack Architect
  - **PL:** Główny Inżynier Hardware, Systemów Wbudowanych i Full-Stack (CTO)
- **Позиціонування:** Інженер-мехатронік, архітектор вбудованих систем та Full-Stack розробник. Поєднує 10+ років галузевого ноу-хау у виготовленні ключів та замкових систем із сучасною робототехнікою, низьколатентними бездротовими mesh-мережами (ESP-NOW на ESP32-C6), edge-шлюзами на Raspberry Pi та промисловими MES-платформами (FastAPI + React 19 Canvas).

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
├── 📄 ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md # Фактологічне першоджерело профілю Романа Дейнека
├── 📄 OLEH_BACHARA_PROFILE_SOURCE_OF_TRUTH.md # Джерело профілю Олега Бачари (гілка main)
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
│   │   ├── 📁 admin/                      # Кабінет адміністратора (auth gate, дашборд, проєкти, ліди, телеметрія, відвідувачі)
│   │   │   ├── 📄 layout.tsx              # Макет адмін-панелі
│   │   │   └── 📄 page.tsx                # Інтерфейс кабінету адміна з вкладками та PIN/Telegram авторизацією
│   │   ├── 📁 api/                        # API routes (ping, send-email, telegram-auth, visitors)
│   │   │   └── 📁 visitors/               # Облік візитів та фільтрація пристроїв адміністратора
│   │   └── 📁 projects/                   # Сторінки окремих кейсів
│   │
│   ├── 📁 components/                     # Компоненти інтерфейсу
│   │   ├── 📄 Navbar.tsx                  # Навігація з кнопкою швидкого доступу ⚡ Recruiter Mode
│   │   ├── 📄 Hero.tsx                    # Головний екран з метричним баром та Fast-Track кнопками
│   │   ├── 📄 VisitorTracker.tsx          # Клієнтський трекер візитів із розпізнаванням пристроїв адміна
│   │   ├── 📄 RecruiterFitMatcher.tsx     # Інтерактивний калькулятор відповідності вакансії
│   │   ├── 📄 StickyRecruiterBar.tsx      # Плаваючий бар швидких дій для рекрутерів
│   │   ├── 📄 RecruiterModal.tsx          # 1-хвилинне резюме для HR (ATS snapshot)
│   │   ├── 📄 SelectedWork.tsx            # Добірка ключових проектів/кейсів (CAR framework)
│   │   ├── 📄 ValueProposition.tsx       # 4 стовпи бізнес-цінності та ROI (трафік, швидкість, міграції)
│   │   ├── 📄 About.tsx                   # Блок "Про мене", освіта, кваліфікація
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
1. **Source of Truth:** Будь-які нові тексти, метрики чи кейси в цій гілці мають базуватися виключно на [`ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md). Не вигадувати досягнень, технологій чи відгуків.
2. **Безпека інфраструктури:** Жодного прямого підключення до зовнішніх серверів чи Raspberry Pi з цього робочого простору.
3. **Мовна підтримка:** Двомовність EN / PL зберігається в `portfolio-data.ts` та синхронізується між компонентами.
