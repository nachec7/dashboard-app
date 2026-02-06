CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"customer_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"status" varchar(255) NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "revenue" (
	"month" varchar(4) PRIMARY KEY NOT NULL,
	"revenue" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"birthday" date NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone_number" text NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_access" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
