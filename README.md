# 🏰 Studium Generale — Filosofía Medieval UNAD

Sitio web colaborativo para el **Reto 2 – Vamos al Studium** del curso Filosofía Medieval.  
Construido con **FastAPI** (backend) + **React + Vite** (frontend).

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

## 🌐 Subir a internet (opciones)

### Opción A — Render.com (gratis)
- Backend: crear web service apuntando a `/backend`
- Frontend: hacer `npm run build` y subir la carpeta `dist/`

### Opción B — Railway.app (gratis)
- Importar el repo completo, configura automáticamente FastAPI

### Opción C — Netlify (frontend) + Railway (backend)
- Frontend estático en Netlify
- Backend en Railway con variable de entorno `FRONTEND_URL`

---

## ✏️ Personalización rápida

**Cambiar el tema del debate:** editar `Debate.jsx` línea de título.  
**Agregar filósofos:** modificar `PHILOSOPHERS` en `backend/main.py`.  
**Cambiar colores:** editar `tailwind.config.js` y `index.css`.

---

*UNAD · Filosofía Medieval · Reto 2 · 2026*
