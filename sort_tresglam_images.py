import csv
import os
import re
import shutil
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

# Configuration
IMAGES_DIR = "public/images"
DRY_RUN = True
MOVE_FILES = False

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".bmp", ".tiff"}
POSTER_KEYWORDS = {
    "poster",
    "banner",
    "creative",
    "ad",
    "flyer",
    "label",
    "front",
    "back",
    "cover",
}

STOP_WORDS = {
    "tresglam",
    "herbal",
    "cream",
    "face",
    "wash",
    "product",
    "image",
    "poster",
    "the",
    "and",
    "of",
}

PRODUCT_FOLDERS = [
    "tresglam-green-tea-tanning-whitening-glowing-face-wash",
    "tresglam-kiwi-whitening-glowing-face-wash",
    "ayurvedic-pinkish-glow-day-cream",
    "tresglam-herbal-lemon-super-pigmentation-cream",
    "tresglam-snow-white-night-use-cream",
    "tresglam-herbal-sunblock-oil-free-cream-spf-30",
    "tresglam-herbal-kiwi-super-pigmentation-cream",
    "tresglam-herbal-avocado-whitening-cream",
    "tresglam-basilque-organic-under-eye-cream",
    "tresglam-herbal-anti-aging-natural-cream",
]

PRODUCT_KEYWORDS: Dict[str, List[str]] = {
    "tresglam-green-tea-tanning-whitening-glowing-face-wash": [
        "green tea",
        "greentea",
        "de tan",
        "detan",
        "tanning",
        "foaming face wash",
    ],
    "tresglam-kiwi-whitening-glowing-face-wash": [
        "kiwi face wash",
        "kiwi wash",
        "instant glow face wash",
    ],
    "ayurvedic-pinkish-glow-day-cream": [
        "pinkish glow",
        "glow day cream",
        "ayurvedic pinkish",
    ],
    "tresglam-herbal-lemon-super-pigmentation-cream": [
        "lemon pigmentation",
        "lemon cream",
        "super pigmentation lemon",
    ],
    "tresglam-snow-white-night-use-cream": [
        "snow white",
        "snowwhite",
        "night use",
        "brightening cream",
    ],
    "tresglam-herbal-sunblock-oil-free-cream-spf-30": [
        "sunblock",
        "spf 30",
        "sunscreen",
        "oil free sunblock",
        "day care",
    ],
    "tresglam-herbal-kiwi-super-pigmentation-cream": [
        "kiwi pigmentation",
        "kiwi cream",
        "super pigmentation kiwi",
    ],
    "tresglam-herbal-avocado-whitening-cream": [
        "avocado",
        "avocado whitening",
    ],
    "tresglam-basilque-organic-under-eye-cream": [
        "under eye",
        "undereye",
        "dark circles",
        "eye bags",
        "basilque",
    ],
    "tresglam-herbal-anti-aging-natural-cream": [
        "anti aging",
        "anti-aging",
        "antiageing",
        "natural cream",
    ],
}

@dataclass
class MatchResult:
    product_folder: Optional[str]
    score: float
    notes: str


def normalize_text(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9\s]", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def tokenize(value: str) -> List[str]:
    tokens = [t for t in normalize_text(value).split() if t not in STOP_WORDS]
    return tokens


def is_poster(filename: str) -> bool:
    normalized = normalize_text(filename)
    tokens = set(normalized.split())
    return any(keyword in tokens or keyword in normalized for keyword in POSTER_KEYWORDS)


def score_keywords(filename: str, keywords: List[str]) -> Tuple[float, List[str]]:
    normalized = normalize_text(filename)
    tokens = set(tokenize(filename))
    score = 0.0
    hits: List[str] = []

    for phrase in keywords:
        phrase_norm = normalize_text(phrase)
        phrase_tokens = set(phrase_norm.split())

        if phrase_norm and phrase_norm in normalized:
            score += 3.0
            hits.append(phrase)
            continue

        if phrase_tokens and phrase_tokens.issubset(tokens):
            score += 2.0
            hits.append(phrase)
            continue

        if phrase_tokens and phrase_tokens & tokens:
            score += 1.0
            hits.append(phrase)

    if tokens:
        score += min(1.5, len(tokens) * 0.1)

    return score, hits


