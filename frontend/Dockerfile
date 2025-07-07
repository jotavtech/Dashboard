FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar resto da aplicação
COPY . .

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar aplicação em modo desenvolvimento
CMD ["npm", "start"] 