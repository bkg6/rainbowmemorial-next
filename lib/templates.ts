export type TemplateId =
  | "rainbow_bridge"
  | "anniversary"
  | "birthday_heaven"
  | "memory";

export interface TextZone {
  x: number;
  y: number;
  fontSize: number;
  color: string;
  align: "left" | "center" | "right";
  italic?: boolean;
}

export interface PhotoZone {
  x: number;
  y: number;
  width: number;
  height: number;
  shape: "circle" | "rect";
}

export interface TemplateConfig {
  id: TemplateId;
  label: string;
  background: string;
  photoZone: PhotoZone;
  nameZone: TextZone;
  datesZone: TextZone;
  tributeZone: TextZone;
  canvasWidth: number;
  canvasHeight: number;
}

// Photo top-left = center (540, 750) minus half (190, 190) = (350, 560)
// This places the circular photo center at 39% from top — firmly in the lower half
// where the template backgrounds were designed to be lighter and text-friendly.
const PHOTO_ZONE: PhotoZone = {
  x: 350,
  y: 560,
  width: 380,
  height: 380,
  shape: "circle",
};

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  rainbow_bridge: {
    id: "rainbow_bridge",
    label: "Rainbow Bridge",
    background: "/templates/rainbow_bridge.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE,
    nameZone: { x: 540, y: 1050, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1130, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1200, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
  anniversary: {
    id: "anniversary",
    label: "Anniversary",
    background: "/templates/anniversary.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE,
    // Text now lands in the cream lower half of the template (below the dark candle scene),
    // so dark colors work — same as the other templates.
    nameZone: { x: 540, y: 1050, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1130, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1200, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
  birthday_heaven: {
    id: "birthday_heaven",
    label: "Birthday in Heaven",
    background: "/templates/birthday_heaven.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE,
    nameZone: { x: 540, y: 1050, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1130, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1200, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
  memory: {
    id: "memory",
    label: "In Memory",
    background: "/templates/memory.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE,
    nameZone: { x: 540, y: 1050, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1130, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1200, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
};

export function getNextTemplate(current: TemplateId): TemplateId {
  const order: TemplateId[] = [
    "rainbow_bridge",
    "anniversary",
    "birthday_heaven",
    "memory",
  ];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}

export function slugify(petName: string, bornYear?: string, diedYear?: string): string {
  const name = petName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (bornYear && diedYear) return `${name}-${bornYear}-${diedYear}`;
  if (diedYear) return `${name}-${diedYear}`;
  return name;
}
