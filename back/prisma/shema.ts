// model Actor {
//   id       Int      @id @default(autoincrement())
//   name     String
//   slug     String   @unique
//   photo    String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model Genre {
//   id          Int      @id @default(autoincrement())
//   name        String
//   slug        String   @unique
//   description String
//   icon        String
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }

// model Movie {
//   id          Int      @id @default(autoincrement())
//   poster      String
//   bigPoster   String
//   title       String
//   slug        String   @unique
//   year        Int
//   duration    Int
//   country     String
//   rating      Float   @default(4)
//   videoUrl    String
//   countOpened Int     @default(0)
//   isSendTelegram Boolean @default(false)
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt

// }

// model Rating {
//   id       Int      @id @default(autoincrement())
//   userId   Int
//   movieId  Int
//   value    Int
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

// }

// model User {
//   id       Int      @id @default(autoincrement())
//   email    String   @unique
//   password String
//   isAdmin  Boolean @default(false)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model UserToFavorites {
//   id       Int @id @default(autoincrement())
//   userId   Int
//   movieId  Int
//   createdAt DateTime @default(now())
// }

// model MovieToGenre {
//   id       Int @id @default(autoincrement())
//   movieId Int
//   genreId Int

// }

// model MovieToActor {
//   id       Int @id @default(autoincrement())
//   movieId Int
//   actorId Int

// }
