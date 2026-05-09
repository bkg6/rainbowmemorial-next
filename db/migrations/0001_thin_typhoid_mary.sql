CREATE TABLE "memories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_slug" text NOT NULL,
	"author_name" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "born_date_text" text;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "died_date_text" text;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "species" text;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "is_sample" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "memories" ADD CONSTRAINT "memories_pet_slug_pets_slug_fk" FOREIGN KEY ("pet_slug") REFERENCES "public"."pets"("slug") ON DELETE cascade ON UPDATE no action;