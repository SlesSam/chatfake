# 🤖 ChatFake with AI

    Aplicación de chat con interfaz moderna que simula una conversación con inteligencia 
    artificial usando Next.js, OpenRouter y almacenamiento local.

## 🚀 Tecnologías utilizadas

    - ✅ **Next.js 14** con App Router
    - ✅ **TypeScript**
    - ✅ **TailwindCSS**
    - ✅ **OpenRouter API** para respuestas de IA
    - ✅ **LocalStorage** para persistencia de datos (sin backend)
    - ✅ **Jest + Testing Library** para tests unitarios
    - ✅ **ESLint + Prettier + Husky** para control de calidad

## 📦 Instalación

    ```bash
    git clone https://github.com/tu-usuario/chatfake.git
    cd chatfake
    npm install
    ```

##  🛠️ Configuración del entorno

    Para que el chatbot funcione correctamente, necesitas 
    una clave de acceso válida para la API de OpenRouter.
        1.Crea un archivo llamado .env en la raíz del proyecto.
        2.Usa como referencia el archivo .example.env incluido.
        3.Obtén tu clave de API en https://openrouter.ai

## Script 

    ```bash
    npm run dev       # Inicia el servidor de desarrollo
    npm run lint      # Ejecuta ESLint
    npm run format    # Aplica Prettier a todo el código
    npm run test      # Corre todos los tes
    ```

## 🧠 Funcionalidades

    - Login funcional simulado con JSON
    - Listado de chats por usuario
    - Detalle de conversación
    - Chat en tiempo real con respuestas de IA (OpenRouter)
    - Historial persistido con LocalStorage
    - UI moderna estilo ChatGPT
    - Tests con Jest + React Testing Library
    - Linting con ESLint + Prettier + Husky

## 🧩 Decisiones técnicas

    - Se utilizó el sistema de archivos de Next.js 14 con App Router.
    - Toda la lógica del usuario y chats está persistida con localStorage para mantener el proyecto sin backend.
    - Las respuestas del bot se gestionan desde /api/chat usando una llamada fetch a OpenRouter, 
      simulando el comportamiento real de un LLM.
    - Husky se usa para asegurar buena calidad antes de los commits.
    - Tests cubren componentes clave del flujo del usuario: Login, Input, Sidebar, ChatList, Header.

## 🛠 Posibles mejoras

    - Detalle completo del perfil del usuario (pendiente)
    - Añadir para modo claro / oscuro
    - Subida de imagen de perfil.
    - Animaciones suaves al cambiar de chat
    - Funcionalidad real de los botones de feedback (👍 👎 ♻️)
    - Soporte para markdown en las respuestas de la IA
    - Migración futura a backend real (Firebase, Supabase o API REST)
    - Mejora de estructura de carpetas y separación de lógica
    - **Implementar autenticación real** con:
        - [NextAuth.js](https://next-auth.js.org/)
        - [Auth0](https://auth0.com/)
        - [Firebase Authentication](https://firebase.google.com/products/auth)
        
        Esto permitiría:
        - Gestión segura de usuarios y sesiones
        - Login con correo, redes sociales o proveedores externos
        - Mayor escalabilidad y robustez en la app
