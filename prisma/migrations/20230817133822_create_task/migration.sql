-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
