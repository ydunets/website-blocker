# React Query (TanStack Query)

Мощная библиотека для синхронизации данных в React-приложениях, которая управляет серверным состоянием с автоматическим кешированием, дедупликацией и фоновыми обновлениями.

## Основные концепции

### 1. Декларативная выборка данных
**Что это значит:** Определяете какие данные нужны, а не как их получить.

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId)
});
```

**Преимущества:**
- Нет ручного управления состоянием (loading, error, data)
- Автоматическая логика повторных попыток
- Встроенные состояния загрузки и ошибок
- Компонент автоматически перерисовывается при изменении данных

**Глубокое погружение:** Вместо императивных паттернов (useEffect + useState), вы декларируете зависимости данных. React Query обрабатывает весь жизненный цикл: загрузку, кеширование, обработку ошибок и повторную загрузку.

### 2. Дедупликация запросов
**Что это значит:** Несколько компонентов, запрашивающих одни и те же данные, приводят к выполнению только ОДНОГО сетевого запроса.

```typescript
// Компонент A
useQuery({ queryKey: ['user', 1], queryFn: fetchUser });

// Компонент B (отрисован одновременно)
useQuery({ queryKey: ['user', 1], queryFn: fetchUser });
// ✅ Выполняется только ОДИН запрос
```

**Преимущества:**
- Исключает избыточные сетевые запросы
- Снижает нагрузку на сервер
- Улучшает производительность приложения
- Предотвращает состояния гонки (race conditions)

**Глубокое погружение:** React Query использует queryKey как уникальный идентификатор. Когда несколько компонентов одновременно используют один и тот же queryKey, выполняется только первый запрос. Остальные компоненты подписываются на результат этого же запроса.

### 3. Автоматическое кеширование
**Что это значит:** Результаты запросов кешируются и переиспользуются во всем приложении.

**Жизненный цикл кеша:**
- **Fresh (свежие)**: Данные свежие (в пределах `staleTime`)
- **Stale (устаревшие)**: Данные устарели, но все еще отображаются (после `staleTime`)
- **Inactive (неактивные)**: Ни один компонент не использует этот запрос
- **Garbage Collection (сборка мусора)**: Неактивные данные удаляются (после `gcTime`)

**Конфигурация:**
```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 минут - данные остаются свежими
  gcTime: 10 * 60 * 1000,   // 10 минут - время хранения в кеше
});
```

**Преимущества:**
- Мгновенные обновления UI (данные из кеша)
- Сокращение количества сетевых запросов
- Лучший пользовательский опыт
- Работа офлайн с кешированными данными

**Глубокое погружение:** Когда вы возвращаетесь на страницу, React Query мгновенно отдает кешированные данные (даже если они устарели), а затем в фоновом режиме делает запрос для их обновления. Это обеспечивает мгновенную обратную связь, гарантируя актуальность данных.

### 4. Ручное управление кешем
**Что это значит:** Программное управление обновлением и инвалидацией кеша.

**Инвалидация (повторная загрузка данных):**
```typescript
// Пометить запросы как устаревшие и перезагрузить
queryClient.invalidateQueries({ queryKey: ['users'] });

// Инвалидировать несколько связанных запросов
queryClient.invalidateQueries({ queryKey: ['users', userId] });
```

**Прямое обновление кеша:**
```typescript
// Оптимистичное обновление
queryClient.setQueryData(['user', userId], (old) => ({
  ...old,
  name: 'Новое имя'
}));

// После мутации
useMutation({
  mutationFn: updateUser,
  onSuccess: (data) => {
    queryClient.setQueryData(['user', data.id], data);
  }
});
```

**Преимущества:**
- Оптимистичные обновления для мгновенной обратной связи
- Гранулярный контроль над актуальностью данных
- Эффективные стратегии инвалидации кеша
- Предотвращение ненужных повторных загрузок

**Глубокое погружение:** После мутаций (POST, PUT, DELETE) можно либо инвалидировать запросы для перезагрузки, либо напрямую обновить кеш. Оптимистичные обновления показывают изменения мгновенно до подтверждения сервером, с автоматическим откатом при ошибке.

## Дополнительные возможности

### 5. Фоновая перезагрузка
Автоматическая перезагрузка данных когда:
- Окно получает фокус (`refetchOnWindowFocus`)
- Сеть восстанавливается (`refetchOnReconnect`)
- Компонент перемонтируется (`refetchOnMount`)
- По интервалу (`refetchInterval`)

### 6. Пагинация и бесконечные запросы
```typescript
// Пагинация
useQuery({
  queryKey: ['users', page],
  queryFn: () => fetchUsers(page)
});

// Бесконечная прокрутка
useInfiniteQuery({
  queryKey: ['users'],
  queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage
});
```

### 7. Мутации
Обработка изменений данных с автоматическим обновлением кеша:
```typescript
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
});
```

### 8. Зависимые запросы
```typescript
// Зависимый запрос - выполняется только когда userId существует
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId
});

const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user?.id
});
```

## Лучшие практики

1. **Структурированные ключи запросов:** Используйте массивы с иерархической структурой
   ```typescript
   ['users'] // все пользователи
   ['users', userId] // конкретный пользователь
   ['users', userId, 'posts'] // посты пользователя
   ```

2. **Правильный staleTime:** Устанавливайте в зависимости от изменчивости данных
   - Данные реального времени: 0ms
   - Частые обновления: 30s - 1min
   - Статический контент: 5-10min
   - Редко меняющиеся: Infinity

3. **Используйте мутации для обновлений:** Всегда используйте `useMutation` для операций POST/PUT/DELETE

4. **Глобальные настройки по умолчанию:** Настройте общие параметры в QueryClient
   ```typescript
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 60 * 1000,
         retry: 1,
       },
     },
   });
   ```

## Распространенные паттерны

### Оптимистичные обновления
```typescript
useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries(['user', newUser.id]);
    const previous = queryClient.getQueryData(['user', newUser.id]);
    queryClient.setQueryData(['user', newUser.id], newUser);
    return { previous };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['user', newUser.id], context.previous);
  },
  onSettled: (newUser) => {
    queryClient.invalidateQueries(['user', newUser.id]);
  }
});
```

### Предзагрузка
```typescript
// Предзагрузка данных перед навигацией
const prefetchUser = async (userId: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
};
```