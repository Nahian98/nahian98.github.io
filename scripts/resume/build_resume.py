"""
Builds public/resume.pdf — the one-page A4 resume — with ReportLab.

Usage (from the repo root):
    python3 -m venv .venv-resume && .venv-resume/bin/pip install reportlab==4.2.5
    .venv-resume/bin/python scripts/resume/build_resume.py

Fonts: Carlito (metric-compatible with Calibri, SIL OFL). The script downloads
the TTFs into scripts/resume/fonts/ on first run (git-ignored).

The layout is a fixed single page: every block's spacing below is tuned so the
content exactly fills the page. If you add text, check that nothing overflows
(the script fails loudly if the content no longer fits on one page).
"""

from __future__ import annotations

import sys
import urllib.request
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Flowable, Frame, PageTemplate, Paragraph, Spacer

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
OUT = ROOT / "public" / "resume.pdf"
FONT_DIR = HERE / "fonts"
FONT_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/carlito/Carlito-{}.ttf"

# ── Theme ────────────────────────────────────────────────────────────────────
DARK = HexColor("#1E1E1E")
BLUE = HexColor("#1F4E79")
GRAY = HexColor("#555555")
SEP = HexColor("#9AA9BA")
RULE = HexColor("#B8C7D9")

REG, BOLD, ITAL = "Carlito", "Carlito-Bold", "Carlito-Italic"
BODY = 10.2
LEAD = 12.9

PAGE_W, PAGE_H = A4
MARGIN_X = 45.35433  # 16 mm
CONTENT_W = PAGE_W - 2 * MARGIN_X
TOP = 807.874  # top edge of the name block

# ── Content ──────────────────────────────────────────────────────────────────
NAME = "Abdullah Al Nahian Kanon"
ROLE = "Software Engineer | Android"
# (text, link or None)
CONTACT_1 = [
    ("Dhaka, Bangladesh", None),
    ("+880 1968 565328", "tel:+8801968565328"),
    ("abdullahalnahiankanon@gmail.com", "mailto:abdullahalnahiankanon@gmail.com"),
]
CONTACT_2 = [
    ("linkedin.com/in/abdullah-al-nahian-kanon-931594296", "https://www.linkedin.com/in/abdullah-al-nahian-kanon-931594296"),
    ("github.com/Nahian98", "https://github.com/Nahian98"),
    ("nahian98.github.io", "https://nahian98.github.io/"),
]

SUMMARY = (
    "Software Engineer with 3+ years of professional experience building production apps in Kotlin and Java, "
    "specializing in Android. Independently owns moderately complex features from design to release, focused on "
    "layered architecture (Clean Architecture, MVVM, MVI), automated testing, and debugging of existing systems. "
    "Networking and integration depth across REST APIs, cloud SDKs, WebSockets, and HTTP servers; shipped a Google "
    "Play app with 500K+ downloads."
)

SKILLS = [
    ("Languages", "Kotlin, Java, SQL"),
    ("Architecture &amp; Design", "Clean Architecture, MVVM, MVI, multi-module and feature-first design, dependency injection"),
    ("Concurrency &amp; Data", "Kotlin Coroutines, Flow / StateFlow, Room, Realm, SQLite, MySQL, DataStore"),
    ("Networking &amp; Integration", "REST APIs, Retrofit, OkHttp, Volley, Ktor, WebSockets, NanoHTTPD, FTPS, cloud storage SDKs"),
    ("Platform", "Android SDK, Jetpack Compose, XML Views, Services and background processing, Media3 / ExoPlayer"),
    ("Testing &amp; Quality", "Unit and instrumented testing, JUnit, MockK, Turbine, Coroutines Test, Android Lint, code review"),
    ("Tooling &amp; Delivery", "Git, GitHub, GitHub Actions CI/CD, Gradle (Kotlin DSL, convention plugins, version catalogs)"),
]

EXPERIENCE = [
    {
        "role": "Software Engineer (Android)",
        "period": "Aug 2023 – Present",
        "company": "Applab Ltd.",
        "location": "Dhaka, Bangladesh",
        "bullets": [
            "Independently own moderately complex features end to end, breaking work into tasks and carrying it from "
            "technical design through implementation, testing, and production release.",
            "Build features on Clean Architecture, MVVM, and MVI with Kotlin Coroutines and Flow, separating UI, domain, "
            "and data layers so business logic stays testable and maintainable.",
            "Integrate REST APIs and cloud storage SDKs (Google Drive, OneDrive, Dropbox) using Retrofit, Volley, OkHttp, "
            "and Ktor, handling authentication flows and asynchronous network operations.",
            "Developed a media playback module on ExoPlayer / Media3 backed by Android background services, keeping "
            "playback reliable outside the app’s foreground lifecycle.",
            "Debug existing production code, tracing behavior across UI, data, and network layers to isolate and fix root causes.",
            "Write unit and instrumented tests for feature and data layers; review peers’ code for correctness and readability.",
        ],
    },
]

