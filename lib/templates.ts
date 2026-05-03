export type TemplateId =
  | "classic"
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

// Photo zone for the four illustrated templates.
// Center at (540, 850) — at the boundary where the painted scene transitions
// to the light cream area. Top-left = (540-240, 850-240) = (300, 610).
// Larger 480×480 size for more emotional weight.
const PHOTO_ZONE_ILLUSTRATED: PhotoZone = {
  x: 300,
  y: 610,
  width: 480,
  height: 480,
  shape: "circle",
};

// Anniversary's light zone starts lower — push photo and text down 50px.
const PHOTO_ZONE_ANNIVERSARY: PhotoZone = {
  x: 300,
  y: 660,
  width: 480,
  height: 480,
  shape: "circle",
};

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  classic: {
    id: "classic",
    label: "Classic",
    background: "/templates/classic.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    // Solid cream background — photo can go higher and bigger since there's no
    // competing artwork. Center (540, 700), 540×540 → top-left (270, 430).
    photoZone: { x: 270, y: 430, width: 540, height: 540, shape: "circle" },
    nameZone: { x: 540, y: 1100, fontSize: 72, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1190, fontSize: 36, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1280, fontSize: 32, color: "#888888", align: "center", italic: true },
  },
  rainbow_bridge: {
    id: "rainbow_bridge",
    label: "Rainbow Bridge",
    background: "/templates/rainbow_bridge.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE_ILLUSTRATED,
    nameZone: { x: 540, y: 1150, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1240, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1320, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
  anniversary: {
    id: "anniversary",
    label: "Anniversary",
    background: "/templates/anniversary.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE_ANNIVERSARY,
    // Anniversary's cream zone starts lower — push text down 50px.
    nameZone: { x: 540, y: 1200, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1290, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1370, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
  birthday_heaven: {
    id: "birthday_heaven",
    label: "Birthday in Heaven",
    background: "/templates/birthday_heaven.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE_ILLUSTRATED,
    nameZone: { x: 540, y: 1150, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1240, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1320, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
  memory: {
    id: "memory",
    label: "In Memory",
    background: "/templates/memory.png",
    canvasWidth: 1080,
    canvasHeight: 1920,
    photoZone: PHOTO_ZONE_ILLUSTRATED,
    nameZone: { x: 540, y: 1150, fontSize: 64, color: "#2A2A2A", align: "center" },
    datesZone: { x: 540, y: 1240, fontSize: 32, color: "#5A5A5A", align: "center" },
    tributeZone: { x: 540, y: 1320, fontSize: 28, color: "#888888", align: "center", italic: true },
  },
};

export function getNextTemplate(current: TemplateId): TemplateId {
  const order: TemplateId[] = [
    "classic",
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
