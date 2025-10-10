# Руководство по анимации текста

## 📖 Обзор

Комбинированная система анимации текста, объединяющая два эффекта:

1. **Падающие буквы** - буквы падают сверху и встают на место
2. **Декодирование** - буквы появляются через эффект декодирования (линия → блок → текст)
3. **Комбинированный** - оба эффекта вместе для максимального эффекта

## 🚀 Быстрый старт

### Шаг 1: Подключите файлы

В `<head>` вашей HTML-страницы:

```html
<link rel="stylesheet" href="assets/css/text-animation.css" />
```

Перед закрывающим тегом `</body>`:

```html
<script src="assets/js/text-animation.js"></script>
```

### Шаг 2: Добавьте класс к тексту

```html
<h1 class="text-animate" data-animation-type="falling">Ваш текст здесь</h1>
```

Готово! Анимация запустится автоматически при загрузке страницы.

## 🎨 Типы анимации

### 1. Падающие буквы (`falling`)

Буквы падают сверху с размытием и встают на место.

```html
<h1 class="text-animate" data-animation-type="falling">Fullstack Developer</h1>
```

**Параметры:**

- Скорость падения: случайная для каждой буквы
- Размытие: от 5px до 0px
- Задержка: настраивается через `data-delay`

### 2. Декодирование (`decode`)

Буквы появляются через эффект декодирования: линия → блок → текст.

```html
<h1 class="text-animate" data-animation-type="decode">Code Create Innovate</h1>
```

**Эффект:**

- Состояние 1: тонкая вертикальная линия
- Состояние 2: цветной блок
- Состояние 3: видимый текст

### 3. Комбинированный (`combined`)

Сочетает оба эффекта: сначала падение, затем декодирование.

```html
<h1 class="text-animate" data-animation-type="combined">
  Глеб Чернов Portfolio
</h1>
```

**Этапы:**

1. Буквы падают сверху с размытием (60% времени)
2. Эффект декодирования при приземлении (40% времени)

## ⚙️ Параметры настройки

Все параметры передаются через `data-` атрибуты:

```html
<h1
  class="text-animate"
  data-animation-type="combined"
  data-delay="50"
  data-duration="1500"
  data-loop="true"
  data-loop-delay="5000"
>
  Ваш текст
</h1>
```

### Доступные параметры:

| Параметр              | Тип     | По умолчанию | Описание                                      |
| --------------------- | ------- | ------------ | --------------------------------------------- |
| `data-animation-type` | string  | `falling`    | Тип анимации: `falling`, `decode`, `combined` |
| `data-delay`          | number  | `50`         | Задержка между буквами (мс)                   |
| `data-duration`       | number  | `1000`       | Длительность анимации (мс)                    |
| `data-loop`           | boolean | `false`      | Повторять анимацию автоматически              |
| `data-loop-delay`     | number  | `5000`       | Пауза перед повтором (мс)                     |

## 📝 Примеры использования

### Заголовок с комбинированным эффектом

```html
<h1
  class="animated-gradient-text text-animate"
  data-animation-type="combined"
  data-delay="40"
  data-duration="1200"
>
  Глеб Чернов
</h1>
```

### Подзаголовок с падающими буквами

```html
<p
  class="subtitle text-animate"
  data-animation-type="falling"
  data-delay="30"
  data-duration="1000"
>
  Fullstack разработчик с расширенными компетенциями
</p>
```

### Слоган с автоповтором

```html
<h2
  class="text-animate"
  data-animation-type="decode"
  data-loop="true"
  data-loop-delay="4000"
>
  Junior++ Developer
</h2>
```

### Быстрая анимация для мобильных

```html
<h1
  class="text-animate"
  data-animation-type="falling"
  data-delay="20"
  data-duration="600"
>
  Быстрая анимация
</h1>
```

## 🎯 Программное управление

### Создание анимации через JavaScript

```javascript
// Создание новой анимации
const element = document.querySelector("#my-text");
const animation = new TextAnimation(element, {
  animationType: "combined",
  delay: 50,
  duration: 1200,
  loop: false,
  autoStart: true,
});

// Перезапуск анимации
animation.restart();
```

### Пример с кнопкой перезапуска

