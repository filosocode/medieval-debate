# 🏰 Studium Generale — Filosofía Medieval UNAD

[![Deploy Status](https://img.shields.io/badge/deploy-live-green)](https://medieval-debate.onrender.com)
[![Python](https://img.shields.io/badge/Python-3.14-blue?logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.133-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

Plataforma web colaborativa para el **Reto 2 – Vamos al Studium** del curso Filosofía Medieval UNAD.
Permite a estudiantes debatir argumentos filosóficos medievales, analizar filósofos clave y construir conclusiones grupales.

**🌐 [Ver página en vivo →](https://medieval-debate.onrender.com)**

---

## ✨ Características

- 🏛️ **Fichas de Filósofos**: San Agustín, Boecio, Juan Escoto Eriúgena
- 💬 **Sistema de Debate**: Publicar argumentos a favor y en contra
- 📊 **Estadísticas en vivo**: Ver distribución de argumentos
- 📝 **Conclusiones grupales**: Construir conclusiones colaborativas
- 🎓 **Recurso educativo**: Grabaciones y enlaces útiles
- 🎨 **Diseño medieval**: Estética escolástica con animaciones

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + Vite + Tailwind CSS + Framer Motion |
| **Backend** | FastAPI + Uvicorn |
| **Base de datos** | SQLite |
| **Deploy** | Render (full-stack) |

---

## 📁 Estructura del proyecto

```
medieval-debate/
├── backend/
│   ├── main.py           ← API FastAPI + SQLite
│   └── requirements.txt  ← Dependencias Python
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx          ← Página principal con stats
│   │   │   ├── Philosophers.jsx  ← Fichas de filósofos
│   │   │   ├── Debate.jsx        ← Disputatio (publicar argumentos)
│   │   │   ├── Conclusions.jsx   ← Conclusiones grupales
│   │   │   └── Links.jsx         ← Grabaciones y enlaces
│   │   ├── App.jsx
│   │   ├── api.js        ← Capa de llamadas a la API
│   │   └── index.css     ← Estilos medievales
│   └── package.json
├── instalar_y_arrancar.bat   ← Windows
└── instalar_y_arrancar.sh    ← Mac/Linux
```

---

## 🚀 Instalación y arranque local

### Windows
```
Doble clic en: instalar_y_arrancar.bat
```

### Mac / Linux
```bash
chmod +x instalar_y_arrancar.sh
./instalar_y_arrancar.sh
```

### Manual (paso a paso)

**Terminal 1 — Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Luego abre → **http://localhost:5173**

---

## 🔗 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/philosophers` | Lista de filósofos |
| GET | `/api/arguments` | Todos los argumentos del debate |
| POST | `/api/arguments` | Publicar nuevo argumento |
| DELETE | `/api/arguments/{id}` | Eliminar argumento |
| GET | `/api/conclusions` | Conclusiones grupales |
| POST | `/api/conclusions` | Agregar conclusión |
| GET | `/api/links` | Grabaciones y enlaces |
| POST | `/api/links` | Agregar enlace |
| GET | `/api/stats` | Estadísticas del debate |

Documentación interactiva: **http://localhost:8000/docs**

---

## 🌐 Deploy en Render

Este proyecto está **deployado en Render** con configuración full-stack:

```bash
bash build.sh  # Instala deps, compila frontend, sirve todo desde mismo servidor
```

**URL en vivo:** https://medieval-debate.onrender.com

> ⚠️ **Nota**: Plan free en Render tiene "cold start" (tarda ~30s en primera carga después de inactividad). Es completamente normal.

### Para deployar tu propia instancia:

1. Fork este repositorio
2. Crea cuenta en [Render.com](https://render.com)
3. Conecta tu repo de GitHub
4. Configura Build Command: `bash build.sh`
5. Configura Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## ✏️ Personalización rápida

**Cambiar el tema del debate:** editar `Debate.jsx` línea de título.
**Agregar filósofos:** modificar `PHILOSOPHERS` en `backend/main.py`.
**Cambiar colores:** editar `tailwind.config.js` y `index.css`.

---

## 📧 Autor

**Andrés Muñoz** | UNAD Filosofía Medieval 2026

---

## 📄 Licencia

MIT License - Libre para usar, modificar y distribuir.

---

**Hecho con ❤️ para el Reto 2 – Vamos al Studium**
