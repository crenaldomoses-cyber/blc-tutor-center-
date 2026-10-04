"""
Optimise raw centre photos into web-ready WebP files and regenerate src/data/gallery.js.

Usage:
    python scripts/optimize-gallery.py <folder-of-raw-photos>

Raw photos are expected to be named 1.jpg, 2.jpg, ... matching the numbers in PHOTOS below.
A source can also be a path relative to the project root (e.g. existing photos in public/images).
To add a photo: drop it in the raw folder, add a row to PHOTOS, and re-run.
Outputs:
    public/images/gallery/<slug>.webp         full size (max 1400px long edge)
    public/images/gallery/thumbs/<slug>.webp  grid thumbnail (600px wide)
    src/data/gallery.js                       generated data module
"""

import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT_FULL = ROOT / "public" / "images" / "gallery"
OUT_THUMB = OUT_FULL / "thumbs"
DATA_FILE = ROOT / "src" / "data" / "gallery.js"

FULL_MAX = 1400
THUMB_W = 600
FULL_Q = 70
THUMB_Q = 62

CATEGORIES = [
    ("classroom", "In the classroom"),
    ("stem", "Science & STEM"),
    ("hospitality", "Hospitality Studies"),
    ("outings", "Outings & camps"),
    ("celebrations", "Celebrations"),
    ("matric", "Matric Dance 2026"),
]

# (source number or project-relative path, slug, category, caption)
PHOTOS = [
    (1, "hike-trail", "outings", "Hitting the trail on a group outing"),
    (2, "fruit-kebabs", "classroom", "Making healthy fruit kebabs"),
    (3, "matric-dance-welcome-speech", "matric", "Welcome speech at the Matric Dance"),
    (4, "hospitality-tea-service", "hospitality", "Hospitality practical: tea service"),
    (5, "drama-script-reading", "classroom", "Drama rehearsal and script reading"),
    (6, "matric-dance-speech", "matric", "A matriculant addresses the room"),
    (7, "outdoor-exercise", "classroom", "Getting active between lessons"),
    (8, "paper-crowns", "celebrations", "Proud makers of paper crowns"),
    (9, "tug-of-war", "outings", "Tug of war, teamwork on show"),
    (10, "balance-beam", "outings", "Finding our balance on the obstacle course"),
    (11, "hospitality-plate-polish", "hospitality", "Hospitality practical: preparing the table"),
    (12, "hospitality-plated-starter", "hospitality", "Serving a plated starter"),
    (13, "waterfall-wave", "outings", "Hello from the waterfall"),
    (14, "pipe-water-challenge", "outings", "Pipeline challenge: teamwork with water"),
    (15, "drug-awareness-project", "classroom", "Presenting a drug-awareness project"),
    (16, "happy-meal-treat", "celebrations", "Treat day with the Foundation Phase"),
    (17, "graduation-caps", "celebrations", "Foundation Phase graduates"),
    (18, "camp-group-photo", "outings", "Camp group photo"),
    (19, "origami-maths-lit", "classroom", "Origami in Maths Literacy"),
    (20, "obstacle-course-nets", "outings", "Climbing the cargo nets"),
    (21, "matric-invitations", "matric", "Matrics with their Night in Paris invitations"),
    (22, "pen-licence", "celebrations", "Earning our pen licences"),
    (23, "park-games", "outings", "Team games in the park"),
    (24, "matric-dance-boys", "matric", "The gents of the Class of 2026"),
    (25, "outing-briefing", "outings", "Gathering for the day's activities"),
    (26, "hospitality-waiter", "hospitality", "Hospitality practical: ready to serve"),
    (27, "hospitality-soup-service", "hospitality", "Serving soup at the practical assessment"),
    (28, "valentines-photo-wall", "celebrations", "Valentine's Day photo wall"),
    (29, "team-building-briefing", "outings", "Team-building instructions"),
    (30, "pipe-ball-teamwork", "outings", "Keeping the ball on track together"),
    (31, "career-day-agent", "celebrations", "Career day: when I grow up"),
    (32, "forest-treasure-hunt", "outings", "Forest treasure hunt"),
    (33, "arms-out-exercise", "classroom", "Stretching it out"),
    (34, "recycled-fashion", "classroom", "Recycled fashion creations"),
    (35, "matric-dance-ladies", "matric", "The ladies of the Class of 2026"),
    (36, "night-in-paris-sign", "matric", "A Night in Paris, 19 September 2026"),
    (37, "circuits-lesson", "stem", "Building electric circuits"),
    (38, "tutor-team", "celebrations", "Our tutor team"),
    (39, "matric-class-2026", "matric", "Matric Class of 2026"),
    (40, "cupcake-celebration", "celebrations", "Cupcake celebration"),
    (41, "waterfall-group", "outings", "The whole crew at the waterfall"),
    (42, "popsicle-catapults", "stem", "Popsicle-stick catapults"),
    (43, "pipe-ball-facilitator", "outings", "Guided team challenge"),
    (44, "clay-castle-model", "stem", "Modelling a castle in clay"),
    (45, "climbing-wall", "outings", "Taking on the climbing wall"),
    (46, "paris-backdrop", "matric", "The Paris photo backdrop"),
    (47, "matric-class-pose", "matric", "Class of 2026 strikes a pose"),
    (48, "classroom-game", "classroom", "Classroom team game"),
    (49, "waterfall-teens", "outings", "Seniors at the waterfall"),
    (50, "matric-class-smiles", "matric", "All smiles for the Class of 2026"),
    (51, "matric-dance-table", "matric", "Table settings for the big night"),
    (52, "matric-dance-student-speech", "matric", "A matriculant takes the mic"),
    (53, "senior-phase-group", "classroom", "Senior Phase learners"),
    (54, "pizza-party", "celebrations", "Pizza party"),
    (55, "three-legged-race", "outings", "Three-legged race"),
    (56, "density-experiment", "stem", "Density experiment in the lab"),
    (57, "pipe-ball-game", "outings", "Pipe-ball relay"),
    (58, "waterfall-rocks", "outings", "Rock-hopping at the falls"),
    (59, "career-day-doctor", "celebrations", "Career day: future doctor"),
    (60, "science-classroom", "classroom", "Science lessons in the Foundation Phase"),
    (61, "cardboard-engineering", "stem", "Cardboard engineering project"),
    (62, "hospitality-bread-service", "hospitality", "Hospitality practical: bread service"),
    (63, "trophy-winners", "outings", "Trophy winners"),
    (64, "outdoor-reading", "classroom", "Reading group under the trees"),
    (65, "waterfall-little-ones", "outings", "Little explorers at the waterfall"),
    (66, "valentines-friends", "celebrations", "Valentine's Day with friends"),
    (67, "circuits-teamwork", "stem", "Circuits teamwork"),
    (68, "pencil-case-craft", "classroom", "Decorating pencil cases"),
    (69, "outdoor-study", "classroom", "Studying together outside"),
    ("public/images/science-experiments.jpeg", "science-experiments", "stem", "Hands-on science experiments"),
    ("public/images/science-group.jpeg", "science-group", "stem", "Learning together, safely"),
    ("public/images/stem-firefighter-robot.jpeg", "stem-firefighter-robot", "stem", "STEM build & design projects"),
    ("public/images/stem-cardboard-robot.jpeg", "stem-cardboard-robot", "stem", "Imagination in action"),
    ("public/images/stem-rocket-craft.jpeg", "stem-rocket-craft", "stem", "Creative crafts & making"),
    ("public/images/swimming-lessons.jpeg", "swimming-lessons", "outings", "Swimming & water confidence"),
]


