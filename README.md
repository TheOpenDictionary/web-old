# odict-web

odict-web is an experimental web frontend for browsing ODict dictionaries.

---

## Developer Setup

Build your `node_modules`:

```
yarn install
```

Run the project:

```
yarn dev
```

To connect to a local/remote DB, make sure to change the connection string in the [.env](./env) file to match its credentials, port, and name. To start, we'd create an empty DB with `CREATE DATABASE odict;`. Then, Prisma does the rest of the work ✨.

We use Prisma as an ORM for our Postgres DB. All documentation related to Prisma is located on [Prisma's official website](https://www.prisma.io/docs/). We have a Prisma schema set up to create/link to the database tables. Simply run `yarn prisma migrate dev --name init` to create the first migration. After, we load all ODXML dictionaries into the DB with the `yarn prisma db seed` command.
