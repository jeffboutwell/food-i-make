CREATE TABLE "ApprovedEmail" (
    "email" TEXT NOT NULL,

    CONSTRAINT "ApprovedEmail_pkey" PRIMARY KEY ("email")
);

INSERT INTO "ApprovedEmail" ("email")
SELECT DISTINCT LOWER(TRIM("email"))
FROM "User";
