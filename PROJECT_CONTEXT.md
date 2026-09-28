# PROJECT CONTEXT: roman-deyneko-portfolio (Hardware, Embedded & Full-Stack)

> **Версія проєкту:** `v0.2.0` (Осінь 2026 / Branch: `roman-deyneko`)  
> **Локація:** `/Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio`  
> **Головна мета гілки `roman-deyneko`:** Персональне інженерне портфоліо Романа Дейнека (Head of R&D / Lead Hardware, Embedded Systems & Full-Stack Architect).  

---

## 1. Контекст та Позиціонування
- **Особа:** Роман Дейнеко (Roman Deyneko / @roman / @neko), Пшехлево, Поморське воєводство, Польща.
- **Головна посада:**
  - **EN:** Head of R&D / Lead Hardware, Embedded Systems & Full-Stack Architect
  - **PL:** Head of R&D / Główny Inżynier Hardware, Systemów Wbudowanych i Full-Stack
  - **Target Roles:** Head of R&D · Tech Lead · Lead Hardware & Embedded Architect · Industrial MES Architect · Senior Automation (PLC) Engineer
- **Позиціонування:** Інженер-мехатронік, архітектор вбудованих систем, інженер промислової автоматизації та Full-Stack/Android розробник. Поєднує глибоку інженерну експертизу в промисловій автоматизації (Siemens S7, Factory I/O, лазерна різка ЧПК, EPLAN, SCADA), вбудованих mesh-мережах (ESP-NOW на ESP32-C6), Android-додатках для роботи з касовим та промисловим обладнанням (Kotlin, Bluetooth, RS-232), edge-шлюзах на Raspberry Pi та промислових MES-платформах (FastAPI + React 19 Canvas).

---

## 2. Технологічний Стек
- **Фреймворк:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Стилізація:** Tailwind CSS v4 + `@tailwindcss/postcss`
- **Анімації та UI:** Framer Motion, Lucide React, clsx, tailwind-merge
- **Утиліти:** PDFKit (генерація CV), Roboto fonts

---

## 3. Карта Модульної Архітектури

