import {
  pgTable,
  uuid,
  text,
  date,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const pets = pgTable("pets", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  stripeSessionId: text("stripe_session_id").notNull(),
  petName: text("pet_name").notNull(),
  bornDate: date("born_date"),
  diedDate: date("died_date").notNull(),
  tributeLine: text("tribute_line"),
  originalPhotoUrl: text("original_photo_url").notNull(),
  croppedPhotoUrl: text("cropped_photo_url").notNull(),
  renderedImageUrl: text("rendered_image_url"),
  ogImageUrl: text("og_image_url"),
  templateId: text("template_id").notNull().default("rainbow_bridge"),
  slug: text("slug").unique().notNull(),
  candleCount: integer("candle_count").notNull().default(0),
  reminderSentYear1: boolean("reminder_sent_year_1").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  paidAt: timestamp("paid_at"),
});

export const candles = pgTable("candles", {
  id: uuid("id").primaryKey().defaultRandom(),
  petId: uuid("pet_id")
    .notNull()
    .references(() => pets.id),
  visitorName: text("visitor_name"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Pet = typeof pets.$inferSelect;
export type NewPet = typeof pets.$inferInsert;
export type Candle = typeof candles.$inferSelect;
export type NewCandle = typeof candles.$inferInsert;
