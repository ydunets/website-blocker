# Tailwind CSS

CSS-фреймворк, основанный на утилитарных классах, который предоставляет низкоуровневые служебные классы для создания кастомных дизайнов прямо в разметке без написания пользовательского CSS.

## Основные концепции

### 1. Утилитарный подход (Utility-First)
**Что это значит:** Стилизация элементов с использованием предопределенных утилитарных классов вместо написания пользовательского CSS.

```tsx
// Традиционный CSS подход
<div className="card">
  <h2 className="card-title">Заголовок</h2>
</div>

// Утилитарный подход Tailwind
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-800">Заголовок</h2>
</div>
```

**Преимущества:**
- Нет переключения контекста между HTML и CSS файлами
- Не нужно придумывать названия классов
- Размер CSS-бандла не растет с новыми функциями
- Безопасно удалять компоненты (стили находятся рядом)

**Глубокое погружение:** Вместо семантических имен классов, которые абстрагируют стили, вы композируете дизайн используя атомарные утилитарные классы. Это сохраняет решения по стилизации видимыми в разметке и исключает "зомби CSS" (неиспользуемые стили в кодовой базе).

### 2. Адаптивный дизайн
**Что это значит:** Применение разных стилей на разных точках останова с использованием адаптивных префиксов.

**Система точек останова:**
- `sm:` - ≥640px (мобильный ландшафт)
- `md:` - ≥768px (планшет)
- `lg:` - ≥1024px (десктоп)
- `xl:` - ≥1280px (большой десктоп)
- `2xl:` - ≥1536px (очень большой)

```tsx
<div className="
  w-full           // Мобильный: 100% ширина
  md:w-1/2         // Планшет: 50% ширина
  lg:w-1/3         // Десктоп: 33% ширина
  p-4              // Все: padding 1rem
  md:p-6           // Планшет+: padding 1.5rem
">
  Адаптивный контент
</div>
```

**Преимущества:**
- Mobile-first по умолчанию
- Четкая видимость точек останова в разметке
- Не нужно управлять media queries
- Легко изменять стили для каждой точки останова

**Глубокое погружение:** Tailwind использует mobile-first подход - утилиты без префикса применяются ко всем размерам экрана, в то время как с префиксом переопределяют на больших экранах. Это поощряет прогрессивное улучшение и сохраняет адаптивную логику видимой.

### 3. Варианты состояний
**Что это значит:** Условное применение стилей на основе состояния элемента с использованием префиксов псевдоклассов.

**Распространенные варианты:**
```tsx
// Состояние наведения
<button className="bg-blue-500 hover:bg-blue-700">
  Наведите на меня
</button>

// Состояние фокуса
<input className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

// Активное состояние
<button className="scale-100 active:scale-95">
  Нажмите
</button>

// Неактивное состояние
<button className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
  Отправить
</button>

// Групповое наведение (наведение на родителя влияет на потомка)
<div className="group">
  <div className="opacity-0 group-hover:opacity-100">
    Появляется при наведении на родителя
  </div>
</div>

// Состояние соседа (состояние соседнего элемента влияет на элемент)
<input className="peer" type="checkbox" />
<label className="peer-checked:text-blue-500">
  Label меняется когда чекбокс отмечен
</label>
```

**Преимущества:**
- Не нужен JavaScript для простых взаимодействий
- Четкое поведение состояний в разметке
- Единообразные паттерны взаимодействия
- Типобезопасность с TypeScript

**Глубокое погружение:** Варианты состояний используют CSS-псевдоклассы под капотом, но предоставляют более чистый синтаксис. Утилиты `group` и `peer` позволяют организовать взаимодействие родитель-потомок и между соседями без JavaScript, покрывая большинство потребностей UI.

### 4. Дизайн-система через конфигурацию
**Что это значит:** Кастомизация дизайн-токенов (цвета, отступы, шрифты) в `tailwind.config.js`.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: '#FF6B6B',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
```

**Использование:**
```tsx
<div className="bg-primary-500 text-brand p-72 rounded-4xl font-sans">
  Кастомный тематический контент
