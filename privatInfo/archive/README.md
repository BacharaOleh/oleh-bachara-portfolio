# Архів документів та резюме (privatInfo/archive)

Цей каталог містить архівні версії резюме, дипломних матеріалів, проєктних нотаток та контактів Романа Дейнека.
Усі документи конвертовані в чистий, семантично структурований Markdown у папці `markdown/` для швидкого читання та аналізу ШІ-агентами. Оригінальні файли збережені у папці `originals/`.

---

## 1. Структуровані документи Markdown (`markdown/`)

| Файл | Цільова роль / Тема | Мова | Першоджерело | Опис |
| :--- | :--- | :--- | :--- | :--- |
| [`01_cv_master_all.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/01_cv_master_all.md) | Master CV (Зведене резюме) | PL / EN / UK | `all cv.docx` | Об'єднує 3 версії резюме: Android (KasaMobile), англомовне (SmartShop) та автоматик (San-Pajda / UR-5). |
| [`02_cv_embedded_automatyk_11-7.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/02_cv_embedded_automatyk_11-7.md) | Inżynier Automatyk & Embedded (11-7) | PL | `CV_Roman_Deyneko11-7.*` | Найбільш детальне резюме: Colorland Rzeszów, San-Pajda, ZUT Kunzek, MostCentrService, курси Erasmus Ljubljana, робот UR-5, KasaMobile, MQTT, Matlab. |
| [`03_cv_automatyk_programista.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/03_cv_automatyk_programista.md) | Automatyk-Programista | PL | `CV automatyk-programista.pdf` / `CVdopracy.pl` | Резюме інженера з автоматизації та обслуговування ліній (San-Pajda, ZUT Kunzek, HC-05, UR-5). |
| [`04_cv_android_chmura.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/04_cv_android_chmura.md) | Android Developer (Szkoła w Chmurze) | PL | `android chmura/CV.*` | Спеціалізоване резюме для мобільної розробки: Jetpack Compose, MVVM, Hilt, Clean Architecture, Bluetooth, CameraX, Room. |
| [`05_cv_english_smartshop.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/05_cv_english_smartshop.md) | Android & Embedded (SmartShop) | EN | `godinnik/cv.docx` | Англомовне резюме: Most Centrum Serwis, проєкт SmartShop (Bluetooth + Serial COM port), ступінь інженера PANS Jarosław. |
| [`06_notes_kasy_fiskalne.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/06_notes_kasy_fiskalne.md) | Контакти виробників кас | PL / UK | `kasy fiskalne.odt` | Контакти сервісу та R&D виробників Posnet, Datex, Elzab для апаратної інтеграції. |
| [`07_notes_automatyka.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/privatInfo/archive/markdown/07_notes_automatyka.md) | Промислова автоматика (Phoenix Contact) | PL | `automatyka.docx` | Нотатка щодо промислових модулів та шаф керування Phoenix Contact. |

---

## 2. Збережені оригінали (`originals/`)

Оригінальні двійкові файли впорядковані за підкаталогами:
- `originals/cv_master/`: `all cv.docx`
- `originals/cv_11-7/`: `CV_Roman_Deyneko11-7.docx`, `CV_Roman_Deyneko11-7.odt`, `CV_Roman_Deyneko11-7.pdf`
- `originals/cv_automatyk/`: `CV automatyk-programista.pdf`, `CV.pdf`, `CVdopracy.pl - Twoje CV.docx`
- `originals/cv_android_chmura/`: `CV.docx`, `CV.pdf`
- `originals/cv_smartshop_en/`: `cv.docx`
- `originals/san_pajda/`: `CV_Roman_Deyneko11-7.pdf`
- `originals/notes/`: `kasy fiskalne.odt`, `automatyka.docx`

---

## 3. Як використовувати цей архів
- **Для ШІ:** Завжди читайте файли з каталогу `markdown/` за допомогою `view_file` або шукайте в них через `grep_search`. Не потрібно запускати додаткові конвертери чи парсери.
- **Для оновлення портфоліо:** Будь-які нові факти біографії, технології чи реалізовані проєкти звіряйте з `01_cv_master_all.md` та `02_cv_embedded_automatyk_11-7.md`, а головним джерелом правди для коду залишається [`ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md`](file:///Users/neko/Documents/PlatformIO/Projects/oleh-bachara-portfolio/ROMAN_DEYNEKO_PROFILE_SOURCE_OF_TRUTH.md).
