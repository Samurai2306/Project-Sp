# 🛠 Инструкция по настройке портфолио

## 📝 Быстрый старт

### 1. Замени персональную информацию

**В index.html:**
```html
<!-- Заголовок -->
<title>Глеб Чернов | Fullstack разработчик</title>

<!-- Описание -->
<meta name="description" content="Портфолио Глеба Чернова - Fullstack разработчика, студента РТУ МИРЭА">

<!-- Hero секция -->
<h1 class="animated-gradient-text">Глеб Чернов</h1>
<p class="subtitle typing-animation">Fullstack разработчик & Студент РТУ МИРЭА</p>
В skills.html и projects.html аналогично обнови заголовки и описания.

2. Настрой контакты
Во всех HTML файлах обнови ссылки:

html
<!-- Telegram -->
<a href="https://t.me/Sabitoshi" class="contact-card glass-card" target="_blank" rel="noopener">

<!-- GitHub -->
<a href="https://github.com/Sabitoshi" class="contact-card glass-card" target="_blank" rel="noopener">

<!-- Email -->
<a href="mailto:undertale2006rus@gmail.com" class="contact-card glass-card">
3. Добавь свои проекты
В assets/js/projects.js замени массив projectsData:

javascript
const projectsData = [
    {
        id: 1,
        title: "Название проекта",
        description: "Краткое описание",
        fullDescription: "Подробное описание проекта",
        technologies: ["React", "Node.js", "MongoDB"],
        category: "web", // или "desktop", "fullstack"
        image: "assets/images/project1.jpg",
        liveUrl: "https://demo.com", // или "#" если нет демо
        githubUrl: "https://github.com/username/repo",
        featured: true, // избранный проект
        status: "completed" // или "in-progress"
    },
    // Добавь остальные проекты...
];
🎨 Кастомизация дизайна
Цветовая схема
В assets/css/style.css измени CSS переменные:

css
:root {
    --color-primary: #8B5FBF;    /* Основной цвет */
    --color-secondary: #6D28D9;  /* Вторичный цвет */
    --color-accent: #A78BFA;     /* Акцентный цвет */
    --color-bg: #0f0f1a;         /* Фон */
    --color-text: #ffffff;       /* Текст */
}
Шрифты
Сайт использует системные шрифты для лучшей производительности. Чтобы изменить:

css
body {
    font-family: 'Your Font', system-ui, sans-serif;
}
📱 Мобильная оптимизация
Изображения
Используй форматы WebP для лучшего сжатия

Оптимальный размер: 800x600px

Названия: project1.jpg, project2.jpg...

Добавь в папку assets/images/

Производительность
Все изображения используют lazy loading

Анимации отключаются при prefers-reduced-motion

Оптимизированная загрузка шрифтов

🚀 Деплой
Вариант 1: GitHub Pages (бесплатно)
Создай репозиторий на GitHub

Загрузи все файлы

В настройках репозитория включи GitHub Pages

Сайт будет доступен по адресу: https://username.github.io/repository-name

Вариант 2: Netlify (рекомендуется)
Перейди на netlify.com

Перетащи папку проекта в область деплоя

Получи домен вида: your-site.netlify.app

Вариант 3: Vercel
Подключи GitHub репозиторий на vercel.com

Нажми Deploy

Готово!

🔧 Расширенные настройки
Google Analytics
Добавь перед закрывающим </head> в index.html:

html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
PWA (Progressive Web App)
Добавь manifest.json и сервис воркер для оффлайн работы.

Форма обратной связи
Интегрируй сервисы типа Formspree или Netlify Forms.

💡 Советы по контенту
Проекты
Используй качественные скриншоты

Пиши подробные описания с акцентом на технологии

Указывай реальные ссылки на GitHub и живые демо

Группируй по категориям (веб, десктоп, fullstack)

Навыки
Будь не честен в оценке уровня

Группируй по категориям

Добавляй актуальные технологии

Указывай не реальный опыт

О себе
Расскажи о своих интересах в IT

Упомяни образование и курсы

Добавь профессиональные цели

Покажи passion к технологиям

🐛 Поиск и решение проблем
Изображения не загружаются
Проверь пути к файлам

Убедись что файлы существуют

Проверь права доступа

Анимации не работают
Проверь подключение GSAP

Посмотри консоль браузера на ошибки

Убедись что элементы существуют в DOM

Мобильное меню не открывается
Проверь JavaScript консоль

Убедись что файл main.js загружен

Проверь CSS классы

🔄 Обновления
Чтобы обновить портфолио:

Внеси изменения в файлы

Протестируй локально

Задеплой новую версию

Проверь live версию