</div>
```

**Преимущества:**
- Централизованная дизайн-система
- Единообразные дизайн-токены во всем приложении
- Простое изменение темы
- Типобезопасность с Tailwind IntelliSense

**Глубокое погружение:** Конфигурация создает единый источник истины для вашей дизайн-системы. Использование `extend` сохраняет значения по умолчанию Tailwind, добавляя кастомные. Это обеспечивает консистентность дизайна и делает ребрендинг тривиальным.

### 5. Извлечение компонентов
**Что это значит:** Извлечение повторяющихся комбинаций утилит в переиспользуемые компоненты при необходимости.

**Когда извлекать:**
- Паттерн повторяется 3+ раза
- Сложные комбинации утилит
- Нужен семантический смысл

```tsx
// До: Повторяющиеся утилиты
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
  Кнопка 1
</button>
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
  Кнопка 2
</button>

// После: Извлеченный компонент
const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
    {children}
  </button>
);

<Button>Кнопка 1</Button>
<Button>Кнопка 2</Button>

// Альтернатива: Использование @apply в CSS (использовать умеренно)
// styles.css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition;
}
```

**Преимущества:**
- Принцип DRY когда это уместно
- Сохранение компонентной архитектуры
- Легко изменить все экземпляры
- Можно добавить пропсы для вариантов

**Глубокое погружение:** Избегайте преждевременного извлечения - дублирование утилит часто нормально. Извлекайте когда есть настоящее переиспользование или нужны пропсы/логика. React/Vue компоненты предпочтительнее `@apply`, так как они более гибкие и сохраняют стили в JavaScript.

## Продвинутые возможности

### 6. Темный режим
**Что это значит:** Применение разных стилей в темном режиме с использованием префикса `dark:`.

**Конфигурация:**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // или 'media' для системных предпочтений
  // ...
};
```

**Использование:**
```tsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
">
  Адаптируется к темному режиму
</div>

// Переключение темного режима (со стратегией class)
<html className={isDark ? 'dark' : ''}>
```

**Преимущества:**
- Встроенная поддержка темного режима
- Нет дублирования стилей
- Стратегии по классу или системным предпочтениям
- Единообразие во всех компонентах

### 7. Произвольные значения
**Что это значит:** Использование кастомных значений, когда дизайн-токены не подходят, через квадратные скобки.

```tsx
<div className="
  w-[347px]              // Точная ширина
  bg-[#1da1f2]           // Кастомный цвет
  top-[117px]            // Точная позиция
  grid-cols-[1fr_500px_2fr]  // Кастомный grid
  before:content-['★']   // Кастомный контент
">
  Кастомные значения
</div>
```

**Преимущества:**
- Выход для разовых значений
- Не нужны изменения в конфигурации
- Сохраняет синтаксис утилит
- Все еще работает PurgeCSS

**Глубокое погружение:** Произвольные значения полезны для разовых случаев, но частое использование предполагает отсутствие дизайн-токенов. Добавляйте часто используемые значения в конфигурацию для консистентности.

### 8. Анимации и переходы
**Что это значит:** Встроенные утилиты для анимаций и плавных переходов.

```tsx
// Переходы
<button className="
  transition                    // Все свойства
  transition-colors             // Только цвета
  duration-300                  // Длительность 300ms
  ease-in-out                   // Функция плавности
  hover:scale-110               // Трансформация при наведении
">
  Анимированная кнопка
</button>

// Встроенные анимации
<div className="animate-spin">Загрузка...</div>
<div className="animate-pulse">Скелетон</div>
<div className="animate-bounce">Уведомление</div>

// Кастомные анимации в конфигурации
// tailwind.config.js
theme: {
  extend: {
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
    },
  },
}

// Использование
<div className="animate-wiggle">Покачивание</div>
```

### 9. Grid и Flexbox
**Что это значит:** Комплексные утилиты для современных CSS макетов.

```tsx
// Flexbox
<div className="
  flex                    // display: flex
  flex-col               // flex-direction: column
  items-center           // align-items: center
  justify-between        // justify-content: space-between
  gap-4                  // gap: 1rem
">
  {/* Flex элементы */}
</div>

// Grid
<div className="
  grid                   // display: grid
  grid-cols-1            // 1 колонка на мобильном
  md:grid-cols-2         // 2 колонки на планшете
  lg:grid-cols-3         // 3 колонки на десктопе
  gap-6                  // промежуток между элементами
  auto-rows-fr           // равная высота строк
">
  {/* Grid элементы */}
</div>

// Subgrid (современные браузеры)
<div className="grid grid-cols-3">
  <div className="col-span-3 grid grid-cols-subgrid">
    {/* Наследует grid родителя */}
  </div>
</div>
```

