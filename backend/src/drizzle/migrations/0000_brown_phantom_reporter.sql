CREATE TYPE "public"."appointmentStatus" AS ENUM('scheduled', 'completed', 'cancelled', 'no-show');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'unspecified');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('Doctor', 'admin', 'both');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'completed', 'pending');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"doctorId" integer,
	"appointmentdate" date NOT NULL,
	"description" text NOT NULL,
	"status" "appointmentStatus" DEFAULT 'scheduled'
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"dob" date NOT NULL,
	"gender" "gender" DEFAULT 'unspecified',
	CONSTRAINT "clients_email_unique" UNIQUE("email"),
	CONSTRAINT "clients_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"programId" integer NOT NULL,
	"status" "status" DEFAULT 'pending',
	"enroller" integer,
	"enrollmentdate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"startdate" date NOT NULL,
	"enddate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"contact" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'Doctor' NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_users_id_fk" FOREIGN KEY ("doctorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_programId_programs_id_fk" FOREIGN KEY ("programId") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_enroller_users_id_fk" FOREIGN KEY ("enroller") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;