"""Offline integrity checks and executable learning examples."""

from html.parser import HTMLParser
from pathlib import Path
import subprocess
import sys
import unittest
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = []
        self.links = []
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ("href", "src"):
            if key in attrs:
                self.links.append(attrs[key])


class SiteTests(unittest.TestCase):
    def test_local_links_and_fragments(self):
        paths = list(ROOT.glob("*.html"))
        for directory in ("lessons", "projects", "reference"):
            paths.extend((ROOT / directory).rglob("*.html"))
        pages = {path.resolve(): Page(path) for path in paths}
        self.assertGreaterEqual(len(pages), 5)
        for path, page in pages.items():
            self.assertEqual(len(page.ids), len(set(page.ids)), str(path))
            for link in page.links:
                with self.subTest(page=path.name, link=link):
                    url = urlsplit(link)
                    if url.scheme or url.netloc:
                        continue
                    target = (path.parent / unquote(url.path)).resolve() if url.path else path
                    self.assertTrue(target.is_file(), str(target))
                    if url.fragment and target in pages:
                        self.assertIn(unquote(url.fragment), pages[target].ids)

    def test_hello_output(self):
        result = subprocess.run(
            [sys.executable, "-X", "utf8", "demos/01-hello/main.py"],
            cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True,
        )
        self.assertEqual(result.stdout.splitlines(), ["你好，Python！", "今天专注学习 25 分钟。"])

    def test_exercise_examples(self):
        source = (ROOT / "demos/01-hello/solution.py").read_text(encoding="utf-8")
        for days, total in ((5, 125), (7, 175), (0, 0)):
            with self.subTest(days=days):
                result = subprocess.run(
                    [sys.executable, "-X", "utf8", "-c", source.replace("days = 5", f"days = {days}")],
                    capture_output=True, text=True, encoding="utf-8", check=True,
                )
                self.assertEqual(result.stdout.strip(), f"一共学习 {total} 分钟。")


if __name__ == "__main__":
    unittest.main()