```text
📁 roman-deyneko-portfolio/
├── 📄 PROJECT_CONTEXT.md                  # Онтологія та інструкції системи для ШІ
├── 📄 ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md # Фактологічне першоджерело профілю Романа Дейнека
├── 📄 PORTFOLIO_CONTENT_FOUNDATION.md     # Редакційний фундамент та структура сайту
├── 📄 README.md                           # Запуск та розгортання проєкту
├── 📄 package.json                        # Залежності та скрипти (generate:cv, prebuild)
├── 📄 generate-pdf.js                     # Генерація PDF-версій резюме (EN, PL + RODO, 1-page ATS, клікабельні лінки)
├── 📄 download-fonts.js                   # Завантаження та перевірка TrueType шрифтів Roboto для PDF
├── 📁 data/                               # Локальне персистентне сховище (JSON DB): сесії відвідувачів, intent, роутер, заявки (Docker volume: ./data:/app/data)
├── 📁 src/
│   ├── 📁 app/                            # Next.js App Router (сторінки та макети)
│   │   ├── 📄 layout.tsx                  # Базовий макет (шрифти, метадані)
│   │   ├── 📄 manifest.ts                 # PWA Web App Manifest (standalone, theme_color, icons)
│   │   ├── 📄 page.tsx                    # Головна сторінка (Hero, SelectedWork, About, Contact)
│   │   ├── 📄 globals.css                 # Стилі Tailwind v4
│   │   ├── 📁 admin/                      # Кабінет адміністратора (auth gate, дашборд, проєкти, ліди, телеметрія, відвідувачі, конверсії)
│   │   │   ├── 📄 layout.tsx              # Макет адмін-панелі
│   │   │   └── 📄 page.tsx                # Інтерфейс кабінету адміна з вкладками та PIN/Telegram авторизацією
│   │   ├── 📁 cv/                         # Інтерактивна сторінка резюме з live-переглядом та 1-клік CTAs
│   │   │   └── 📄 page.tsx                # Веб-інтерфейс перегляду резюме (EN/PL toggle, вбудований PDF-фрейм, прямі контакти)
│   │   ├── 📁 mesh/                       # Інтерактивна графічна сторінка "Що таке меш-мережа" (симулятор, аналогії для HR, порівняння з Wi-Fi)
│   │   │   └── 📄 page.tsx                # Веб-інтерфейс візуального пояснення меш-мережі (EN/PL)
│   │   ├── 📁 mesh-network/               # Аліас маршруту до /mesh
│   │   │   └── 📄 page.tsx                # Реекспорт /mesh
│   │   ├── 📁 api/                        # API routes (admin-auth, cv, ping, send-email, inquiries, telegram-auth, visitors, intent, redirect-rules)
│   │   │   ├── 📁 admin-auth/             # Серверна безпека адмінки: SHA-256 HMAC PIN, валідація сесій, інвалідація старих токенів
│   │   │   ├── 📁 cv/                     # Динамічне завантаження резюме під мову (?lang=en|pl, Content-Disposition)
│   │   │   ├── 📁 inquiries/              # Персистентне сховище заявок та лідів з форми контактів
│   │   │   ├── 📁 visitors/               # Облік візитів, повна телеметрія (GPU/CPU/RAM, мережа, екран, IP, геолокація, клікстрім) з персистентним JSON-сховищем
│   │   │   ├── 📁 intent/                 # Відстеження намірів рекрутерів (CV, контакти, воронка) з персистентним JSON-сховищем
│   │   │   └── 📁 redirect-rules/         # Розумна маршрутизація гостьового трафіку (Smart Traffic Router) з персистентною конфігурацією
│   │   └── 📁 projects/                   # Сторінки окремих кейсів
│   │
│   ├── 📁 components/                     # Компоненти інтерфейсу
│   │   ├── 📄 Navbar.tsx                  # Навігація з кнопкою швидкого доступу ⚡ Executive Brief та посиланням на Vectors
│   │   ├── 📄 Hero.tsx                    # Головний екран: Primary + Executive Brief + CV + інженерний пілл 4 векторів + лінк на /mesh
│   │   ├── 📄 MeshVisualizer.tsx          # Інтерактивний SVG-симулятор промислової топології (self-healing, star vs mesh, живі пакети)
│   │   ├── 📄 SanPajdaVisualizer.tsx      # Інтерактивна SCADA-консоль турбоміксера та 3-зонного печі PID (розкладка +33%, досьє 5 креслень)
│   │   ├── 📄 GoodvalleyVisualizer.tsx    # Інтерактивний симулятор ліній Goodvalley (осцилограф de-jitter фільтра Siemens S7, телеметрія)
│   │   ├── 📄 MesCanvasVisualizer.tsx     # 2D Canvas цифровий двійник цеху MES (верстати, шпиндель 12k RPM, черга SLA <12h)
│   │   ├── 📄 ExpoFocusNavigator.tsx      # Інтерактивна вітрина 4 інженерних векторів (Industrial PLC & Automation, Embedded Mesh, WFM & Plant Ops, Mobile POS & Hardware)
│   │   ├── 📄 SelectedWork.tsx            # Добірка 4 флагманських систем з візуальними підказками та клікабельними кресленнями
│   │   ├── 📄 CaseArtwork.tsx             # Автентичні векторні інженерні креслення кейсів (San-Pajda, Goodvalley, MES, Mesh)
│   │   ├── 📄 RecruiterFitMatcher.tsx     # Матриця відповідності стеку (12 компетенцій, 7 ролевих пресетів, категорійні фільтри, радар 4 доменів, ATS-експорт)
│   │   ├── 📄 StickyRecruiterBar.tsx      # Плаваючий бар швидких дій (Executive Brief, CV, контакти)
│   │   ├── 📄 RecruiterModal.tsx          # 1-хвилинний Executive Brief (статус ЄС, метрики, кваліфікація)
│   │   ├── 📄 ValueProposition.tsx       # 4 стовпи бізнес-цінності та ROI (трафік, швидкість, міграції)
│   │   ├── 📄 About.tsx                   # Блок "Про мене", освіта, кваліфікація (493 ECTS, PANS)
│   │   ├── 📄 Contact.tsx                 # 3 високовартісні оффери (аудит, DFM, screening) та канали зв'язку
│   │   ├── 📄 Footer.tsx                  # Футер сайту
│   │   └── 📁 ui/                         # Базові UI примітиви
│   │
│   ├── 📁 data/                           # Джерела даних та типізація контенту
│   │   ├── 📄 portfolio-data.ts           # Повний набір даних (тексти, 4 проекти, EXPO_ALIGNMENTS, CONVERSION_OFFERS EN/PL)
│   │   └── 📄 case-study-content.ts       # Детальні описи та секції 4 кейсів для окремих сторінок /projects/[id]
│   │
│   ├── 📁 hooks/                          # Користувацькі React-хуки
│   └── 📁 lib/                            # Допоміжні утиліти (cn, formatting, intent-tracker, visitor-telemetry, server-storage)
│       ├── 📄 intent-tracker.ts           # Утиліта відстеження high-intent подій рекрутерів
│       ├── 📄 visitor-telemetry.ts        # Комплексний збір телеметрії (GPU WebGL, CPU, RAM, екран Retina, мережа, UTM)
│       └── 📄 server-storage.ts           # Атомарне та безпечне файлове JSON-сховище для бекенду (/data)
│
├── 📁 privatInfo/                         # Приватні вихідні матеріали профілю та екосистема
│   ├── 📄 README.md                       # Індекс каталогу privatInfo
│   ├── 📄 ACTIVE_PROJECTS_ECOSYSTEM.md    # Реєстр та онтологія всіх 20 активних проєктів у Projects/
│   ├── 📄 ANNUAL_PROGRESS_REPORT_2025_2026.md # Звіт інженерної еволюції за останній рік (Було/Стало)
│   ├── 📄 GOODVALLEY_EXPERIENCE.md        # Промисловий досвід: налаштування та оптимізація ліній у Goodvalley
│   ├── 📄 PORTFOLIO_CONVERSION_STRATEGY.md # Стратегія конверсії (10-сек хук, 4 галузеві вектори, фінальний оффер)
│   ├── 📁 newInfo/                        # Нові виробничі кейси (турбоміксер, безе, схеми, Gantt)
│   │   ├── 📄 README.md                   # Індекс нових матеріалів
│   │   ├── 📄 01_automatyzacja_procesu_turbomixer.md # Проєкт SCADA/MES для турбоміксера (57 днів, 25.4k PLN)
│   │   ├── 📄 02_modernizacja_programu_bezy.md       # Оптимізація випікання (+33%, 71.1k PLN/рік)
│   ├── 📁 study/                          # Офіційні виписки оцінок (PANS Jarosław, 493 ECTS)
│   │   ├── 📄 README.md                   # Аналітичний огляд потрійної компетенції (Inż. + Inż. + Mgr.)
│   │   ├── 📄 01_transcript_informatyka.md # Інформатика (Computer Science) — Inżynier (213 ECTS)
│   │   ├── 📄 02_transcript_automatyka.md  # Автоматика та Практична Електроніка — Inżynier (160 ECTS)
│   │   └── 📄 03_transcript_zarzadzanie.md # Менеджмент та Управління (Management) — Magister (120 ECTS)
│   └── 📁 archive/                        # Організований архів історичних резюме та нотаток
│       ├── 📄 README.md                   # Індекс та навігатор архівом
│       ├── 📁 markdown/                   # 100% читабельні для ШІ Markdown-версії резюме (01..07)
│       └── 📁 originals/                  # Збережені вихідні файли (.pdf, .docx, .odt)
│
└── 📁 public/                             # Статичні файли (зображення, PDF резюме)
```

---

