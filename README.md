# Браузерная игра Race

### Об игре

Гонки на двоих

### Информация

Игра была написана в рамках изучения курса на Udemy по Phaser.js

## Курс: https://www.udemy.com/course/phaser-3/

---

Установка приложения
```sh
npm install
```

Сборка приложения
```sh
npm run build
```

Запуск
```sh
node server.js
```

Сборка и запуск игры в контейнере
```sh
docker build -f server.dockerfile . -t race:v0.0.$version
docker run -d -p 8080:3000 race:v0.0.$version
```
