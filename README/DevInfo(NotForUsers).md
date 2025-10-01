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













    {
        id: 1,
        title: "Образовательная LMS платформа",
        description: "Полнофункциональная система управления обучением с видео-стримингом, тестированием и аналитикой успеваемости.",
        fullDescription: "Это масштабный проект образовательной платформы, который включает в себя все современные функции для дистанционного обучения. Система поддерживает потоковую передачу видео, интерактивные тесты, домашние задания и подробную аналитику для преподавателей. Особенность проекта - модульная архитектура, позволяющая легко расширять функциональность.",
        technologies: ["React", "Node.js", "MongoDB", "WebRTC", "Redis", "Docker"],
        category: "fullstack",
        image: "assets/images/project1.jpg",
        liveUrl: "https://education-platform.demo.com",
        githubUrl: "https://github.com/Sabitoshi/education-platform",
        featured: true,
        status: "completed"
    },
    {
        id: 2,
        title: "Десктопный клиент для управления проектами",
        description: "Кроссплатформенное приложение для управления задачами с оффлайн-режимом и синхронизацией в облаке.",
        fullDescription: "Десктопное приложение, разработанное с использованием Electron и React. Поддерживает все основные функции управления проектами: канбан-доски, временные линии, уведомления. Особенность - умная синхронизация, позволяющая работать оффлайн с последующей синхронизацией при появлении интернета.",
        technologies: ["Electron", "React", "SQLite", "WebSocket", "IndexedDB"],
        category: "desktop",
        image: "assets/images/project2.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/Sabitoshi/task-manager-desktop",
        featured: true,
        status: "completed"
    },
    {
        id: 3,
        title: "E-commerce платформа",
        description: "Многофункциональный интернет-магазин с системой рекомендаций, интеграцией платежей и админ-панелью.",
        fullDescription: "Современная e-commerce платформа с акцентом на пользовательский опыт. Включает умную систему рекомендаций на основе машинного обучения, несколько вариантов оплаты, систему отзывов и рейтингов. Админ-панель позволяет полностью управлять каталогом, заказами и клиентами.",
        technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Algolia"],
        category: "web",
        image: "assets/images/project3.jpg",
        liveUrl: "https://store.demo.com",
        githubUrl: "https://github.com/Sabitoshi/ecommerce-platform",
        featured: false,
        status: "completed"
    },
    {
        id: 4,
        title: "Система мониторинга серверов",
        description: "Веб-приложение для мониторинга состояния серверов и IT-инфраструктуры с оповещениями в реальном времени.",
        fullDescription: "Комплексная система мониторинга, позволяющая отслеживать состояние серверов, сетевого оборудования и приложений. Включает дашборды с графиками, систему оповещений через различные каналы (Email, Telegram, Slack) и историю инцидентов.",
        technologies: ["React", "Python", "FastAPI", "PostgreSQL", "WebSocket"],
        category: "fullstack",
        image: "assets/images/project4.jpg",
        liveUrl: "https://monitoring.demo.com",
        githubUrl: "https://github.com/Sabitoshi/server-monitoring",
        featured: false,
        status: "in-progress"
    },
    {
        id: 5,
        title: "Мобильное приложение для фитнеса",
        description: "React Native приложение с трекингом тренировок, питанием и прогрессом. Интеграция с wearable устройствами.",
        fullDescription: "Кроссплатформенное мобильное приложение для ведения здорового образа жизни. Включает планировщик тренировок, трекинг питания, мониторинг прогресса и социальные функции. Интегрируется с популярными фитнес-трекерами и умными часами.",
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Apple HealthKit"],
        category: "web",
        image: "assets/images/project5.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/Sabitoshi/fitness-app",
        featured: false,
        status: "completed"
    },
    {
        id: 6,
        title: "API для социальной сети разработчиков",
        description: "Масштабируемый backend для социальной платформы с реальным временем, уведомлениями и системой репутации.",
        fullDescription: "Высоконагруженный backend для социальной сети, ориентированной на разработчиков. Включает систему постов, комментариев, лайков, подписок, личных сообщений и уведомлений в реальном времени. Реализована система репутации на основе активности пользователей.",
        technologies: ["Node.js", "GraphQL", "PostgreSQL", "Redis", "WebSocket"],
        category: "web",
        image: "assets/images/project6.jpg",
        liveUrl: "https://api.dev-community.com",
        githubUrl: "https://github.com/Sabitoshi/dev-social-api",
        featured: false,
        status: "completed"
    }