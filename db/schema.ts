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
  // Optional human display string for the date range (e.g. "March 2018").
  // When present, the page shows this verbatim instead of formatting
  // bornDate/diedDate. Lets us seed pets where only the month or only
  // the year is known without lying about the day.
  bornDateText: text("born_date_text"),
  diedDate: date("died_date").notNull(),
  diedDateText: text("died_date_text"),
  tributeLine: text("tribute_line"),
  originalPhotoUrl: text("original_photo_url").notNull(),
  croppedPhotoUrl: text("cropped_photo_url").notNull(),
  renderedImageUrl: text("rendered_image_url"),
  ogImageUrl: text("og_image_url"),
  templateId: text("template_id").notNull().default("rainbow_bridge"),
  // Optional species label for the page header ("Labrador Retriever",
  // "French Bulldog", "Cat"). Real customer rows leave this null and
  // the page just shows name + dates.
  species: text("species"),
  slug: text("slug").unique().notNull(),
  candleCount: integer("candle_count").notNull().default(0),
  // Marks seeded composite memorials so /m/[slug] can render noindex
  // headers and data-sample attributes. Real customer pets default false
  // and remain indexable.
  isSample: boolean("is_sample").notNull().default(false),
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

// Written memories left on a memorial page's Guestbook tab. Separate from
// the candles table (which records candle-lighting events) because memories
// have an authored text body and we want to query them without touching
// candle bookkeeping. Foreign-keyed by slug so seed data is portable across
// rebuilds without UUID drift.
export const memories = pgTable("memories", {
  id: uuid("id").primaryKey().defaultRandom(),
  petSlug: text("pet_slug")
    .notNull()
    .references(() => pets.slug, { onDelete: "cascade" }),
  authorName: text("author_name").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Pet = typeof pets.$inferSelect;
export type NewPet = typeof pets.$inferInsert;
export type Candle = typeof candles.$inferSelect;
export type NewCandle = typeof candles.$inferInsert;
export type Memory = typeof memories.$inferSelect;
export type NewMemory = typeof memories.$inferInsert;
