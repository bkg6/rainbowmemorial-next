import { TEMPLATES, type TemplateId } from "./templates";

export interface RenderInput {
  photoUrl: string;
  name: string;
  bornDate?: string | null;
  diedDate: string;
  tributeLine?: string | null;
  templateId: TemplateId;
  watermark?: boolean;
}

function formatYear(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}

function buildDatesString(bornDate?: string | null, diedDate?: string): string {
  const died = diedDate ? formatYear(diedDate) : "____";
  const born = bornDate ? formatYear(bornDate) : null;
  return born ? `${born} — ${died}` : died;
}

export async function renderMemorial(input: RenderInput): Promise<Buffer> {
  const { ImageResponse } = await import("@vercel/og");
  const template = TEMPLATES[input.templateId];
  const dates = buildDatesString(input.bornDate, input.diedDate);

  const fontCormorantBold = await fetch(
    "https://fonts.gstatic.com/s/cormorantgaramond/v22/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2"
  ).then((r) => r.arrayBuffer());

  const fontDMSans = await fetch(
    "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriOZSCHBeHFl0.woff2"
  ).then((r) => r.arrayBuffer());

  const { width, height } = { width: template.canvasWidth, height: template.canvasHeight };
  const pz = template.photoZone;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  const element = (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        backgroundImage: `url(${appUrl}${template.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Photo zone */}
      <div
        style={{
          position: "absolute",
          left: pz.x,
          top: pz.y,
          width: pz.width,
          height: pz.height,
          borderRadius: pz.shape === "circle" ? "50%" : "12px",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={input.photoUrl}
          alt={input.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Name */}
      <div
        style={{
          position: "absolute",
          top: template.nameZone.y,
          left: 0,
          right: 0,
          textAlign: template.nameZone.align,
          fontSize: template.nameZone.fontSize,
          color: template.nameZone.color,
          fontFamily: "CormorantGaramond",
          fontWeight: 400,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {input.name}
      </div>

      {/* Dates */}
      <div
        style={{
          position: "absolute",
          top: template.datesZone.y,
          left: 0,
          right: 0,
          textAlign: template.datesZone.align,
          fontSize: template.datesZone.fontSize,
          color: template.datesZone.color,
          fontFamily: "DMSans",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {dates}
      </div>

      {/* Tribute */}
      {input.tributeLine && (
        <div
          style={{
            position: "absolute",
            top: template.tributeZone.y,
            left: 80,
            right: 80,
            textAlign: template.tributeZone.align,
            fontSize: template.tributeZone.fontSize,
            color: template.tributeZone.color,
            fontFamily: "CormorantGaramond",
            fontStyle: "italic",
            display: "flex",
            justifyContent: "center",
          }}
        >
          &ldquo;{input.tributeLine}&rdquo;
        </div>
      )}

      {/* Watermark — diagonal, 18% opacity, multiply blend */}
      {input.watermark && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mixBlendMode: "multiply",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontFamily: "DMSans",
              fontWeight: 500,
              color: `rgba(42,31,24,0.18)`,
              transform: "rotate(-45deg)",
              letterSpacing: "0.25em",
              whiteSpace: "nowrap",
            }}
          >
            rainbow.memorial
          </div>
        </div>
      )}
    </div>
  ) as unknown as JSX.Element;

  const response = new ImageResponse(element, {
    width,
    height,
    fonts: [
      { name: "CormorantGaramond", data: fontCormorantBold, style: "normal" },
      { name: "DMSans", data: fontDMSans, style: "normal" },
    ],
  });

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Render a 1200x630 Open Graph image for social link previews.
 * Layout: pet photo on the left third (circular), name + dates on the right two-thirds.
 * The template background is used as a subtle backdrop (fully visible, not dimmed —
 * @vercel/og does not support filter:brightness reliably).
 */
export async function renderOgImage(input: RenderInput): Promise<Buffer> {
  const { ImageResponse } = await import("@vercel/og");
  const template = TEMPLATES[input.templateId];
  const dates = buildDatesString(input.bornDate, input.diedDate);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  const fontCormorant = await fetch(
    "https://fonts.gstatic.com/s/cormorantgaramond/v22/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2"
  ).then((r) => r.arrayBuffer());

  const fontDMSans = await fetch(
    "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriOZSCHBeHFl0.woff2"
  ).then((r) => r.arrayBuffer());

  // Anniversary uses light text on dark bg; everything else dark text on light bg
  const onDark = input.templateId === "anniversary";
  const eyebrowColor = onDark ? "#D4C9BD" : "#888888";
  const nameColor = onDark ? "#FFFFFF" : "#2A2A2A";
  const datesColor = onDark ? "#D4C9BD" : "#5A5A5A";
  const tributeColor = onDark ? "#B8ADA0" : "#888888";
  const overlay = onDark ? "rgba(20,30,50,0.55)" : "rgba(250,246,239,0.85)";

  const element = (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        backgroundImage: `url(${appUrl}${template.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "DMSans",
      }}
    >
      {/* Tinted overlay so foreground content is readable */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlay,
          display: "flex",
        }}
      />

      {/* Photo column */}
      <div
        style={{
          width: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            border: onDark ? "3px solid rgba(255,255,255,0.4)" : "3px solid rgba(255,255,255,0.8)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={input.photoUrl}
            alt={input.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Text column */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 80,
          paddingLeft: 20,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: eyebrowColor,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "flex",
          }}
        >
          In loving memory
        </div>
        <div
          style={{
            fontSize: 88,
            color: nameColor,
            fontFamily: "CormorantGaramond",
            lineHeight: 1.05,
            marginBottom: 16,
            display: "flex",
          }}
        >
          {input.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: datesColor,
            display: "flex",
          }}
        >
          {dates}
        </div>
        {input.tributeLine && (
          <div
            style={{
              fontSize: 26,
              color: tributeColor,
              fontStyle: "italic",
              fontFamily: "CormorantGaramond",
              marginTop: 24,
              display: "flex",
            }}
          >
            &ldquo;{input.tributeLine}&rdquo;
          </div>
        )}
      </div>
    </div>
  ) as unknown as JSX.Element;

  const response = new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "CormorantGaramond", data: fontCormorant, style: "normal" },
      { name: "DMSans", data: fontDMSans, style: "normal" },
    ],
  });

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
