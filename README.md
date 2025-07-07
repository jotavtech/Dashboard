# 🌟 Dashboard Personalizado com Personalidade

Um dashboard interativo e personalizado que representa a personalidade de uma pessoa de forma visual, única e funcional.

## 🚀 Tecnologias

### Backend
- **Laravel 8** - Framework PHP
- **SQLite** - Banco de dados
- **Laravel Sanctum** - Autenticação API

### Frontend  
- **React 18** - Biblioteca JavaScript
- **Material-UI (MUI)** - Biblioteca de componentes
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema completo de login e cadastro
- Autenticação baseada em tokens (Sanctum)
- Proteção de rotas

### 🎨 Dashboard Personalizado
- **Frase do Dia** - Mensagem personalizada motivacional
- **Humor do Dia** - Seletor de humor com emojis coloridos
- **Personalidade** - Exibição de características e cores favoritas
- **Hobbies & Objetivos** - Sistema completo de gerenciamento de hobbies com:
  - Ícones personalizados
  - Cores temáticas
  - Barras de progresso
  - Metas e objetivos
- **Gráfico de Progresso** - Visualização do desenvolvimento pessoal

### 🌙 Temas e Personalização
- **Modo Dark/Light** - Alternância automática de temas
- **Cores Personalizadas** - Paleta de cores configurável
- **Interface Responsiva** - Funciona em todos os dispositivos
- **Animações Suaves** - Transições elegantes com Material-UI

### ⚡ Recursos Avançados
- **Auto Save** - Salvamento automático das configurações
- **Modais Interativos** - Edição fácil de perfil e hobbies
- **Feedback Visual** - Indicadores de progresso e conquistas
- **API RESTful** - Backend completo com endpoints documentados

## 🐳 Instalação com Docker

### Pré-requisitos
- Docker
- Docker Compose

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd Dashboard
```

### 2. Execute com Docker Compose
```bash
docker-compose up --build
```

### 3. Acesse a aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 💻 Instalação Local

### Backend (Laravel)

1. **Navegue para o diretório backend**
```bash
cd backend
```

2. **Instale as dependências**
```bash
composer install
```

3. **Configure o ambiente**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure o banco SQLite**
```bash
touch database/data/database.sqlite
php artisan migrate
```

5. **Inicie o servidor**
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

### Frontend (React)

1. **Navegue para o diretório frontend**
```bash
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
```

4. **Inicie a aplicação**
```bash
npm start
```

## 📱 Como Usar

### 1. Criar Conta
- Acesse http://localhost:3000
- Clique em "Cadastre-se aqui"
- Preencha seus dados e crie sua conta

### 2. Personalizar Dashboard
- **Frase do Dia**: Clique no ícone de edição para personalizar sua mensagem
- **Humor**: Selecione como você está se sentindo hoje
- **Cores**: Escolha suas cores favoritas que definirão o tema do dashboard
- **Hobbies**: Adicione seus hobbies com ícones, cores e metas

### 3. Acompanhar Progresso
- Visualize seu progresso em cada hobby
- Acompanhe suas conquistas e metas
- Use o gráfico de progresso geral para ver seu desenvolvimento

## 🎯 Estrutura do Projeto

```
Dashboard/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/API/
│   │   │   ├── AuthController.php
│   │   │   └── DashboardController.php
│   │   └── Models/
│   │       ├── User.php
│   │       ├── DashboardSettings.php
│   │       └── UserHobby.php
│   ├── database/
│   │   ├── migrations/
│   │   └── data/            # SQLite database
│   └── routes/api.php
│
├── frontend/                # React App
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── context/         # Context API (Auth, Theme)
│   │   ├── pages/           # Páginas principais
│   │   ├── services/        # API services
│   │   └── App.js
│   └── public/
│
├── docker-compose.yml       # Orquestração Docker
└── README.md
```

## 🔧 API Endpoints

### Autenticação
- `POST /api/register` - Registrar usuário
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/me` - Dados do usuário

### Dashboard
- `GET /api/dashboard` - Dados completos do dashboard
- `PUT /api/profile` - Atualizar perfil
- `GET /api/hobbies` - Listar hobbies
- `POST /api/hobbies` - Criar hobby
- `PUT /api/hobbies/{id}` - Atualizar hobby
- `DELETE /api/hobbies/{id}` - Excluir hobby
- `POST /api/settings` - Salvar configuração

## 🎨 Capturas de Tela

### Tela de Login
Interface moderna com glassmorphism e gradientes suaves.

### Dashboard Principal
Layout limpo com cards personalizados mostrando:
- Frase motivacional do dia
- Humor atual com emoji
- Características da personalidade
- Grid de hobbies com progresso
- Gráfico de desenvolvimento pessoal

### Modais de Edição
Interfaces intuitivas para personalizar todos os aspectos do dashboard.

## 🚀 Próximas Funcionalidades

- [ ] Notificações push para lembrar de hobbies
- [ ] Integração com redes sociais
- [ ] Exportação de relatórios de progresso
- [ ] Gamificação com conquistas e badges
- [ ] Chat com outros usuários
- [ ] Backup na nuvem

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvedor

Criado com ❤️ para demonstrar as melhores práticas em desenvolvimento full-stack moderno.

---

**Dashboard Personalizado** - Onde sua personalidade ganha vida! ✨ 