# socialclub.

En liten MVP för att skapa ett konto och därefter en socialclub.

## Starta lokalt

```bash
npm install
npm run dev
```

Öppna sedan [http://localhost:3000](http://localhost:3000). Om porten redan används väljer Next.js nästa lediga port.

## API

### `POST /api/accounts`

Skapar ett konto. Kräver `name`, `email` och `password` på minst sex tecken.

### `POST /api/socialclubs`

Skapar en club. Kräver `ownerId`, `name` och `description`.

MVP:n använder en enkel in-memory store för att hålla implementationen liten. Data nollställs när serverprocessen startas om; nästa steg inför lansering är en riktig databas och sessionsbaserad autentisering.