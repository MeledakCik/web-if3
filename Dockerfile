# Gunakan image Node.js versi LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin file konfigurasi dan dependensi
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code Next.js
COPY . .

# Build Next.js (untuk production)
RUN npm run build

# Expose port Next.js
EXPOSE 3000

# Jalankan Next.js
CMD ["npm", "run", "start"]
