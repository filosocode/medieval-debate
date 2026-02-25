from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3
import os
from datetime import datetime

app = FastAPI(title="Medieval Debate API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://medieval-debate.vercel.app", "https://medieval-debate.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "debate.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS arguments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author TEXT NOT NULL,
            position TEXT NOT NULL CHECK(position IN ('favor', 'contra')),
            content TEXT NOT NULL,
            philosopher TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        )
    """)
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS conclusions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        )
    """)
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS debate_links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            platform TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        )
    """)
    
    # Seed data if empty
    cur.execute("SELECT COUNT(*) FROM arguments")
    if cur.fetchone()[0] == 0:
        sample_args = [
            ("María González", "favor", "La educación medieval en el Studium Generale sentó las bases del pensamiento crítico moderno. Los escolásticos, siguiendo a San Agustín, establecieron que la razón y la fe son complementarias, no opuestas.", "San Agustín"),
            ("Carlos Muñoz", "contra", "La educación medieval era elitista y dogmática. El acceso al conocimiento era exclusivo de la nobleza y el clero, perpetuando estructuras de poder injustas y limitando el pensamiento libre.", None),
            ("Luisa Torres", "favor", "Boecio demostró que incluso en adversidad extrema, la filosofía y el conocimiento son el mayor bien. Esta visión transformó la pedagogía medieval hacia una educación del carácter y la virtud.", "Boecio"),
            ("Andrés Muñoz", "contra", "La Disputatio medieval, aunque aparentemente dialéctica, tenía conclusiones predeterminadas. Eriúgena fue condenado precisamente por llevar la razón más allá de los límites aceptados por la Iglesia.", "Eriúgena"),
        ]
        cur.executemany(
            "INSERT INTO arguments (author, position, content, philosopher) VALUES (?,?,?,?)",
            sample_args
        )
        
        cur.execute(
            "INSERT INTO conclusions (author, content) VALUES (?,?)",
            ("Grupo Filosofía Medieval", "La educación medieval, pese a sus limitaciones, fue el motor intelectual que permitió la transición hacia la modernidad. La tensión entre fe y razón generó un dinamismo filosófico extraordinario que culminaría en el Renacimiento.")
        )
    
    conn.commit()
    conn.close()

init_db()


# ─── Models ───────────────────────────────────────────────────────────────────

class ArgumentCreate(BaseModel):
    author: str
    position: str  # 'favor' | 'contra'
    content: str
    philosopher: Optional[str] = None

class ConclusionCreate(BaseModel):
    author: str
    content: str

class DebateLinkCreate(BaseModel):
    title: str
    url: str
    platform: Optional[str] = None


# ─── Philosophers (static data) ───────────────────────────────────────────────

PHILOSOPHERS = [
    {
        "id": 1,
        "name": "San Agustín de Hipona",
        "years": "354 – 430",
        "period": "Temprana Edad Media",
        "main_idea": "La iluminación divina como fuente del conocimiento verdadero. Fe y razón son complementarias: 'Cree para entender, entiende para creer'.",
        "main_work": "Confesiones, La Ciudad de Dios, Contra los Académicos",
        "quote": "Nuestro corazón está inquieto hasta que descanse en Ti.",
        "color": "#8B4513"
    },
    {
        "id": 2,
        "name": "Anicio Manlio Severino Boecio",
        "years": "480 – 524",
        "period": "Temprana Edad Media",
        "main_idea": "La Fortuna es voluble; el verdadero bien reside en la virtud y la sabiduría, no en los bienes externos. Puente entre filosofía greco-romana y medieval.",
        "main_work": "Consolación de la Filosofía",
        "quote": "La fortuna te es contraria: así reconocerás quiénes son tus verdaderos amigos.",
        "color": "#4A5568"
    },
    {
        "id": 3,
        "name": "Juan Escoto Eriúgena",
        "years": "c. 815 – c. 877",
        "period": "Temprana Edad Media",
        "main_idea": "La naturaleza como teofanía: Dios se manifiesta en todo lo creado. Pionero del neoplatonismo cristiano en Occidente.",
        "main_work": "Periphyseon (Sobre la División de la Naturaleza)",
        "quote": "La verdadera religión es la verdadera filosofía, y la verdadera filosofía es la verdadera religión.",
        "color": "#2D6A4F"
    }
]


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Medieval Debate API 🏰", "status": "running"}

@app.get("/api/philosophers")
def get_philosophers():
    return PHILOSOPHERS

@app.get("/api/arguments")
def get_arguments():
    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM arguments ORDER BY created_at DESC"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/arguments", status_code=201)
def create_argument(body: ArgumentCreate):
    if body.position not in ("favor", "contra"):
        raise HTTPException(400, "position must be 'favor' or 'contra'")
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO arguments (author, position, content, philosopher) VALUES (?,?,?,?)",
        (body.author, body.position, body.content, body.philosopher)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM arguments WHERE id=?", (cur.lastrowid,)).fetchone()
    conn.close()
    return dict(row)

@app.delete("/api/arguments/{arg_id}")
def delete_argument(arg_id: int):
    conn = get_db()
    conn.execute("DELETE FROM arguments WHERE id=?", (arg_id,))
    conn.commit()
    conn.close()
    return {"deleted": arg_id}

@app.get("/api/conclusions")
def get_conclusions():
    conn = get_db()
    rows = conn.execute("SELECT * FROM conclusions ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/conclusions", status_code=201)
def create_conclusion(body: ConclusionCreate):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO conclusions (author, content) VALUES (?,?)",
        (body.author, body.content)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM conclusions WHERE id=?", (cur.lastrowid,)).fetchone()
    conn.close()
    return dict(row)

@app.get("/api/links")
def get_links():
    conn = get_db()
    rows = conn.execute("SELECT * FROM debate_links ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/links", status_code=201)
def create_link(body: DebateLinkCreate):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO debate_links (title, url, platform) VALUES (?,?,?)",
        (body.title, body.url, body.platform)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM debate_links WHERE id=?", (cur.lastrowid,)).fetchone()
    conn.close()
    return dict(row)

@app.get("/api/stats")
def get_stats():
    conn = get_db()
    total = conn.execute("SELECT COUNT(*) FROM arguments").fetchone()[0]
    favor = conn.execute("SELECT COUNT(*) FROM arguments WHERE position='favor'").fetchone()[0]
    contra = conn.execute("SELECT COUNT(*) FROM arguments WHERE position='contra'").fetchone()[0]
    conn.close()
    return {"total": total, "favor": favor, "contra": contra}
