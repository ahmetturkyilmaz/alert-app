-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "target_price" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pair" VARCHAR(10) NOT NULL,
    "is_notification_sent" BOOLEAN DEFAULT false,
    "trigger_condition" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);