```html
<h1 id="animated-title" class="text-animate" data-animation-type="falling">
  Заголовок
</h1>
<button onclick="restartTitle()">Перезапустить</button>

<script>
  let titleAnimation;

  function restartTitle() {
    const element = document.querySelector("#animated-title");
    titleAnimation = new TextAnimation(element, {
      animationType: "falling",
      delay: 30,
      duration: 1000,
    });
  }
</script>
```

## 🎨 CSS классы и кастомизация

### Дополнительные классы

```html
<!-- Заголовок с градиентом -->
<h1 class="text-animate text-animation-heading">Большой заголовок</h1>

<!-- Подзаголовок -->
<h2 class="text-animate text-animation-subtitle">Подзаголовок</h2>

<!-- Быстрая анимация -->
<p class="text-animate text-animation-fast">Быстрый текст</p>

<!-- Медленная анимация -->
<p class="text-animate text-animation-slow">Медленный текст</p>

<!-- С отскоком -->
<p class="text-animate text-animation-bounce">Текст с отскоком</p>
```

### Кастомные стили

```css
/* Изменить цвет блока при декодировании */
.text-animation-letter::before {
  background: #ff6b6b; /* Ваш цвет */
}

/* Изменить время анимации */
.text-animation-letter {
  transition-duration: 2s;
}

/* Добавить свечение */
.text-animation-letter.state-3 {
  text-shadow: 0 0 20px currentColor;
}
```

## 📱 Адаптивность

Анимация автоматически адаптируется под разные устройства:

- **Десктоп**: полная анимация со всеми эффектами
- **Планшет**: упрощенная анимация (800ms)
- **Мобильные**: быстрая анимация (600ms)

### Отключение для экономии батареи

Пользователи с включенной настройкой "Reduced Motion" увидят текст сразу без анимации.

## 🔧 Интеграция с существующими стилями

### С градиентным текстом

```html
<h1 class="animated-gradient-text text-animate" data-animation-type="combined">
  Текст с градиентом
</h1>
```

### С существующими классами

Анимация работает с любыми классами:

```html
<h1 class="my-custom-class text-animate" data-animation-type="falling">
  Кастомный текст
</h1>
```

## 🎬 Демо-страница

Открыте `text-animation-demo.html` в браузере, чтобы увидеть все эффекты в действии.

## 📋 Где используется

Анимация текста уже интегрирована на следующих страницах:

- ✅ **index.html** - заголовок и подзаголовок на главной странице
- 🔜 **skills.html** - можно добавить к заголовкам навыков
- 🔜 **projects.html** - можно добавить к названиям проектов
- 🔜 **order.html** - можно добавить к ценам
- 🔜 **contacts.html** - можно добавить к контактам

## 🐛 Решение проблем

### Анимация не запускается

1. Проверьте, подключены ли файлы:

```html
<link rel="stylesheet" href="assets/css/text-animation.css" />
<script src="assets/js/text-animation.js"></script>
```

2. Проверьте, есть ли класс `.text-animate`:

```html
<h1 class="text-animate">Текст</h1>
```

### Буквы не видны

Убедитесь, что у родительского элемента не установлен `overflow: hidden`.

### Анимация слишком быстрая/медленная

Измените параметры:

```html
<h1 class="text-animate" data-delay="100" <!-- Больше="медленнее" -->
  data-duration="2000">
  <!-- Больше = дольше -->
  Текст
</h1>
```

## 💡 Советы по использованию

1. **Не переборщите**: используйте анимацию для 1-2 ключевых элементов на странице
2. **Мобильные устройства**: для мобильных используйте более быстрые анимации
3. **Производительность**: избегайте анимации длинных текстов (>50 символов)
4. **Читаемость**: дайте пользователю время прочитать текст перед повтором

## 📦 Файлы проекта

```
Project-Sp/
├── assets/
│   ├── css/
│   │   └── text-animation.css      # Стили анимации
│   └── js/
│       └── text-animation.js       # Логика анимации
├── text-animation-demo.html        # Демо-страница
└── README/
    └── TEXT-ANIMATION-GUIDE.md     # Это руководство
```

## 🎉 Готово!

Теперь вы можете использовать красивую анимацию текста на любой странице вашего сайта!