## 4. Джерела Правди та Правила Роботи
1. **Source of Truth:** Будь-які нові тексти, метрики чи кейси в цій гілці мають базуватися виключно на [`ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md). Не вигадувати досягнень, технологій чи відгуків.
2. **Безпека інфраструктури:** Жодного прямого підключення до зовнішніх серверів чи Raspberry Pi з цього робочого простору.
3. **Мовна підтримка:** Двомовність EN / PL зберігається в `portfolio-data.ts` та синхронізується між компонентами.
4. **Рекрутерська та ATS-онтологія (Recruiter & Market Alignment):** Уникати презентації суто нішевих мікро-термінів (`ESP-NOW`, `ESP32-C6`, `Wiegand`) як самостійних первинних назв компетенцій. Використовувати загальноприйняті стандарти ринку праці (`Embedded C/C++ & FreeRTOS`, `Industrial Wireless IoT`, `Industrial Automation & PLC (Siemens S7)`, `Embedded Linux & Edge Gateways`, `Robotics & DFM`, `Full-Stack MES`), а для лідерських ролей (Head of R&D / Tech Lead) — управлінські стандарти (`Agile & Scrum Delivery`, `Jira & Confluence`, `Lean Manufacturing & OEE`, `Engineering CAPEX / BOM Planning`, `Cross-Functional Leadership`), а конкретні плати, чипи та кейси показувати як залізобетонні технічні докази реалізації.

---

## 5. Стандарти мобільної верстки та UX (Mobile-First Architecture)
1. **Zero Overflow Policy:** Гарантія нульового горизонтального скролу (`scrollWidth <= innerWidth`). Усі довгі заголовки використовують `break-words` та адаптивні `clamp()` шкали (`display-xl`, `display-lg`, `display-md`).
2. **Touch Targets (44×44px):** Усі інтерактивні елементи (кнопки, посилання, чекбокси, фільтри) мають мінімальну зону натискання 44×44px або `min-h-[44px]` (для дрібних бейджів — `min-h-[36px]`).
3. **Ergonomic Safe-Area & Floating Controls:**
   - Нижні плаваючі панелі (`StickyRecruiterBar`, модальні вікна) враховують `env(safe-area-inset-bottom, 0px)`.
   - На мобільних пристроях (`<640px`) плаваючий бар переходить в ергономічний 1-рядковий режим (`⚡ Brief` + `CV` + `Phone` + `Telegram`), щоб не закривати контент.
4. **Bottom Sheet Pattern:** Модальні вікна (`RecruiterModal`, `TelegramAuthModal`) на мобільних пристроях відображаються як нативний iOS Bottom Sheet з drag-хендлом, вирівнюванням `items-end`, `rounded-t-3xl`, блокуванням фонового скролу `body` та `max-h-[90dvh]`.
5. **iOS Safari PDF Fallback:** Оскільки мобільний Safari блокує або некоректно скролить багатосторінкові `<iframe>` з PDF, на екранах `< md` використовується адаптивна картка з прямими CTAs "Open Full PDF in New Tab ↗" та "Download PDF", а вбудований iframe активується на `md+`.
6. **Touch Performance & Anti-Flicker:** Використання `-webkit-tap-highlight-color: transparent;` для усунення сірого мерехтіння на iOS/Android та `touch-action: manipulation;` для прискорення обробки дотиків (усунення 300ms tap delay).
7. **iOS Form Zoom Prevention:** Примусовий `font-size: 16px !important;` для `<input>`, `<select>`, `<textarea>` на мобільних пристроях (`< 768px`), що запобігає автоматичному наближенню Safari та руйнуванню полів сторінки.
8. **Horizontal Snap Carousels on Mobile:** Заміна важких вертикальних стеків великих SVG-блоків (`SelectedWork`) на плавні горизонтальні свайп-контейнери з CSS Scroll Snap (`snap-x snap-mandatory`), що заощаджує понад 1000px вертикального скролу на смартфонах.
9. **Apple Web App & PWA Status Bar Integration:** Налаштування `appleWebApp: { capable: true, statusBarStyle: "black-translucent" }` та `formatDetection: { telephone: false }` у [layout.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/layout.tsx) для нативного вигляду додатку на iOS.
10. **Tactile Feedback & UI Primitives:** Базові кнопки ([Button.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/ui/button.tsx)) мають закладені мінімальні висоти `min-h-[44px]` (md) / `min-h-[46px]` (lg) та анімацію `active:scale-[0.98]` для миттєвого тактильного відгуку на сенсорних екранах.
11. **PWA Standalone Manifest Support:** Нативний веб-маніфест ([manifest.ts](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/manifest.ts)) забезпечує безшовне додавання сайту на домашній екран ("Add to Home Screen" на iOS Safari та Android) у повноекранному режимі `display: standalone` з темною темою `#11100e`.
12. **Modal Scroll Isolation & Overscroll Containment:** Обидва модальні вікна ([RecruiterModal.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/RecruiterModal.tsx) та [TelegramAuthModal.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/TelegramAuthModal.tsx)) блокують прокручування фонового документа `document.body.style.overflow = "hidden"` та мають CSS-властивість `overscroll-contain`, запобігаючи паразитному ланцюговому скролу основної сторінки під час свайпів.
13. **Technical Documentation & Schematics Touch Ergonomics:** Усі інтерактивні схеми та креслення на сторінках кейсів ([ProjectPageClient.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/projects/[id]/ProjectPageClient.tsx)) мають touch targets `min-h-[36px]` для перегляду у високій роздільній здатності, оптимізовані атрибутами `loading="lazy"` та `decoding="async"`, а також враховують нижній відступ safe-area на смартфонах.
14. **Ultra-Compact Smartphone Resilience (<380px):** Плаваючий бар дій ([StickyRecruiterBar.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/StickyRecruiterBar.tsx)) динамічно адаптує розміри шрифтів (`text-[11px]` на малих екранах та `text-xs` від 380px+) і внутрішні падінги, гарантуючи нульове злипання та відсутність переносів слів на дисплеях iPhone SE та вузьких Android пристроях.
15. **Above-the-Fold Conversion Ergonomics & Calibrated Typographic Scale:** Hero H1 калібровано шкалою `display-xl` (`clamp(2rem, 4.2vw, 3.85rem)`, line-height 1.04), що гарантує відображення заголовка у 2–3 охайні рядки без розриву дефісів (`Real-Time`) та утримує повну конверсійну зв'язку (Заголовок + Лід-абзац + 3 CTA-кнопки дій + 4 картки Proof Метрик) вище лінії першого скролу (above the fold) на стандартних екранах лептопів та десктопів.
16. **Responsive Visualizer Coordinate Scaling & Anti-Collision:** Вузли та компоненти у [MeshVisualizer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/MeshVisualizer.tsx) та [MesCanvasVisualizer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/MesCanvasVisualizer.tsx) використовують калібровані координати та компактні пігулки на мобільних пристроях (`<sm`), повністю усуваючи взаємне перекриття карток та підтримуючи `touch-pan-y` для комфортного скролу.
17. **Mobile Comparison Cards View (/mesh):** Замість громіздких 3-колонкових таблиць з горизонтальним скролом на мобільних пристроях (`<md`) сторінка [/mesh](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/mesh/page.tsx) використовує нативний картковий список порівнянь «Wi-Fi vs Mesh».
18. **Mobile Live Match HUD (RecruiterFitMatcher):** Для екранів `<lg` у [RecruiterFitMatcher.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/RecruiterFitMatcher.tsx) інтегровано верхній віджет з живим відсотком відповідності та швидкими діями («Copy» / «Brief»), що усуває потребу прокручувати 12 навичок для перегляду результату.
19. **Scroll-Snap Thumbnail Carousels with ≥44px Touch Targets:** Смуга мініатюр креслень у [SanPajdaVisualizer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/SanPajdaVisualizer.tsx) адаптована у плавний свайп-контейнер з гарантованим розміром зони натискання ≥ 44px.
20. **Comprehensive Mobile Touch Ergonomics & Micro-Viewport Resilience:** Усі інтерактивні елементи ([Footer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/Footer.tsx), [StickyRecruiterBar.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/StickyRecruiterBar.tsx), [TelegramAuthModal.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/TelegramAuthModal.tsx), [admin/page.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/admin/page.tsx), [ProjectPageClient.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/projects/[id]/ProjectPageClient.tsx), [ExpoFocusNavigator.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/ExpoFocusNavigator.tsx)) приведені до стандарту зони натискання ≥ 44×44px з активним тактильним відгуком `active:scale-95` / `active:scale-[0.98]`. Блоки метрик та технічних специфікацій (Hero Proof Metrics, Hardware Specs) відкалібровано для екранів < 360px (iPhone SE) для повного виключення накладання та незграбних переносів.
21. **Zero Horizontal Overflow & Flexbox min-w-0 Standard:**
    - Повна ліквідація горизонтального зміщення та паразитного скролу сторінки на смартфонах (`scrollWidth <= innerWidth`).
    - Усунення кореневої причини flexbox blowout: flex-контейнери за замовчуванням мають `min-width: auto`, через що внутрішні елементи з `whitespace-nowrap` або довгими рядками розширювали батьківський контейнер до 940px на мобільних пристроях. Впроваджено обов'язковий ланцюжок `min-w-0 w-full max-w-full overflow-hidden` до всіх flex та grid колонок у [RecruiterFitMatcher.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/RecruiterFitMatcher.tsx), [SelectedWork.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/SelectedWork.tsx), [MeshVisualizer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/MeshVisualizer.tsx), [SanPajdaVisualizer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/SanPajdaVisualizer.tsx), [MesCanvasVisualizer.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/components/MesCanvasVisualizer.tsx) та [admin/page.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/admin/page.tsx).
    - Заміна негативних марджинів (`-mx-4 px-4` / `-mx-2 px-2`), що спричиняли вихід за поля на iOS Safari, на безпечні `w-full max-w-full min-w-0`.
    - Глобальне закріплення `overflow-x: hidden; overflow-x: clip;` для `html`, `body` та `.site-shell` у [globals.css](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/globals.css) та [page.tsx](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/app/page.tsx).

---

## 6. Архітектура Адмін-Панелі та Персистентність (Admin Panel Architecture)
1. **Персистентне сховище (Docker Volume Friendly):**
   - Усі дані адмін-панелі записуються атомарно через утиліту `writeJsonData` / `readJsonData` ([server-storage.ts](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/src/lib/server-storage.ts)) до каталогу `data/` (`/app/data` у Docker-контейнері).
   - Файли сховища: `visitors-journeys.json` (телеметрія відвідувачів), `recruiter-intent.json` (події наміру), `inquiries.json` (заявки з форми контактів), `redirect-config.json` (налаштування смарт-маршрутизатора), `admin-security.json` (SHA-256 HMAC геш PIN-коду та сесії).
2. **Двостороння синхронізація статусу адміна (Bidirectional Admin Sync):**
   - При вході в кабінет сесія поточного браузера отримує статус `isAdminDevice = true` на сервері через дію `set_session_admin`.
   - Сесії у вкладці "Відвідувачі" та події у вкладці "Рекрутери" мають клікабельні бейджі статусу (`toggle_admin_session` / `toggle_admin_device`), що дозволяє миттєво перемикати маркування між "Ви (Адмін)" та "Гість / Рекрутер" у реальному часі.
3. **Керування даними та очищення (Data Lifecycle & Purge):**
   - Підтримка видалення окремих записів (`delete_journey`, `delete_event`, `delete_inquiry`).
   - Підтримка глобального очищення тестових даних (`clear_all` у `/api/visitors`, `/api/intent` та `/api/inquiries`) як з відповідних вкладок, так і через уніфіковану кнопку «Видалити всі тестові дані» в "Налаштуваннях".
   - Скидання лічильників маршрутизатора (`reset_stats` у `/api/redirect-rules`).
4. **Експорт даних (Analytics Export):**
   - Підтримка експорту телеметрії у JSON та CSV (формат Excel/Google Sheets з підтримкою UTF-8 BOM).
   - Експорт подій наміру у JSON (`recruiter-intent.json`).
   - Експорт лідів та заявок у JSON (`leads-inquiries.json`).
   - Повний бекап системи (`portfolio-admin-backup.json`).
5. **Захист від перевантаження (Debounced Search):**
   - Рядки пошуку відвідувачів та намірів мають 250ms дебаунсинг з автоочищенням таймерів для запобігання гонки запитів (race conditions).
6. **Безпека авторизації та збереження сесії (HMAC Session Persistence):**
   - Telegram OIDC авторизація генерує підписаний HMAC session-токен, узгоджений з конфігурацією безпеки `admin-security.json`, що унеможливлює раптовий розлогін адміністратора при перезавантаженні сторінки (F5/Reload).
   - Надійний fallback для апаратних властивостей (`screenResolution`), що виключає 500 помилки при неповних сесіях.
7. **Захист від брутфорсу (Brute-Force Rate Limiting):**
   - У `/api/admin-auth` інтегровано облік невдалих спроб входу за IP-адресою: після 5 помилкових вводів PIN-коду спрацьовує захисне блокування на 10 хвилин з поверненням статусу `429 Too Many Requests`.
8. **Захист від випадкового видалення (Destructive Action Safeguards):**
   - Усі поодинокі дії видалення (сесія відвідувача, подія наміру, вхідна заявка) захищені діалогом підтвердження `window.confirm`.
9. **Прогресивний рендеринг телеметрії (Progressive Pagination):**
   - Списковий вивід сесій відвідувачів оптимізовано зрізом по 25 записів із кнопками довантаження («Показати ще 25 сесій» / «Показати всі»), що запобігає перевантаженню DOM при великих обсягах аналітики.
10. **Інтерактивна діагностика довільних URL:**
    - У вкладку телеметрії додано віджет перевірки доступності довільних ендпоінтів та веб-хуків через `/api/ping?url=...` з миттєвим відображенням затримки, статусу та TLS.
11. **Прогресивна пагінація подій рекрутерів (Intent Stream Pagination):**
    - Впроваджено `visibleIntentCount` (по 25 подій) із кнопками розширення списку та скиданням зрізу при зміні фільтрів або пошукових запитів.
12. **Розширений експорт у CSV (Excel / Google Sheets):**
    - Реалізовано експорт подій наміру (`recruiter-intent.csv`) та вхідних заявок (`leads-inquiries.csv`) з коректним екрануванням лапок та підтримкою UTF-8 BOM.
13. **Безпечний буфер обміну (Safe Clipboard API):**
    - Усі виклики копіювання (IP, User-Agent, Email) обгорнуті в ізольований помічник `copyTextSafely` з fallback на `document.execCommand`, що виключає `DOMException` у незахищених чи мобільних середовищах.
14. **Автоматична нормалізація URL у Смарт-Маршрутизаторі:**
    - При збереженні власного сценарію маршрутизації довільні домени автоматично отримують схему `https://`, а внутрішні шляхи — префікс `/`, що запобігає виникненню 404 помилок при переходах гостей.
15. **Відмовостійка фільтрація (Null-Safety Guards):**
    - Додано захисні перевірки `(field || "")` для всіх пошукових виразів та текстових полів на клієнті й сервері (`visitors`, `intent`, `inquiries`), що гарантує захист від раптового падіння інтерфейсу при неповних чи тестових даних.
16. **Захист від SSRF та обмеження доступу до інфраструктури (SSRF & Ping Sandbox):**
    - У `/api/ping` впроваджено жорстку фільтрацію цільових адрес: заборонено пінгувати внутрішні мережі, link-local метадані хмари (`169.254.`), віддалений VPS `37.187.153.154` та Raspberry Pi (`raspberrypi`), що гарантує 100% відповідність правилам безпеки.
17. **Повнотекстовий пошук за ID сесії та шляхами (Deep Search Matching):**
    - У `/api/visitors` додано зіставлення пошуку з ID сесії (`j.id`), початковим (`j.entryPath`) та поточним шляхом (`j.currentPath`).
    - У `/api/intent` додано зіставлення з ID події (`r.id`) та типом події (`r.type`), що усунуло сліпі зони пошуку.
18. **Стійкість до холодного старту сесії (Cold-Start Auth Resilience):**
    - Тайм-аут AbortController при перевірці збереженого токена авторизації `/api/admin-auth` збільшено з 2000мс до 5000мс, що виключає випадковий скид сесії при компіляції маршрутів під час холодного старту або рестарту Docker-контейнера.
19. **Скидання тестового стану перенаправлення (Redirect Test Mode Sync):**
    - При перемиканні статусу пристрою на тестовий у кабінеті автоматично видаляється прапорець `guest_redirect_done` із `sessionStorage`, що дозволяє адміністратору негайно перевірити роботу активного сценарію перенаправлення без ручного очищення сховища вкладки.
20. **Динамічний статус здоров'я сервісів (Dynamic System Health Indicator):**
    - Картка стану сервісів на головній вкладці тепер динамічно калібрує кольорову гаму та іконки (≥90% — смарагдовий `text-emerald-400` з галочкою; 50–89% — бурштиновий `text-amber-400`; <50% — червоний `text-rose-400`), виключаючи неправдивий «зелений» статус при збоях мережі.
21. **Ручна реєстрація лідів та швидка зміна статусу (Manual Inbound CRM & Status Toggle):**
    - У вкладку «Заявки» додано форму/модальне вікно створення нового звернення («+ Створити заявку»), що дозволяє адміністратору фіксувати ліди з телефонних дзвінків, особистих зустрічей чи Telegram.
    - Бейджі статусу заявок у списку отримали інтерактивне циклічне перемикання в 1 клік (`new` ➔ `in_progress` ➔ `archived`).
22. **Фільтр та пріоритет флагманських робіт (Featured Projects Alignment):**
    - Чотири флагманські інженерні кейси за замовчуванням отримують статус `Featured` (`featuredOverride[proj.id] ?? true`), а у панель фільтрів додано пігулку «Featured» для миттєвої вибірки обраних систем.
23. **Безшовний мобільний callback для Telegram OAuth (Mobile OAuth Token Handshake):**
    - У `/api/telegram-auth/callback` реалізовано автоматичне перенаправлення `/admin?token=...` при відсутності `window.opener` (на мобільних пристроях чи окремих вкладках), а у кабінеті адміністратора додано автоматичне зчитування токена з URL-параметрів, маркування сесії як валідної та очищення адреси через `history.replaceState`.
24. **Збереження кастомного статусу при створенні заявки (Inquiry Creation Status Preservation):**
    - У `/api/inquiries` виправлено збереження обраного статусу (`in_progress` / `archived`) при додаванні заявки з кабінету адміністратора замість примусового перезапису на `new`.
25. **Серверний захист зміни PIN-коду (Server-Side PIN Change Validation):**
    - У `/api/admin-auth` додано сувору перевірку `newPin !== currentPin` на бекенді, що унеможливлює повторне призначення ідентичного PIN-коду через API.
26. **Валідація режимів Смарт-Маршрутизатора (Routing Mode Whitelist Protection):**
    - У `/api/redirect-rules` запроваджено валідацію вхідного режиму за `VALID_MODES`, що запобігає пошкодженню конфігурації некоректними рядками.
27. **Посилення SSRF пісочниці та фільтрації протоколів (SSRF Air-Gap & Protocol Hardening):**
    - У `/api/ping` заблоковано запити до `localhost`, `127.0.0.1`, приватних діапазонів RFC 1918 (`172.16.0.0/12`), а також заборонено використання нестандартних або небезпечних схем URL (`ftp:`, `data:`, `file:`, `javascript:`).
28. **Інтерактивні картки KPI та смарт-відповіді в Telegram (Interactive KPI Cards & Smart Messenger):**
    - Усі 4 KPI картки оглядового дашборду стали клікабельними для швидкого переходу між розділами (`intent`, `visitors`, `routing`, `telemetry`), назви табів отримали чітке розмежування («Відвідувачі & Шляхи» та «Мережа & Сервіси»), а інспектор заявок отримав автоматичне розпізнавання Telegram-юзернеймів у тексті повідомлення для прямої відповіді клієнту.
29. **Виправлення ReferenceError при реєстрації нової сесії відвідувача (Visitor Step Timestamp Guard):**
    - У `/api/visitors` замінено неоголошену змінну `currentTime` на `timeStr` у масиві первинних кроків `steps`, що усунуло критичний збій 500 при фіксації першого входу гостей.
30. **Повна синхронізація режиму обслуговування (End-to-End Maintenance Mode):**
    - Перемикач режиму техобслуговування у вкладці «Налаштування» з'єднано з бекендом через `POST /api/redirect-rules` із збереженням у `redirect-config.json` та синхронізацією при завантаженні адмінки.
    - Виправлено попередження React Compiler `set-state-in-effect` у `MaintenanceBanner.tsx` через ліниву ініціалізацію стану `isDismissed`.
31. **Фонове авто-оновлення дашборду (Live 30s Auto-Refresh):**
    - У навігаційну шапку кабінету додано перемикач «Live 30s» з пульсуючим статус-індикатором та збереженням вибору у `localStorage`. Кожні 30 секунд здійснюється синхронізація телеметрії, аналітики намірів та заявок без блокування інтерфейсу.
32. **Автоматична синхронізація вибраної заявки (Selected Inquiry State Sync):**
    - У `handleFetchInquiries` впроваджено функціональний апдейтер `setSelectedInquiry((prev) => ...)`, завдяки чому відкриті деталі звернення в інспекторі автоматично оновлюються при зміні статусів на сервері.
33. **Перемикач видимості поточного PIN-коду (Current PIN Visibility Toggle):**
    - У форму зміни майстер-паролю у вкладці «Налаштування» додано кнопку перемикання видимості (`showCurrentPin`) для поля «Поточний PIN-код».
34. **Динамічне колірне кодування статусу діагностики (Diagnostic Health Spectrum):**
    - Віджет довільного пінг-тестування у вкладці «Мережа & Сервіси» адаптивно калібрує кольори бейджів: 2xx/Operational — смарагдовий, 3xx — бурштиновий, 4xx/5xx/Timeout — червоний, що виключає хибно-позитивне маркування помилок.
35. **Валідація білого списку статусів заявок (Inquiry Status Whitelist):**
    - У `/api/inquiries` додано сувору валідацію статусів (`new`, `in_progress`, `archived`) у дії `update_status`.
36. **Безпечне завершення сесії та очищення кешу (Secure Admin Logout Protocol):**
    - У `handleLogout` додано повне скидання локального стану (`inquiries`, `journeys`, `intentEvents`, `selectedInquiry`, `activeTab`) та видалення збережених у `localStorage` заявок (`admin_inquiries`), що запобігає витоку конфіденційних контактних даних лідів на спільних пристроях.
37. **Сувора валідація створення заявок (Inquiry Validation & Email Regex Guard):**
    - У кабінеті адміністратора та на бекенді `/api/inquiries` додано валідацію обов'язкових полів `name` та `email` (із клієнтським regex-тестом на валідність адреси пошти) та повернення `400 Bad Request` при спробі збереження порожніх записів.
38. **Безпечне копіювання посилання перенаправлення (Safe Clipboard Handshake in Telegram Modal):**
    - У `TelegramAuthModal.tsx` копіювання `redirectUri` обгорнуто в захищений помічник з підтримкою `document.execCommand` для середовищ без активного фокусу чи HTTP.
39. **Оптимістичне скидання лічильників при очищенні даних (Zero-Latency Stats Flush):**
    - При натисканні «Очистити всі події» або «Видалити всі тестові дані» лічильники `journeyStats`, `intentStats`, `intentCounts` та `intentFunnel` миттєво обнуляються без мерехтіння застарілих значень під час фонового запиту.
40. **Захист від пошкодження сховища сесій у воронці намірів (Defensive Funnel Array Verification):**
    - У `/api/intent` додано захисну перевірку `Array.isArray(storedJourneys)` перед зчитуванням довжини масиву сесій для розрахунку конверсії воронки.
41. **Ізоляція розрахунку метрик намірів від пошукових запитів (Baseline Intent Metrics Calculation):**
    - У `/api/intent` розрахунок показників `counts` та етапів `funnel` переведено на вибірку `allRecords`, завдяки чому фільтрація або пошук у списку подій більше не спотворює верхні KPI-картки кабінету та загальний коефіцієнт конверсії.
42. **Захист від створення примарних сутностей при неповних запитах (Ghost Entity Action Shield):**
    - У `/api/visitors` та `/api/intent` усунуто паразитичний fall-through при виклику дій `delete_journey`, `toggle_admin_session`, `set_session_admin`, `delete_event`, `toggle_admin_device` без обов'язкових ідентифікаторів, замінивши його на суворе повернення `400 Bad Request`.
43. **Повний цикл резервного відновлення платформи (Full-Stack Backup Restore Engine):**
    - Додано обробку дії `restore` до `/api/visitors`, `/api/intent`, `/api/inquiries` та `/api/redirect-rules`. У вкладку «Налаштування» інтегровано інструмент імпорту JSON-бекапу з валідацією схеми, підтвердженням адміністратора та каскадною синхронізацією стану.
44. **Персистентність фонового оновлення Live 30s (Persistent Live Auto-Refresh):**
    - Реалізовано синхронізацію стану перемикача `isAutoRefreshEnabled` із `localStorage` (`admin_auto_refresh`), що надійно зберігає вибір адміністратора після перезавантаження сторінки або зміни вкладки.
45. **Адаптивна верстка та стан кнопок експорту (Responsive Action Ergonomics & CSV Safeguards):**
    - Для панелей дій у вкладках «Рекрутери & CV», «Відвідувачі & Шляхи» та «Заявки» впроваджено `flex-wrap` (усунення горизонтального вильоту за екран на смартфонах) та захисний стан `disabled` з повідомленням у разі відсутності записів для експорту в CSV.
46. **Динамічний спектр статусів системної телеметрії (Dynamic Network Diagnostics Palette):**
    - У вкладці «Мережа & Сервіси» сітка діагностики endpoints `pingData` переведена на адаптивні кольорові бейджі (2xx/Operational — смарагдовий, 3xx — бурштиновий, Error/Offline/Timeout — червоний) замість фіксованого зеленого кольору.
47. **Запобігання паралельним відправкам форми та блокуванню за PIN (Login Form Debounce & Autofill Protection):**
    - У кабінеті адміністратора усунено подвійний/потрійний виклик `handleLoginWithPin` через паралельне спрацьовування `onKeyDown` на полі вводу, `onClick` на кнопці та `onSubmit` форми. Додано блокування `if (isLoggingIn) return`, коректні атрибути `name="pin"`, `autoComplete="current-password"` та селектор `input[name='pin']`. Це усунуло випадкове спалювання 5 спроб ліміту авторизації на один клік.
48. **Миттєва персистентність головного перемикача Смарт-Маршрутизатора (Smart Router Master Switch Immediate Sync):**
    - Кнопка увімкнення/вимкнення перенаправлення гостей у вкладці «Маршрутизатор» підключена до виклику `handleToggleRedirectMaster`, який негайно зберігає прапорець `enabled` у `/api/redirect-rules` та файлі `redirect-config.json` без необхідності окремого натискання «Зберегти налаштування».
49. **Обробка та індикація помилок збереження роутера (Routing Config Feedback & Error Alerts):**
    - У `handleSaveRedirectConfig` додано захист від повторного виклику під час збереження (`if (isSavingRedirect) return;`), а також явні діалогові попередження `alert(...)` у разі відхилення запиту сервером або розриву з'єднання замість «мовчазного» ігнорування.
50. **Конкурентний захист асинхронних операцій інтерфейсу (Admin Action Concurrency Shields):**
    - Додано захисні перевірки активного стану (`isCreatingInquiry`, `isChangingPin`, `isPinging`, `isCustomPinging`) перед відправкою повторних мережевих запитів, що виключає дублювання лідів, надмірне навантаження діагностики та конфлікти оновлення PIN.
51. **Сувора валідація схеми при відновленні резервної копії на бекенді (Strict Restore Payload Validation Across APIs):**
    - У всіх чотирьох API-маршрутах (`/api/inquiries`, `/api/visitors`, `/api/intent`, `/api/redirect-rules`) додано сувору перевірку типів масивів та об'єктів для дії `restore` з поверненням `400 Bad Request` при некоректних даних замість паразитичного fall-through до створення нових записів.
52. **Виправлення хибно-позитивного статусу в мережевій діагностиці (Honest Network Error Reporting in `/api/ping`):**
    - У функції `measurePing` виправлено обробку збоїв мережі та DNS: недоступні або неіснуючі домени більше не маркуються як `status: "Operational"` з `ssl: "Valid"`, а чесно позначаються як `status: "Offline / Unreachable"` (або `"Timeout"`) зі статусом SSL `"Unavailable"`.
53. **Усунення замикання застарілого стану в фоновому автооновленні (Stale Closure Elimination in 30s Auto-Refresh):**
    - Додано `useRef`-синхронізатори (`latestJourneyFilter`, `latestJourneySearch`, `latestIntentFilter`, `latestIntentSearch`). Функції `handleFetchJourneys` та `handleFetchIntent` тепер використовують значення з рефів, завдяки чому 30-секундний інтервал фонової синхронізації більше не скидає активні фільтри та пошукові запити адміністратора на дефолтні значення.
54. **Тотальне очищення пам'яті браузера при деавторизації (Total State & Memory Cleansing on Logout):**
    - У процедурі `handleLogout` додано повне скидання вхідних та розрахункових об'єктів телеметрії (`journeyStats`, `intentStats`, `intentCounts`, `intentFunnel`, `pingData`, `customPingResult`, `customPingInput`, `customPingError`, `backupRestoreMessage`), що виключає збереження конфіденційних аналітичних та контактних даних у пам'яті React-компонента після виходу.
55. **Санітизація багаторядкових полів та лапок при експорті CSV (Safe CSV Multiline Escaping):**
    - У функціях експорту `handleExportVisitorsCsv`, `handleExportIntentCsv` та `handleExportInquiriesCsv` впроваджено санітизацію переходів на новий рядок (`.replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')`), що усуває розриви рядків таблиць у Microsoft Excel, Apple Numbers та Google Sheets при експорті довгих повідомлень чи User-Agent.
56. **Конкурентний захист відновлення бекапу та захист бекенду від обходу (Parallel Restore & Backend Bypass Shields):**
    - У `handleRestoreBackupFile` додано блокування `if (isRestoringBackup) return;`, а відновлення конфігурацій та баз даних переведено на паралельний `Promise.all`, що прискорило імпорт бекапу у 3-4 рази.
    - У `/api/send-email` додано `export const dynamic = "force-dynamic"`, ліміти довжини полів та регулярний вираз перевірки формату email.
    - У `/api/telegram-auth` додано `export const dynamic = "force-dynamic"` та заборонено прямий тестовий обхід (Direct Payload Bypass) у продакшн-режимі (`NODE_ENV === "production"` повертає `403 Forbidden`).
57. **Повне відображення календарної дати сесій та авто-зцілення застарілих таймстемпів (Calendar Date Restoration & Timestamp Healing):**
    - **Причина:** Раніше на бекенді `/api/visitors` (а також у подій намірів) час початку сесії `startedAt` зберігався через `toLocaleTimeString(...)`, через що фіксувався виключно час доби (наприклад, `10:16 AM`) без року, місяця та дня. У разі повторного візиту (`Візит #2`) поле `startedAt` для існуючої сесії не оновлювалося і назавжди залишалося без дати.
    - **Вирішення:** Впроваджено універсальний хелпер `formatTelemetryTimestamp`, який гарантує виведення повної календарної дати та часу (наприклад, `2026-09-28 10:16 AM`). Якщо у збереженому записі дата відсутня, вона автоматично розраховується та декодується з base36-ідентифікатора сесії `sessionId` або поточної дати. Крім того, у `getStoredJourneys()` та `getStoredIntent()` додано прозоре фонове авто-зцілення (auto-healing) усіх застарілих записів у базі. У CSV-експорті також впроваджено повноцінне виведення дати й часу.
58. **Глобальна уніфікація календарних дат і таймстемпів по всій системі (Comprehensive Date & Timestamp Harmonization):**
    - **Мережева діагностика (`/api/ping`):** Усунено збереження голого часу без дати в `measurePing` (`lastChecked`). Тепер повертається повний формат `YYYY-MM-DD HH:MM:SS`. У UI адмінки `lastPingTimestamp` та картки результатів також відображають повну дату і час.
    - **Хронологія дій відвідувача (Clickstream Steps у `/api/visitors`):** При фіксації нових переходів та початкових кроків поле `timestamp` тепер зберігає `fullDateTime` (`YYYY-MM-DD HH:MM`). У `getStoredJourneys()` додано авто-зцілення (auto-healing) усіх застарілих кроків, які зберігалися лише з часом доби. В інтерфейсі таймстемпи кроків обгорнуті у `formatTelemetryTimestamp`.
    - **Заявки клієнтів (`/api/inquiries`):** У `getStoredInquiries()` додано авто-зцілення історичних заявок з декодуванням дати з base36 ідентифікатора `inq-...`. У картках списку заявок, оглядовій панелі (Overview) та CSV-експорті дату стандартизовано через `formatTelemetryTimestamp`. В інспектор деталей заявки додано чіткий блок дати й часу з іконкою `Clock`.
    - **Підтримка ISO-рядків у `formatTelemetryTimestamp`:** Додано обробку ISO-формату (`2026-09-28T...`), що гарантує охайне та читабельне відображення таймстемпів без сирих артефактів `T` та `.000Z`.
59. **Оптимізація пошуку, персистентності телеметрії та безпеки маршрутизатора (Search Completeness, Telemetry Hygiene & Router Armor):**
    - **Повнотекстовий пошук за датами (Temporal Search Filtering):** У `/api/visitors` додано зіставлення `matchStartedAt` та `matchLastActiveAt`, у `/api/intent` — `matchTimestamp`, а в клієнтський фільтр заявок `filteredInquiries` — `inq.date`. Тепер пошукові рядки (наприклад, `2026-09` або `28.09`) точно знаходять всі візити, події та звернення клієнтів за конкретну дату.
    - **Захист сховища від переповнення (Unbounded Clickstream Step Cap):** У `/api/visitors` впроваджено ліміт у 100 кроків для сесії відвідувача (`existing.steps.length > 100`), що гарантує збереження найсвіжішої історії взаємодії та запобігає вибуховому зростанню JSON-файлу бази при багаторазових кліках чи роботі ботів.
    - **Відображення та експорт `lastActiveAt`:** У картці відвідувача в інтерфейсі адмінки додано відображення часу останньої активності (`j.startedAt → j.lastActiveAt`), якщо сесія тривала довше одного моменту. У `handleExportVisitorsCsv` додано пропущену колонку `"Last Active At"`.
    - **Захист інфраструктури в смарт-маршрутизаторі (Rule 1 Security Armor):** У `/api/redirect-rules` додано серверне блокування адрес, які містять `37.187.153.154` або `raspberry` як цілі перенаправлення, з поверненням `403 Forbidden`.
    - **Точна ідентифікація клієнта за проксі Cloudflare:** У `getClientIdentifier` роута `/api/admin-auth` додано пріоритетну перевірку заголовка `cf-connecting-ip` перед `x-forwarded-for` для захисту від підміни IP та надійного функціонування rate limiter.
    - **Синхронізація розгорнутих карток:** При видаленні сесії або повному очищенні журналу стан `expandedJourneys` автоматично очищує ідентифікатор видаленої сутності.
60. **Захист від спаму заявок, усунення XSS та стабілізація сесій (Anti-Spam Rate Limiting, XSS Elimination & Session Hardening):**
    - **Лімітування швидкості відправки пошти (`/api/send-email`):** Додано інтелектуальний rate limiter на основі клієнтського IP (`cf-connecting-ip` / `x-forwarded-for`), який обмежує відправку форми 5 запитами за 10 хвилин з поверненням `429 Too Many Requests`.
    - **Сувора валідація лідів у `/api/inquiries` та `/api/send-email`:** У роутах впроваджено перевірку валідності формату email регулярним виразом, обмеження довжини полів (`name` до 200, `email` до 254, `message` до 10000 символів) та ліміт місткості сховища заявок до 500 записів із безпечним витісненням застарілих елементів.
    - **Усунення потенційного Reflected XSS у Telegram Callback:** У `/api/telegram-auth/callback` повідомлення помилок, які повертаються від провайдера в параметрах запиту, тепер безпечно екрануються через `escapeHtml` для HTML-розмітки та передаються у `postMessage` через безпечну серіалізацію `JSON.stringify(errorMsg)` замість конкатенації рядків.
    - **Повне скидання навігаційного стану при деавторизації:** У процедуру `handleLogout` додано скидання лічильника пагінації `visibleJourneysCount(25)`, активного вибору заявки `selectedInquiry(null)`, розгорнутих карток `expandedJourneys({})` та пошукових запитів `projectSearch("")` і `inquirySearch("")`.







