# LIT-web-backend
LIT Website backend

## Docs

### Setup
- Install Postgresql
- Install Node
- clone the repository
- get into the project directory
- create a `.env` file in the root directory and add the `DATABASE_URL` in the `.env`
- `DATABASE_URL="postgresql://username:password@localhost:5432/lit-dev"`
- Manually create a database in portgres with name `lit-dev`
- run `yarn install` or `npm install`
- run `yarn start` or `npm start` to run the server

### Creating a new schema
- Create a `*.schema` file in `/prisma/schema/`
- change dir to `/scripts` 
- run `generate_schema.sh` to generate a `schema.prisma` file
- run migration using `npx prisma migrate dev <name_of_migration>`
