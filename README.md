# Übersicht der behandelten Themen Q&A

## Wieso behandlen wir die Themen ESLint, Prettier, TypeScript, Swagger, TSOA

- Die Tools ESLint, Prettier und TypeScript dienen dazu kontinuirlich besseren Code zu entwickeln
- Prettier: gleicher Code Style, mit bestimmten Regeln
- ESLint: Regeln, die Fehler anhand von bestimmten Coding Regeln aufdecken können. Definiert die DoD im Code
- Swagger & TSOA: TSOA kann dafür sorgen, eine Swagger API Dokumentation zu erstellen

## TypeScript

### Was ist TypeScript?

- TypeScript ist eine Erweiterung zu JavaScript (Superset)
- Nur für die Entwicklung wichtig --> In Produktion läuft JavaScript
- Definiert Typen im Vergleich zu JavaScript
- TypeScript kann überall angewendet werden, wo JavaScript genutzt wird (React, Vuee, Next.js, Express,...)

### Grundkomponenten von TypeScript

- `tsconfig.json`: Grundbaustein um TypeScript zu initialisieren

```json
{
  "compilerOptions": {
    "target": "ES6", // Neueres JavaScript Modul, um z.B import Statements zu verwenden
    "module": "commonjs",
    "outDir": "./dist", // Definiert Verzeichnis, wo der kompilierte JavaScript Code landet
    "rootDir": "./src", // Enthält TypeScript Dateien
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```

- Bei TypeScript könnten Typen über `<Variablen-Name>:<Type>` Beispiel: `let name: string = 'Max'`
- TypeScript Dateien enden mit `.ts`
- TypeScript UI Datein werden mit `.tsx` gekennzeichnet
- Wichtige Bestandteile von den `devDependencies`

```json
  "devDependencies": {
    "@types/cors": "^2.8.17", // Beispiel für zusätlich instaliierte types
    ...
    "nodemon": "^3.1.4", // Überwacht Änderung im development (siehe nodemon.json)
    "ts-node": "^10.9.2",
    "typescript": "^5.5.3", // Typescript installiert Pakete wie tsc mit, welches letzendlich unseren Code in JavaScript umwandelt
  }
```

- Skripte für TypeScript

```json
  "scripts": {
    "dev": "nodemon", // Kennen wir aus JavaScript --> Sucht nach nodemon.json, um Konfigurationen zu laden
    "build": "tsc", // tsc kommt mit dem typescript Package
  },
```

- nodemon Konfiguration:

```json
{
  "watch": ["src"], // Überwacht alles, was sich in dem Ordner src befindet
  "ext": "ts", // Wichtig für typescript
  "exec": "ts-node -r dotenv/config src/index.ts -x tsoa spec"
  // Nodemon führt standartisiert node aus, da wir ts verwenden brauchen wir ts-node
}
```

### Wie definiert man Typen

```javascript
let randomVar: string = "Max"
```

- Interfaces

```typescript
interface User {
  id: number;
  username: string;
  birthdate: string | Date;
}
const user1: User = {
  id: 1,
  username: 'mäxchen',
  birthdate: '2000-10-10',
};

const user2: User = {
  id: 1,
  username: 'marina';
  birthdate: '2000-10-10',
};
```

- TypeScript am Beispiel von Sequelize Models

```typescript
class TodoModel // Klassen Name
  extends Model<TodoAttributes, TodoCreationAttributes>
  // extends steht dafür, das alles von dem Model (kommt von sequelize) übernommen werden solle. Dazu gehören Methoden (z.B. init) ind weiter Funktionen
  // <TodoAttributes, TodoCreationAttributes> Konkrete Typdefinition für allgemeines sequelize Model
  // implements kontrolliert, ob alle Werte von dem interface in der Klasse erwähnt werden
  implements TodoAttributes
{
  public id!: number;

  public userId!: number;

  public task!: string;

  public isDone!: boolean;

  public dueDate!: Date | string;

  // Timestamps
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}
```

Interface: Ein Interface in TypeScript definiert, welche Eigenschaften (Attribute) und Methoden ein Objekt haben sollte. Es beschreibt die Struktur eines Objekts, ohne die tatsächliche Implementierung vorzugeben.
Attribute: Attribute sind Variablen innerhalb einer Klasse, die den Zustand eines Objekts beschreiben. Sie können verschiedene Datentypen wie string, number, boolean, oder auch komplexe Typen wie andere Interfaces haben.
Methoden: Methoden sind Funktionen innerhalb einer Klasse, die definierte Operationen auf den Objekten dieser Klasse ausführen können. Sie können Parameter haben und einen Rückgabewert liefern.
Klassen: Klassen dienen als Bausteine für die Strukturierung von Code in TypeScript. Sie definieren, wie Objekte erstellt werden können, indem sie Attribute und Methoden enthalten.

## Swagger und TSOA

- Ziel: API Dokumentation automatisieren

### Wofür unterteilen wir für TSOA die Statistic Routen in Route und Controller
