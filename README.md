# Internet-newspaper

  

# Запуск проекта "Internet-newspaper" с использованием Docker Compose.

  

## Данный проект использует технологию Docker Compose, для его запуска необходимо запустить Docker и выполнить следующие шаги:

  

### Шаг 1: Скачать архив проекта

![Скачивание архива с github](https://habrastorage.org/webt/62/a2/d2/62a2d24bf14e8982881903.png)
  

### Шаг 2: Необходимо разархивировать папку и перейти в директорию 'docker-compose'
```bash

% ls
% README.md  docker-compose  frontend_internet_newspaper
% cd docker-compose
```

### Шаг 3: Выполнить команду docker-compose up

```bash

docker-compose  up

```

### Шаг 4: Перейти на страницу с последними новостями

```bash

http://localhost:5173

```

## В данном приложении есть 2 роли: АDMIN и USER. Назначение роли ADMIN происходит строго через БД, а USER через регистрацию.

  

## В приложении уже добавлены новости и пользователи.

  

## Email: aleksandrov@yandex.ru password: Aleksandrov47 - ADMIN

  

## Email: sokolova@yandex.ru password: Sokolova92 - USER

  

## Email: denisov@yandex.ru password: Denisov198 - USER