PROJECTS = [
    {
        "title": "Offline Music Player",
        "tech": "Kotlin, Media3 / ExoPlayer, Realm, MVVM",
        "right": "Google Play · 500K+ downloads",
        "url": "https://play.google.com/store/apps/details?id=com.offlinemusicplayer",
        "bullets": [
            "Published an offline-first music player on Google Play with 500K+ downloads, built on MVVM with Realm and a "
            "UI in XML Views and Jetpack Compose.",
            "Integrated Google Drive, OneDrive, Dropbox, and Box SDKs to sync cloud music to local storage via Volley and OkHttp.",
            "Implemented background playback with Media3 / ExoPlayer, a foreground service, and lock-screen media controls.",
        ],
    },
    {
        "title": "Entrix",
        "tech": "Kotlin, Jetpack Compose, Koin, Room, DataStore",
        "right": "github.com/Nahian98/Entrix",
        "url": "https://github.com/Nahian98/Entrix",
        "bullets": [
            "Designed a privacy-first attendance tracker as a 17-module, feature-first Clean Architecture with pure "
            "Kotlin/JVM domain and model modules that enforce framework independence.",
            "Implemented an idempotent ENTER → DWELL → EXIT geofence reconciliation policy that ignores boundary jitter, "
            "preserves the true entry time across process death, and reopens a visit after a false exit.",
            "Wrote 93 JVM unit tests plus instrumented Room DAO and migration tests; CI runs tests, lint, and release builds.",
        ],
    },
    {
        "title": "File-Server",
        "tech": "Kotlin, Ktor, NanoHTTPD, WebSockets, FTPS",
        "right": "github.com/Nahian98/File-Server",
        "url": "https://github.com/Nahian98/File-Server",
        "bullets": [
            "Built an offline device-to-device file-sharing prototype for Android and iOS, comparing five transports: a "
            "socket-level HTTP server, NanoHTTPD, embedded Ktor (Netty), WebSockets, and FTPS.",
            "Set up local networking via Local-Only Hotspot and Wi-Fi Direct, with QR-code pairing and upload progress tracking.",
        ],
    },
]

EDUCATION = {
    "school": "Khulna University of Engineering &amp; Technology (KUET)",
    "period": "Jan 2018 – Feb 2023",
    "degree": "Bachelor of Science in Computer Science and Engineering",
    "location": "Khulna, Bangladesh",
}


# ── Fonts ────────────────────────────────────────────────────────────────────
def register_fonts() -> None:
    FONT_DIR.mkdir(exist_ok=True)
    for name, variant in ((REG, "Regular"), (BOLD, "Bold"), (ITAL, "Italic")):
        path = FONT_DIR / f"Carlito-{variant}.ttf"
        if not path.exists():
            urllib.request.urlretrieve(FONT_URL.format(variant), path)
        pdfmetrics.registerFont(TTFont(name, str(path)))


# ── Flowables ────────────────────────────────────────────────────────────────
class SectionHeading(Flowable):
    """Bold blue caps title with a thin rule underneath."""

    def __init__(self, text: str):
        super().__init__()
        self.text = text

    def wrap(self, aw, ah):
        return CONTENT_W, 17

    def draw(self):
        c = self.canv
        c.setFillColor(BLUE)
        c.setFont(BOLD, 11.2)
        c.drawString(0, 5.5, self.text)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.7)
        c.line(0, 1.2, CONTENT_W, 1.2)


class Row(Flowable):
    """One line with left-aligned runs and an optional right-aligned run."""

    def __init__(
        self,
        left: list[tuple[str, str, object]],
        right: tuple[str, str, object] | None = None,
        right_url: str | None = None,
    ):
        super().__init__()
        self.left = left
        self.right = right
        self.right_url = right_url

    def wrap(self, aw, ah):
        return CONTENT_W, 13.5

    def draw(self):
        c = self.canv
        x = 0.0
        for text, font, color in self.left:
            c.setFont(font, BODY)
            c.setFillColor(color)
            c.drawString(x, 3.1, text)
            x += pdfmetrics.stringWidth(text, font, BODY)
        if self.right:
            text, font, color = self.right
            c.setFont(font, BODY)
            c.setFillColor(color)
            c.drawRightString(CONTENT_W, 3.1, text)
            if self.right_url:
                w = pdfmetrics.stringWidth(text, font, BODY)
                c.linkURL(self.right_url, (CONTENT_W - w, 0, CONTENT_W, 13.5), relative=1)