def save_webp(img, path, quality):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "WEBP", quality=quality, method=6)


def main(src_dir):
    src_dir = Path(src_dir)
    entries = []
    before = after = 0
    for num, slug, cat, caption in PHOTOS:
        src = ROOT / num if isinstance(num, str) else src_dir / f"{num}.jpg"
        before += src.stat().st_size
        with Image.open(src) as raw:
            img = ImageOps.exif_transpose(raw).convert("RGB")

        full = img.copy()
        full.thumbnail((FULL_MAX, FULL_MAX), Image.LANCZOS)
        full_path = OUT_FULL / f"{slug}.webp"
        save_webp(full, full_path, FULL_Q)

        thumb = img.copy()
        if thumb.width > THUMB_W:
            thumb = thumb.resize((THUMB_W, round(thumb.height * THUMB_W / thumb.width)), Image.LANCZOS)
        thumb_path = OUT_THUMB / f"{slug}.webp"
        save_webp(thumb, thumb_path, THUMB_Q)

        after += full_path.stat().st_size + thumb_path.stat().st_size
        entries.append({
            "id": slug,
            "src": f"/images/gallery/{slug}.webp",
            "thumb": f"/images/gallery/thumbs/{slug}.webp",
            "w": thumb.width,
            "h": thumb.height,
            "category": cat,
            "caption": caption,
        })

    cats = [{"key": k, "label": label} for k, label in CATEGORIES]
    DATA_FILE.write_text(
        "// Generated by scripts/optimize-gallery.py: edit captions there and re-run.\n"
        f"export const galleryCategories = {json.dumps(cats, indent=2)}\n\n"
        f"export const photos = {json.dumps(entries, indent=2)}\n\n"
        "export const photoById = Object.fromEntries(photos.map((p) => [p.id, p]))\n",
        encoding="utf-8",
    )
    print(f"{len(entries)} photos: {before / 1e6:.1f} MB raw -> {after / 1e6:.1f} MB optimised (full + thumbs)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
