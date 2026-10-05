"""Generate deterministic Open Graph cards from approved project photography.

The AI-generated fjord backdrop is intentionally kept text-free. All brand text
is composed here so names remain exact and the five route cards stay consistent.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images"
OUTPUT = PUBLIC / "social"
ASSETS = ROOT / "scripts" / "assets"
SIZE = (1200, 630)

# Cores do manual de perfil da Norwell (as mesmas de src/index.css).
SEA = (20, 83, 83)  # sjøgrønn, fundo do painel do logotipo
SEA_DARK = (13, 58, 58)  # sjøgrønn escurecido, para o véu sobre a foto
PANEL_WIDTH = 520
SHORE = "#78c496"  # fjæregrønn
FROST = "#d0eada"  # fjæregrønn a 35%

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
        "label": "NORWEGIAN SALMON FOR BRAZIL",
        "focus": (0.50, 0.50),
    },
    "products.jpg": {
        "source": PUBLIC / "catalog" / "fjord-salmon-fillet.webp",
        "label": "B2B SALMON PORTFOLIO",
        "focus": (0.50, 0.55),
    },
    "norwell.jpg": {
        "source": PUBLIC / "catalog" / "norway-farm-wide.webp",
        "label": "NORWELL AS · FLORØ, NORWAY",
        "focus": (0.60, 0.45),
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
    """Véu leve sobre a foto e painel sjøgrønn sólido à esquerda.

    O manual da Norwell não admite o logotipo sobre fotografia: ele fica no
    painel sólido, ligado à foto pela fjærestreken.
    """
    overlay = Image.new("RGBA", SIZE, (*SEA_DARK, 96))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, PANEL_WIDTH, SIZE[1]), fill=(*SEA, 255))
    draw.rectangle((PANEL_WIDTH, 0, PANEL_WIDTH + 5, SIZE[1]), fill=SHORE)
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
    draw.line(points + [points[0]], fill=FROST, width=9, joint="curve")
    draw.line([(900, 314), (936, 350), (1009, 270)], fill=SHORE, width=12, joint="curve")


def draw_document(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((864, 150, 1037, 462), radius=14, outline=FROST, width=8)
    draw.polygon([(979, 150), (1037, 208), (979, 208)], fill=FROST)
    for y, width in ((270, 112), (320, 112), (370, 78)):
        draw.rounded_rectangle((895, y, 895 + width, y + 9), radius=4, fill=SHORE)


def brand_logo(name: str, height: int) -> Image.Image:
    """Logotipo oficial (versão em negativo) rasterizado do SVG em public/brand."""
    import fitz  # PyMuPDF renderiza SVG sem dependências nativas extras

    with fitz.open(ROOT / "public" / "brand" / f"{name}.svg") as document:
        page = document[0]
        zoom = height / page.rect.height
        pixmap = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=True)
    return Image.frombytes("RGBA", (pixmap.width, pixmap.height), pixmap.samples)


def render_card(name: str, config: dict[str, object]) -> None:
    image = fit_cover(config["source"], config["focus"])
    image = add_overlay(image)
    draw = ImageDraw.Draw(image)

    # Marca do site: Norwell; abaixo, a Bridge Point como representante no Brasil.
    image.alpha_composite(brand_logo("norwell-negative", 104), (62, 108))
    draw.rectangle((62, 268, 122, 270), fill=SHORE)
    draw.text((62, 292), "Official representative in Brazil", font=ImageFont.truetype(SANS, 20), fill=FROST)
    image.alpha_composite(brand_logo("bridgepoint-horizontal-white", 40), (62, 332))

    letterspaced_text(
        draw,
        (62, 520),
        str(config["label"]),
        ImageFont.truetype(SANS_BOLD, 19),
        "#ffffff",
        3,
    )

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
