# SideQuest — Progetto di Ingegneria del Software

Starter per SideQuest (a.a. 2026/2027), **solo INGSW**.
Contiene uno scheletro Angular (SPA) e Spring Boot (API REST), già collegati tramite proxy di sviluppo.
**Non implementa ancora R01–R06 né il pacchetto assegnato**: queste funzioni andranno analizzate,
progettate e sviluppate successivamente, seguendo il PDF ufficiale del corso.

## Struttura

```text
SideQuest/
├── frontend/               Angular 21, TypeScript, SCSS, routing, HttpClient
├── backend/                Spring Boot 3.5, Java 21, Maven, REST, JPA
├── docs/                   Materiali per SRS, UML, piano di test
├── compose.yaml            PostgreSQL 17 per lo sviluppo locale (opzionale)
├── .editorconfig
├── .gitignore
└── README.md
```

## Prerequisiti

- **Node.js 22.12+** (oppure 20.19+ o 24.x) e npm, compatibili con Angular 21.
- **JDK 21** (`java -version`).
- **Maven 3.9+** (`mvn -version`).
- **Docker Desktop**, facoltativo per attivare PostgreSQL.

> L'archivio non include `node_modules`, il lockfile generato da npm né i binari Maven.
> Eseguire `npm install` con accesso a Internet per scaricare le dipendenze.

## Avvio rapido (due terminali)

### 1. Back-end

```powershell
cd backend
mvn spring-boot:run
```

L'API parte su <http://localhost:8080>. Endpoint di prova:

<http://localhost:8080/api/health>

Il profilo **dev** è quello predefinito e usa H2 su file (`backend/data/`, ignorata da Git),
così la demo funziona anche senza PostgreSQL installato.

### 2. Front-end

Aprire un secondo terminale nella radice SideQuest:

```powershell
cd frontend
npm install
npm start
```

Aprire <http://localhost:4200>. La pagina iniziale contatta automaticamente il back-end.
`frontend/proxy.conf.json` inoltra `/api` a `http://localhost:8080` durante `ng serve`.

### 3. PostgreSQL (quando servirà)

Nella radice del repository:

```powershell
docker compose up -d
cd backend
$env:SPRING_PROFILES_ACTIVE = "postgres"
mvn spring-boot:run
```

Per ritornare al profilo di default nello stesso terminale PowerShell:

```powershell
Remove-Item Env:SPRING_PROFILES_ACTIVE
```

Connessione di sviluppo: `localhost:5432`, database `sidequest`, utente `sidequest`, password
`sidequest`. Sono **credenziali esclusivamente locali**, non adatte alla produzione.
Per altri ambienti usare `DB_URL`, `DB_USERNAME` e `DB_PASSWORD`.

## Comandi utili

```powershell
# Angular: build produzione
cd frontend
npm run build

# Java: test unitari / integrazione
cd backend
mvn test

# Java: crea JAR
mvn clean package
```

## Punto d'ingresso

- `frontend/src/app/pages/home/` — pagina iniziale.
- `frontend/src/app/core/services/health.service.ts` — HttpClient verso il back-end.
- `frontend/src/app/app.routes.ts` — configurazione rotte Angular.
- `backend/src/main/java/it/sidequest/controller/HealthController.java` — GET `/api/health`.
- `backend/src/main/resources/application-*.yml` — profili H2/PostgreSQL.

## Prossime fasi per INGSW

1. Analizzare requisiti obbligatori R01–R06 e pacchetto attribuito dal docente.
2. SRS, diagramma dei casi d'uso, Personas, mockup, assunzioni di dominio.
3. Architettura, modello dati, UML design e diagrammi dinamici.
4. Implementazione coerente col design, commit Git frequenti e analisi SonarQube BE.
5. Piano di test e test unitari secondo le regole di consegna anticipata.

**Nota sicurezza:** è presente solo un endpoint pubblico di controllo; non sono ancora
implementati autenticazione e autorizzazione. Vanno progettati prima di aggiungere
operazioni riservate. In produzione, non usare `ddl-auto: update` né credenziali di esempio.

## Git

Questi file sono forniti **senza `.git`**, per essere copiati dentro il repository GitHub
esistente senza alterarne branch o commit. Evitare di copiare l'archivio come repository annidato.
