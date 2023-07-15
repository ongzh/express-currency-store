# express-currency-store

## Getting Started

### Requirements

Ensure the following are installed

- Node.js
- Docker

### Setting Up

- Clone the repository into local directory

```
git clone https://github.com/ongzh/express-currency-store.git
```

- Install project dependencies

```
npm install
```

- Start the PostgreSQL database container

```
docker compose up -d
```

- Generate prisma client and apply schema

```
npx prisma generate
npx prisma migrate dev
```

- Seed the database with sample data

```
npx prisma db seed
```

- Start the application

```
npm start
```

### Configurations

- Update the `CRON_SCHEDULE` variable in the `.env` file to vary how often the database is updated with the latest exchange data.

## API EndPoints

| Method | URL                 | Query Params                                                                                                                                                       | Description                                                                   |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/rates`            | base: "fiat" or "crypto"                                                                                                                                           | Get exchange rate of desired currencies                                       |
| `GET`  | `/historical-rates` | base_currency: e.g USD , target_currency: e.g BTC, start: starting time in UNIX timestamp milliseconds, end (optional): ending time in UNIX timestamp milliseconds | Get historial exchange rates of desired currency pair, from start to end time |