### 10. Container Queries
**Что это значит:** Стилизация элементов на основе размера контейнера, а не viewport.

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require('@tailwindcss/container-queries')],
};
```

```tsx
<div className="@container">
  <div className="
    @sm:text-lg        // Когда контейнер ≥ 24rem
    @md:grid-cols-2    // Когда контейнер ≥ 28rem
    @lg:grid-cols-3    // Когда контейнер ≥ 32rem
  ">
    Реагирует на контейнер, а не viewport
  </div>
</div>
```

## Лучшие практики

### 1. Используйте единообразную шкалу отступов
Придерживайтесь шкалы отступов Tailwind (0, 1, 2, 4, 6, 8...) для визуальной консистентности:
```tsx
// Хорошо
<div className="p-4 mb-6 gap-8">

// Избегайте произвольных, если не обязательно
<div className="p-[17px] mb-[25px]">
```

### 2. Организуйте классы логично
```tsx
// Рекомендуемый порядок:
<div className="
  // Layout
  flex items-center justify-between
  // Spacing
  p-4 mb-6
  // Sizing
  w-full h-32
  // Typography
  text-lg font-bold
  // Visual
  bg-blue-500 rounded-lg shadow
  // Interactive
  hover:bg-blue-700 transition
">
```

### 3. Используйте JIT режим (Just-In-Time)
Включен по умолчанию в Tailwind v3+:
- Генерирует стили по требованию
- Все варианты доступны без конфигурации
- Меньшие сборки для разработки
- Мгновенное время сборки

### 4. Используйте IntelliSense
Установите расширение Tailwind CSS IntelliSense для:
- Автодополнения
- Предпросмотра CSS при наведении
- Линтинга имен классов
- Подсветки синтаксиса

### 5. Правильно настройте PurgeCSS
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  // Это гарантирует удаление неиспользуемых стилей в продакшене
};
```

### 6. Используйте Tailwind Merge для условных классов
```tsx
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Вспомогательная функция
const cn = (...inputs: any[]) => twMerge(clsx(inputs));

// Использование - правильно обрабатывает конфликтующие классы
<div className={cn(
  'p-4 bg-blue-500',
  isError && 'bg-red-500',  // bg-red-500 переопределяет bg-blue-500
  className
)} />
```

## Распространенные паттерны

### Градиентные фоны
```tsx
<div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  Градиентный фон
</div>
```

### Стеклянный морфизм
```tsx
<div className="
  bg-white/10
  backdrop-blur-lg
  border border-white/20
  rounded-xl
  shadow-xl
">
  Эффект стекла
</div>
```

### Компонент карточки
```tsx
<div className="
  bg-white dark:bg-gray-800
  rounded-lg
  shadow-md hover:shadow-xl
  transition-shadow
  p-6
  border border-gray-200 dark:border-gray-700
">
  Содержимое карточки
</div>
```

### Скелетон загрузки
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-4 bg-gray-200 rounded"></div>
  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
</div>
```

### Соотношение сторон
```tsx
<div className="aspect-video bg-gray-200">
  Соотношение 16:9
</div>

<div className="aspect-square bg-gray-200">
  Соотношение 1:1
</div>
```

### Обрезка текста
```tsx
// Одна строка
<p className="truncate">
  Очень длинный текст, который будет обрезан многоточием...
</p>

// Несколько строк
<p className="line-clamp-3">
  Длинный текст, который будет обрезан до 3 строк с многоточием в конце...
</p>
```

## Советы по производительности

1. **Держите продакшен-сборки маленькими:** Используйте правильную конфигурацию PurgeCSS
2. **Избегайте динамических имен классов:** Не собирайте классы конкатенацией строк
   ```tsx
   // Плохо - классы не будут обнаружены
   <div className={`text-${color}-500`}>

   // Хорошо - используйте полные имена классов
   <div className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}>
   ```
3. **Используйте safelist для динамических классов:**
   ```javascript
   // tailwind.config.js
   module.exports = {
     safelist: ['text-blue-500', 'text-red-500'],
   };
   ```
4. **Включите JIT режим:** Быстрее сборки и все варианты доступны
5. **Используйте CDN только для прототипирования:** Всегда собирайте для продакшена