# ── Styles ───────────────────────────────────────────────────────────────────
S_NAME = ParagraphStyle("name", fontName=BOLD, fontSize=24, leading=28, alignment=TA_CENTER, textColor=DARK, spaceAfter=1)
S_ROLE = ParagraphStyle("role", fontName=REG, fontSize=11.5, leading=15, alignment=TA_CENTER, textColor=BLUE)
S_CONTACT = ParagraphStyle("contact", fontName=REG, fontSize=9.6, leading=12.6, alignment=TA_CENTER, textColor=GRAY)
S_BODY = ParagraphStyle("body", fontName=REG, fontSize=BODY, leading=LEAD, alignment=TA_LEFT, textColor=DARK)
S_SKILL = ParagraphStyle("skill", parent=S_BODY, spaceAfter=1.2)
S_BULLET = ParagraphStyle(
    "bullet", parent=S_BODY, leftIndent=12, bulletIndent=2, bulletFontName=REG, bulletFontSize=BODY,
    bulletColor=BLUE, spaceAfter=1.5,
)


def joined(parts: list[tuple[str, str | None]], color: object) -> str:
    """Contact line: values in `color` (linked where a URL is given), with light " | " dividers."""
    sep = f'<font color="#{SEP.hexval()[2:]}"> | </font>'
    hexc = f"#{color.hexval()[2:]}"
    out = []
    for text, url in parts:
        run = f'<font color="{hexc}">{text}</font>'
        out.append(f'<a href="{url}">{run}</a>' if url else run)
    return sep.join(out)


def bullets(items: list[str]) -> list[Flowable]:
    return [Paragraph(text, S_BULLET, bulletText="•") for text in items]


def story() -> list[Flowable]:
    s: list[Flowable] = [
        Paragraph(NAME, S_NAME),
        Paragraph(ROLE, S_ROLE),
        Spacer(0, 2),
        Paragraph(joined(CONTACT_1, GRAY), S_CONTACT),
        Paragraph(joined(CONTACT_2, BLUE), S_CONTACT),
        Spacer(0, 5),
    ]

    def section(title: str) -> None:
        s.extend([Spacer(0, 4), SectionHeading(title), Spacer(0, 3.5)])

    section("PROFESSIONAL SUMMARY")
    s.append(Paragraph(SUMMARY, S_BODY))

    section("TECHNICAL SKILLS")
    s.extend(Paragraph(f'<font name="{BOLD}">{k}:</font> {v}', S_SKILL) for k, v in SKILLS)

    section("PROFESSIONAL EXPERIENCE")
    for job in EXPERIENCE:
        s.append(Row([(job["role"], BOLD, DARK)], (job["period"], BOLD, DARK)))
        s.append(Row([(job["company"], ITAL, BLUE)], (job["location"], ITAL, GRAY)))
        s.append(Spacer(0, 2.5))
        s.extend(bullets(job["bullets"]))

    section("SELECTED PROJECTS")
    for i, p in enumerate(PROJECTS):
        if i:
            s.append(Spacer(0, 4.5))
        s.append(Row([(p["title"], BOLD, DARK), (f"  —  {p['tech']}", ITAL, GRAY)], (p["right"], REG, BLUE), p.get("url")))
        s.append(Spacer(0, 2))
        s.extend(bullets(p["bullets"]))

    section("EDUCATION")
    e = EDUCATION
    s.append(Row([(e["school"].replace("&amp;", "&"), BOLD, DARK)], (e["period"], BOLD, DARK)))
    s.append(Row([(e["degree"], ITAL, BLUE)], (e["location"], ITAL, GRAY)))
    return s


def build() -> None:
    register_fonts()
    doc = BaseDocTemplate(
        str(OUT), pagesize=A4, title=f"{NAME} – Resume – Software Engineer II", author=NAME, subject="Resume",
        leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=PAGE_H - TOP, bottomMargin=36,
    )
    frame = Frame(MARGIN_X, 36, CONTENT_W, TOP - 36, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="page", frames=[frame])])
    doc.build(story())
    pages = doc.page
    if pages != 1:
        sys.exit(f"Resume overflowed to {pages} pages — shorten the content.")
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
