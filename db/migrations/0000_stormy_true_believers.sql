CREATE TABLE "candles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"visitor_name" text,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"stripe_session_id" text NOT NULL,
	"pet_name" text NOT NULL,
	"born_date" date,
	"died_date" date NOT NULL,
	"tribute_line" text,
	"original_photo_url" text NOT NULL,
	"cropped_photo_url" text NOT NULL,
	"rendered_image_url" text,
	"og_image_url" text,
	"template_id" text DEFAULT 'rainbow_bridge' NOT NULL,
	"slug" text NOT NULL,
	"candle_count" integer DEFAULT 0 NOT NULL,
	"reminder_sent_year_1" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp,
	CONSTRAINT "pets_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "candles" ADD CONSTRAINT "candles_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE no action ON UPDATE no action;