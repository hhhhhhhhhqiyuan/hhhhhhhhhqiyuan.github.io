"""Build the English edition without altering Chinese pages or image assets.

Install beautifulsoup4 in a Python environment, then run this script. Copy is
reviewed in data/english-copy.json. Missing translations fail the build so that
new Chinese copy cannot silently leak into the English edition.
"""

import json
import posixpath
import re
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

from bs4 import BeautifulSoup, Comment, NavigableString

ROOT = Path(__file__).resolve().parents[1]
HOST = "https://hhhhhhhhhqiyuan.github.io"
COPY = json.loads((ROOT / "data/english-copy.json").read_text())
CJK = re.compile(r"[\u3400-\u9fff]")
MAIN = ["index.html", "about.html", "ai-workflow.html"] + [
    str(p.relative_to(ROOT))
    for p in sorted((ROOT / "projects").glob("*.html"))
    if "review" not in p.name
]
DEMOS = [
    str(p.relative_to(ROOT))
    for p in sorted((ROOT / "assets/portfolio/lelian/explorations").glob("*.html"))
]
LOCALIZED = set(MAIN + DEMOS + ["scripts/lelian-exploration.js"])


def translate(value):
    stripped = value.strip()
    if not CJK.search(stripped):
        return value
    if stripped not in COPY:
        raise ValueError(f"Missing English copy: {stripped}")
    # Keep boundary spaces where an inline span separates a label from its body.
    leading = value[: len(value) - len(value.lstrip())]
    trailing = value[len(value.rstrip()) :]
    return leading + COPY[stripped] + trailing


def rewrite_url(value, source):
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return value
    resolved = posixpath.normpath(
        parsed.path.lstrip("/")
        if parsed.path.startswith("/")
        else posixpath.join(posixpath.dirname(source), parsed.path)
    )
    target = "en/" + resolved if resolved in LOCALIZED else resolved
    relative = posixpath.relpath(target, posixpath.dirname("en/" + source))
    return urlunsplit(("", "", relative, parsed.query, parsed.fragment))


def build_page(source):
    soup = BeautifulSoup((ROOT / source).read_text(), "html.parser")
    soup.html["lang"] = "en"
    soup.body["class"] = [*soup.body.get("class", []), "english-version"]

    for node in list(soup.find_all(string=True)):
        if isinstance(node, Comment) or node.parent.name in ("script", "style"):
            continue
        if not CJK.search(str(node)):
            continue
        node.replace_with(NavigableString(translate(str(node))))
    for element in soup.find_all():
        for key, value in list(element.attrs.items()):
            if isinstance(value, str) and key != "style" and CJK.search(value):
                element[key] = translate(value)
        for attribute in (
            "href", "src", "poster", "data-page-src", "data-full-image", "data-html-demo"
        ):
            if element.has_attr(attribute):
                element[attribute] = rewrite_url(element[attribute], source)
        for attribute in ("srcset", "imagesrcset"):
            if element.has_attr(attribute):
                choices = []
                for choice in element[attribute].split(","):
                    parts = choice.strip().split()
                    parts[0] = rewrite_url(parts[0], source)
                    choices.append(" ".join(parts))
                element[attribute] = ", ".join(choices)

    for element in soup.select('meta[property="og:locale"]'):
        element["content"] = "en_US"
    canonical = HOST + "/en/" + ("" if source == "index.html" else source)
    for element in soup.select('link[rel="canonical"]'):
        element["href"] = canonical
    for element in soup.select('meta[property="og:url"]'):
        element["content"] = canonical
    if source in MAIN:
        for language, path in (("en", canonical), ("zh-CN", HOST + "/" + source)):
            tag = soup.new_tag("link", rel="alternate", hreflang=language, href=path)
            soup.head.append(tag)
        css = soup.new_tag(
            "link", rel="stylesheet",
            href=rewrite_url("/styles/english.css?v=20261117", source)
        )
        soup.head.append(css)
        footer = soup.select_one(".project-footer, .native-footer, .workflow-footer, footer")
        if footer:
            language = soup.new_tag(
                "a", href=posixpath.relpath(source, posixpath.dirname("en/" + source)),
                attrs={"class": "edition-link", "hreflang": "zh-CN", "lang": "en"}
            )
            language.string = "Chinese version ↗"
            footer.append(language)

    # Format counts in conventional English units rather than preserving 万.
    if source in ("projects/acacia.html", "projects/east-oak.html"):
        values = (
            {"86.7": "867", "1.2": "12", "1.5": "15"}
            if "acacia" in source else
            {"111.4": "1.114", "49.3": "493", "3.6": "36"}
        )
        for small in soup.select("small"):
            if small.get_text(strip=True) != "×10K":
                continue
            strong = small.parent
            text = next((x for x in strong.contents if isinstance(x, NavigableString)), None)
            if text is None or text.strip() not in values:
                raise ValueError(f"Unexpected social metric in {source}: {strong}")
            original = text.strip()
            text.replace_with(values[original])
            small.string = "M" if original == "111.4" else "K"

    # Month/day ranges remain unambiguous to an international audience.
    for old, new in {
        "2025.09.17—2026.04.07": "Sep 17, 2025–Apr 7, 2026",
        "2025.05.23—2026.04.01": "May 23, 2025–Apr 1, 2026",
    }.items():
        for node in list(soup.find_all(string=old)):
            node.replace_with(new)

    # Do not imply an enterprise product system where the evidence is Shopify.
    if source == "projects/east-oak.html":
        for node in soup.find_all(string="SHOPIFY · DESIGN SYSTEM · EDM"):
            node.replace_with("SHOPIFY · COMPONENT SYSTEM · EMAIL")

    destination = ROOT / "en" / source
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(str(soup).rstrip() + "\n")


def build_dynamic_copy():
    source = (ROOT / "scripts/lelian-exploration.js").read_text()
    for chinese in sorted(COPY, key=len, reverse=True):
        source = source.replace(chinese, COPY[chinese])
    if CJK.search(source):
        raise ValueError("Untranslated dynamic LELIAN copy")
    # These iframe URLs resolve against the English project document, not JS.
    source = source.replace("../assets/", "../../assets/")
    destination = ROOT / "en/scripts/lelian-exploration.js"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(source)


if __name__ == "__main__":
    for page in MAIN + DEMOS:
        build_page(page)
    build_dynamic_copy()
    print(f"Built {len(MAIN)} English portfolio pages and {len(DEMOS)} English explorations.")