def find_best_match(filename: str) -> MatchResult:
    best_folder: Optional[str] = None
    best_score = 0.0
    best_notes = ""

    for folder, keywords in PRODUCT_KEYWORDS.items():
        score, hits = score_keywords(filename, keywords)
        if score > best_score:
            best_score = score
            best_folder = folder
            best_notes = ",".join(hits) if hits else "weak match"

    if best_score < 2.5:
        return MatchResult(None, best_score, "low confidence")

    return MatchResult(best_folder, best_score, best_notes)


def ensure_dir(path: str) -> None:
    if not os.path.isdir(path):
        os.makedirs(path, exist_ok=True)


def next_available_filename(folder: str, base_name: str, ext: str) -> str:
    candidate = f"{base_name}{ext}"
    if not os.path.exists(os.path.join(folder, candidate)):
        return candidate

    index = 2
    while True:
        candidate = f"{base_name}-{index:02d}{ext}"
        if not os.path.exists(os.path.join(folder, candidate)):
            return candidate
        index += 1


def gather_images(root_dir: str) -> List[str]:
    results: List[str] = []
    for current_root, _, files in os.walk(root_dir):
        for name in files:
            ext = os.path.splitext(name)[1].lower()
            if ext in IMAGE_EXTS:
                results.append(os.path.join(current_root, name))
    return results


def build_destination(
    base_dir: str,
    product_folder: str,
    filename: str,
    counts: Dict[Tuple[str, bool], int],
) -> Tuple[str, str]:
    poster_flag = is_poster(filename)
    key = (product_folder, poster_flag)
    counts[key] = counts.get(key, 0) + 1

    suffix = "poster" if poster_flag else ""
    index = counts[key]
    base_name = product_folder
    if suffix:
        base_name = f"{base_name}-{suffix}"
    base_name = f"{base_name}-{index:02d}"

    ext = os.path.splitext(filename)[1].lower()
    folder_path = os.path.join(base_dir, product_folder)
    final_name = next_available_filename(folder_path, base_name, ext)
    return folder_path, final_name


def copy_or_move(src: str, dest: str) -> str:
    if DRY_RUN:
        return "dry-run"

    if MOVE_FILES:
        shutil.move(src, dest)
        return "moved"

    shutil.copy2(src, dest)
    return "copied"


def main() -> None:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_root = os.path.join(script_dir, IMAGES_DIR)
    report_path = os.path.join(images_root, "image_sorting_report.csv")
    review_dir = os.path.join(images_root, "_needs_review")

    for folder in PRODUCT_FOLDERS:
        ensure_dir(os.path.join(images_root, folder))
    ensure_dir(review_dir)

    images = gather_images(images_root)
    counts: Dict[Tuple[str, bool], int] = {}

    matched = 0
    review = 0
    skipped = 0

    with open(report_path, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "original_path",
            "matched_product_name",
            "destination_folder",
            "new_filename",
            "confidence_score",
            "action_taken",
            "notes",
        ])

        for path in images:
            filename = os.path.basename(path)

            if os.path.commonpath([path, review_dir]) == review_dir:
                continue

            result = find_best_match(filename)
            if result.product_folder:
                dest_folder, new_name = build_destination(
                    images_root, result.product_folder, filename, counts
                )
                ensure_dir(dest_folder)
                dest_path = os.path.join(dest_folder, new_name)
                action = copy_or_move(path, dest_path)
                matched += 1

                writer.writerow([
                    path,
                    result.product_folder,
                    dest_folder,
                    new_name,
                    f"{result.score:.2f}",
                    action,
                    result.notes,
                ])
                continue

            review_name = next_available_filename(review_dir, "needs-review", os.path.splitext(filename)[1].lower())
            review_path = os.path.join(review_dir, review_name)
            action = copy_or_move(path, review_path)
            review += 1

            writer.writerow([
                path,
                "",
                review_dir,
                review_name,
                f"{result.score:.2f}",
                action,
                result.notes,
            ])

    total = len(images)
    skipped = total - matched - review

    print("Image sorting summary")
    print("---------------------")
    print(f"Total images scanned: {total}")
    print(f"Matched images: {matched}")
    print(f"Needs review: {review}")
    print(f"Skipped: {skipped}")
    print(f"Report: {report_path}")
    print(f"Dry run: {DRY_RUN}")
    print(f"Move files: {MOVE_FILES}")


if __name__ == "__main__":
    main()
