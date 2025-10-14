# Portfolio Web Moderno - TypeScript + React + Tailwind CSS (Vite)

![React](https://img.shields.io/badge/React-18.2.0-blue.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg) ![Vite](https://img.shields.io/badge/Vite-4.4.5-purple.svg) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-cyan.svg) ![pnpm](https://img.shields.io/badge/pnpm-8.x-orange.svg)

Este es un portfolio web moderno, de alto rendimiento y accesible, construido con tecnologías de vanguardia. Está diseñado para ser desplegado fácilmente en hardware de bajo consumo como una **Raspberry Pi 5 (ARM64)**, utilizando una pila de software optimizada (DietPi, Nginx).

El proyecto se inspira en la estética minimalista y las interacciones fluidas de sitios como [Lusion.co](https://lusion.co/), priorizando una experiencia de usuario excepcional.

---

## ✨ Características Principales

- **Stack Moderno**: React 18, TypeScript, Vite, Tailwind CSS.
- **Rendimiento Optimizado**: Build estático, lazy loading, formatos de imagen modernos (webp/avif).
- **Animaciones Fluidas**: Micro-interacciones con Framer Motion y revelado de elementos al hacer scroll.
- **Internacionalización (i18n)**: Soporte para múltiples idiomas (ES, EN, IT) con `react-i18next`.
- **Accesibilidad (a11y)**: Uso de etiquetas semánticas, atributos ARIA y buen contraste de color.
- **SEO Básico**: Meta tags dinámicas, `robots.txt`, y preparado para `sitemap.xml`.
- **Backend Opcional**: Formulario de contacto funcional con un backend ligero en Fastify (Node.js) o integrable con servicios de terceros (Formspree).
- **Autodiagnóstico**: Un script (`npm run diag`) para verificar la salud del proyecto (tipado, linting, tests, links rotos, etc.).
- **Listo para Despliegue en ARM**: Sin dependencias nativas complicadas, listo para funcionar en una Raspberry Pi.

---

## 🚀 Empezando (Desarrollo Local)

### Prerrequisitos

- **Node.js**: Versión 20+ (LTS). Se recomienda usar `nvm` para gestionar versiones.
- **pnpm**: Gestor de paquetes rápido y eficiente. (`npm install -g pnpm`)

### Pasos de Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone [https://github.com/your-username/modern-web-portfolio.git](https://github.com/your-username/modern-web-portfolio.git)
    cd modern-web-portfolio
    ```

2.  **Instala las dependencias:**

    ```bash
    pnpm install
    ```

3.  **Configura las variables de entorno (para el backend opcional):**
    Copia el archivo de ejemplo y edítalo con tus credenciales.

    ```bash
    cp server/.env.example server/.env
    ```

    Edita `server/.env` con tu configuración de SMTP.

4.  **Inicia el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```
    El sitio estará disponible en `http://localhost:3000`.

---

## 🛠️ Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo de Vite.
- `pnpm build`: Compila la aplicación para producción en el directorio `/dist`.
- `pnpm preview`: Previsualiza el build de producción localmente.
- `pnpm lint`: Ejecuta ESLint y corrige problemas automáticamente.
- `pnpm format`: Formatea todo el código con Prettier.
- `pnpm test`: Ejecuta los tests unitarios con Vitest en modo interactivo.
- `pnpm test:run`: Ejecuta los tests una sola vez.
- `pnpm diag`: **Ejecuta el script de autodiagnóstico completo.**
- `pnpm build:server`: Compila el backend de Fastify.
- `pnpm start:server`: Inicia el servidor de producción del backend (después de compilarlo).

---

## 🔧 Personalización del Portfolio

1.  **Datos Personales y Proyectos**:
    - Modifica `src/data/projects.ts` para añadir tus propios proyectos. Sigue la estructura definida.
    - Reemplaza las imágenes de placeholder en `public/placeholder/` con las tuyas (usa formatos `.webp` o `.avif`).
    - Actualiza tu nombre y enlaces a redes sociales en `src/components/Header.tsx` y `src/components/Footer.tsx`.

2.  **Traducciones (i18n)**:
    - Edita los archivos en `src/locales/{en,es,it}/translation.json` para cambiar cualquier texto del sitio.

3.  **CVs Descargables**:
    - Coloca tus CVs en formato PDF dentro de `public/cv/`.
    - Nómbralos siguiendo la convención: `en_cv.pdf`, `es_cv.pdf`, `it_cv.pdf`. El componente `Header` enlazará automáticamente al correcto según el idioma seleccionado.

4.  **Estilos y Tema**:
    - Los colores principales, fuentes y otros aspectos visuales se pueden configurar fácilmente en `tailwind.config.cjs`.

---

## 📦 Despliegue en Raspberry Pi 5 con DietPi y Nginx

Esta guía asume que tienes una Raspberry Pi 5 con **DietPi** instalado y acceso a la terminal.

### 1. Prerrequisitos en la Raspberry Pi

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar software esencial
sudo dietpi-software install 17 16 89 # Instala Git, Nginx, Node.js

# Instalar pnpm
sudo npm install -g pnpm

# Crear directorio para el portfolio
sudo mkdir -p /var/www/portfolio
sudo chown -R tu_usuario:www-data /var/www/portfolio
```

### 2. Configurar DuckDNS

1.  Ve a [DuckDNS](https://www.duckdns.org/) y crea un subdominio (ej. `tunombre.duckdns.org`).
2.  Obtén tu token.
3.  Instala y configura el cliente de DuckDNS en tu Pi para que tu IP dinámica se actualice automáticamente. Sigue la [guía de instalación de DuckDNS](https://www.duckdns.org/install.jsp).

### 3. Subir el Código

**Opción A (Recomendado): Build en tu PC y copiar `/dist`**
Esto es más rápido que compilar en la Pi.

```bash
# En tu PC
pnpm build

# Copia los archivos a la Pi usando scp o rsync
rsync -avz ./dist/ tu_usuario@IP_DE_LA_PI:/var/www/portfolio/
```

**Opción B: Clonar y construir en la Pi**

```bash
# En la Raspberry Pi
cd /var/www/portfolio
git clone [https://github.com/your-username/modern-web-portfolio.git](https://github.com/your-username/modern-web-portfolio.git) .
pnpm install
pnpm build
```

_Nota: El directorio de build final será `/var/www/portfolio/dist`. Ajusta las rutas de Nginx en consecuencia._

### 4. Configurar Nginx

1.  Crea un archivo de configuración para tu sitio:

    ```bash
    sudo nano /etc/nginx/sites-available/portfolio
    ```

2.  Pega la siguiente configuración (reemplaza `tunombre.duckdns.org`):

    ```nginx
    server {
        listen 80;
        server_name tunombre.duckdns.org;
        root /var/www/portfolio; # Si copiaste /dist, la ruta es /var/www/portfolio

        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Opcional: Proxy para el backend de contacto si lo usas
        location /api/ {
            proxy_pass [http://127.0.0.1:3001/](http://127.0.0.1:3001/);
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Headers de seguridad y rendimiento
        add_header X-Content-Type-Options "nosniff";
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

        # Configuración de compresión
        gzip on;
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
    ```

3.  Activa el sitio y reinicia Nginx:
    ```bash
    sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
    sudo nginx -t # Para probar la configuración
    sudo systemctl restart nginx
    ```

### 5. Habilitar HTTPS con Certbot (Let's Encrypt)

1.  Abre los puertos 80 y 443 en tu router y dirígelos a la IP de tu Raspberry Pi.

2.  Instala Certbot:

    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    ```

3.  Obtén el certificado:
    ```bash
    sudo certbot --nginx -d tunombre.duckdns.org
    ```
    Sigue las instrucciones en pantalla. Certbot modificará tu configuración de Nginx automáticamente para usar HTTPS y configurará la renovación automática.

### 6. (Opcional) Ejecutar el Backend como un Servicio

Si usas el backend de Fastify, necesitas que se ejecute de forma continua.

1.  Navega al directorio del backend y compílalo:

    ```bash
    cd /var/www/portfolio/server
    pnpm install
    pnpm build
    ```

2.  Crea un archivo de servicio `systemd`:

    ```bash
    sudo nano /etc/systemd/system/portfolio-backend.service
    ```

3.  Pega el siguiente contenido (ajusta las rutas si es necesario):

    ```ini
    [Unit]
    Description=Portfolio Backend Server
    After=network.target

    [Service]
    User=tu_usuario
    WorkingDirectory=/var/www/portfolio/server
    ExecStart=/usr/bin/node /var/www/portfolio/server/dist/index.js
    Restart=always
    EnvironmentFile=/var/www/portfolio/server/.env

    [Install]
    WantedBy=multi-user.target
    ```

4.  Habilita e inicia el servicio:
    ```bash
    sudo systemctl enable portfolio-backend.service
    sudo systemctl start portfolio-backend.service
    sudo systemctl status portfolio-backend.service # Para verificar que está corriendo
    ```

¡Felicidades! Tu portfolio ahora está desplegado y servido desde tu propia Raspberry Pi.
