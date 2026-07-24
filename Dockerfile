FROM node:20-alpine AS builder

WORKDIR /app
ARG BUILD_ENV=release

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:${BUILD_ENV}

FROM nginx:1.27-alpine AS runner
ARG BUILD_ENV=release

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/${BUILD_ENV} /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
