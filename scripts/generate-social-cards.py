"""Generate deterministic Open Graph cards from approved project photography.

The AI-generated fjord backdrop is intentionally kept text-free. All brand text
is composed here so names remain exact and the six route cards stay consistent.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images"
OUTPUT = PUBLIC / "social"
ASSETS = ROOT / "scripts" / "assets"
SIZE = (1200, 630)

def available_font(*candidates: str) -> Path:
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return path
    raise FileNotFoundError(f"None of the expected fonts is installed: {candidates}")


SERIF = available_font(
    r"C:\Windows\Fonts\georgiab.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
)
SANS_BOLD = available_font(
    r"C:\Windows\Fonts\arialbd.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
)
SANS = available_font(
    r"C:\Windows\Fonts\arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
)

CARDS = {
    "home.jpg": {
        "source": ASSETS / "social-base-fjord.png",
        "label": "DIRECT FROM THE FJORDS",
        "focus": (0.50, 0.50),
    },
    "products.jpg": {
        "source": PUBLIC / "catalog" / "salmon-fillet.webp",
        "label": "B2B SALMON PORTFOLIO",
        "focus": (0.64, 0.52),
    },
    "norwell.jpg": {
        "source": PUBLIC / "catalog" / "norway-farm-wide.webp",
        "label": "NORWELL AS · NORWAY",
        "focus": (0.60, 0.45),
    },
    "about.jpg": {
        "source": PUBLIC / "people" / "mai-tonheim-portrait.jpg",
        "label": "MAI TONHEIM · FOUNDER",
        "focus": (0.70, 0.38),
    },
    "privacy.jpg": {
        "source": ASSETS / "social-base-fjord.png",
        "label": "PRIVACY & TRANSPARENCY",
        "focus": (0.50, 0.50),
        "icon": "shield",
    },
    "terms.jpg": {
        "source": ASSETS / "social-base-fjord.png",
        "label": "INSTITUTIONAL INFORMATION",
        "focus": (0.50, 0.50),
        "icon": "document",
    },
}


def fit_cover(source: Path, focus: tuple[float, float]) -> Image.Image:
    with Image.open(source) as opened:
        return ImageOps.fit(
            opened.convert("RGB"),
            SIZE,
            method=Image.Resampling.LANCZOS,
            centering=focus,
        )


def add_overlay(image: Image.Image) -> Image.Image:
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    pixels = overlay.load()
    for x in range(SIZE[0]):
        ratio = x / SIZE[0]
        alpha = int(max(52, 232 - ratio * 238))
        for y in range(SIZE[1]):
            bottom = max(0, int((y / SIZE[1] - 0.68) * 118))
            pixels[x, y] = (0, 34, 39, min(238, alpha + bottom))
    return Image.alpha_composite(image.convert("RGBA"), overlay)


def letterspaced_text(
    draw: ImageDraw.ImageDraw,
    position: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: str,
    spacing: int,
) -> None:
    x, y = position
    for character in text:
        draw.text((x, y), character, font=font, fill=fill)
        x += int(draw.textlength(character, font=font)) + spacing


def draw_shield(draw: ImageDraw.ImageDraw) -> None:
    points = [(950, 164), (1060, 202), (1054, 350), (1005, 425), (950, 466), (895, 425), (846, 350), (840, 202)]
    draw.line(points + [points[0]], fill="#c1e4f2", width=9, joint="curve")
    draw.line([(900, 314), (936, 350), (1009, 270)], fill="#dd6c67", width=12, joint="curve")


def draw_document(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((864, 150, 1037, 462), radius=14, outline="#c1e4f2", width=8)
    draw.polygon([(979, 150), (1037, 208), (979, 208)], fill="#c1e4f2")
    for y, width in ((270, 112), (320, 112), (370, 78)):
        draw.rounded_rectangle((895, y, 895 + width, y + 9), radius=4, fill="#dd6c67")


def render_card(name: str, config: dict[str, object]) -> None:
    image = fit_cover(config["source"], config["focus"])
    image = add_overlay(image)
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle((68, 62, 150, 70), radius=4, fill="#dd6c67")
    draw.text((68, 162), "Bridge Point", font=ImageFont.truetype(SERIF, 65), fill="#ffffff")
    draw.text((70, 245), "Norway  ·  Brazil", font=ImageFont.truetype(SANS, 24), fill="#c1e4f2")

    letterspaced_text(
        draw,
        (70, 465),
        str(config["label"]),
        ImageFont.truetype(SANS_BOLD, 21),
        "#ffffff",
        3,
    )
    draw.rounded_rectangle((70, 519, 408, 525), radius=3, fill="#dd6c67")

    icon = config.get("icon")
    if icon == "shield":
        draw_shield(draw)
    elif icon == "document":
        draw_document(draw)

    output = OUTPUT / name
    image.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.2, percent=55, threshold=4)).save(
        output,
        format="JPEG",
        quality=90,
        subsampling=1,
        optimize=True,
        progressive=True,
    )
    with Image.open(output) as rendered:
        if rendered.size != SIZE:
            raise RuntimeError(f"Unexpected social-card size for {output}: {rendered.size}")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for filename, configuration in CARDS.items():
        render_card(filename, configuration)
        print(f"generated {OUTPUT / filename}")


if __name__ == "__main__":
    main()
