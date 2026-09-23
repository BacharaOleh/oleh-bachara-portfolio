# PROJECT CONTEXT: roman-deyneko-portfolio (Hardware, Embedded & Full-Stack)

> **Версія проєкту:** `v0.2.0` (Осінь 2026 / Branch: `roman-deyneko`)  
> **Локація:** `/Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio`  
> **Головна мета гілки `roman-deyneko`:** Персональне інженерне портфоліо Романа Дейнека (CTO, Lead Hardware, Embedded Systems, Automation & Full-Stack Architect).  

---

## 1. Контекст та Позиціонування
- **Особа:** Роман Дейнеко (Roman Deyneko / @roman / @neko), Пшехлево, Поморське воєводство, Польща.
- **Головна посада:**
  - **EN:** CTO / Lead Hardware, Embedded Systems & Full-Stack Architect
  - **PL:** Główny Inżynier Hardware, Systemów Wbudowanych i Full-Stack (CTO)
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
│
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
│   │   ├── 📁 api/                        # API routes (admin-auth, cv, ping, send-email, telegram-auth, visitors, intent, redirect-rules)
│   │   │   ├── 📁 admin-auth/             # Серверна безпека адмінки: SHA-256 HMAC PIN, валідація сесій, інвалідація старих токенів
│   │   │   ├── 📁 cv/                     # Динамічне завантаження резюме під мову (?lang=en|pl, Content-Disposition)
│   │   │   ├── 📁 visitors/               # Облік візитів, повна телеметрія (GPU/CPU/RAM, мережа, екран, IP, геолокація, клікстрім)
│   │   │   ├── 📁 intent/                 # Відстеження намірів рекрутерів (CV, контакти, воронка)
│   │   │   └── 📁 redirect-rules/         # Розумна маршрутизація гостьового трафіку (Smart Traffic Router)
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
│   └── 📁 lib/                            # Допоміжні утиліти (cn, formatting, intent-tracker, visitor-telemetry)
│       ├── 📄 intent-tracker.ts           # Утиліта відстеження high-intent подій рекрутерів
│       └── 📄 visitor-telemetry.ts        # Комплексний збір телеметрії (GPU WebGL, CPU, RAM, екран Retina, мережа, UTM)
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
4. **Рекрутерська та ATS-онтологія (Recruiter & Market Alignment):** Уникати презентації суто нішевих мікро-термінів (`ESP-NOW`, `ESP32-C6`, `Wiegand`) як самостійних первинних назв компетенцій. Використовувати загальноприйняті стандарти ринку праці (`Embedded C/C++ & FreeRTOS`, `Industrial Wireless IoT`, `Industrial Automation & PLC (Siemens S7)`, `Embedded Linux & Edge Gateways`, `Robotics & DFM`, `Full-Stack MES`), а для лідерських ролей (CTO / Tech Lead) — управлінські стандарти (`Agile & Scrum Delivery`, `Jira & Confluence`, `Lean Manufacturing & OEE`, `Engineering CAPEX / BOM Planning`, `Cross-Functional Leadership`), а конкретні плати, чипи та кейси показувати як залізобетонні технічні докази реалізації.

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


