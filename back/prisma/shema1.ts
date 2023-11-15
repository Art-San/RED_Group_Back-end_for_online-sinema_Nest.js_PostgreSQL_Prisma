// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model Actor {
//   id        Int       @id @default(autoincrement())
//   name      String
//   slug      String    @unique
//   photo     String
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
// }

// model User {
//   id        Int        @id @default(autoincrement())
//   email     String     @unique
//   password  String
//   isAdmin   Boolean    @default(false)
//   favorites MovieUser[]
//   createdAt DateTime   @default(now())
//   updatedAt DateTime   @updatedAt
// }

// model Movie {
//   id           Int        @id @default(autoincrement())
//   poster       String
//   bigPoster    String
//   title        String
//   slug         String     @unique
//   year         Int
//   duration     Int
//   country      String
//   rating       Float      @default(4)
//   videoUrl     String
//   countOpened  Int        @default(0)
//   isSendTelegram Boolean @default(false)
//   createdAt    DateTime   @default(now())
//   updatedAt    DateTime   @updatedAt
//   movieUsers   MovieUser[]  // Обратное поле связи
//   genres       Genre[]
//   actors       Actor[]
// }

// model MovieUser {
//   id       Int    @id @default(autoincrement())
//   user     User   @relation(fields: [userId], references: [id])
//   userId   Int
//   movie    Movie  @relation(fields: [movieId], references: [id])
//   movieId  Int
// }

// model Genre {
//   id           Int      @id @default(autoincrement())
//   name         String
//   slug         String   @unique
//   description  String
//   icon         String
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
// }

// model Parameters {
//   id        Int      @id @default(autoincrement())
//   year      Int
//   duration  Int
//   country   String
//   // Поле 'movie' связано с моделью Movie
//   movie     Movie    @relation(fields: [movieId], references: [id])
//   movieId   Int
// }
