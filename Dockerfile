# Используем версию Node.js 14
FROM node:14

# Установка Python 3
RUN apt-get update && apt-get install -y python3

# Установка зависимостей
WORKDIR /app
COPY package*.json ./
RUN npm install

# Копирование остальных файлов
COPY . .

# Сборка проекта
RUN npm run build

# Установка переменных окружения
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

# Открытие порта 3000
EXPOSE 3000

# Запуск приложения


CMD ["node", "dist/server.js"]
