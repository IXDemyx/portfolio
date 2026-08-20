import json
import random
import re
import unicodedata
import urllib.parse
import urllib.request


# ============================================================
# SONG TITLE NORMALIZATION
# ============================================================

def normalize_song_title(title: str) -> str:
    """
    Normalizes a song title for guessing.

    Examples:

    "Blinding Lights (feat. Someone)"
        -> "blinding lights"

    "Song Name (Remix)"
        -> "song name"

    "Rock & Roll"
        -> "rock roll"
    """

    title = title.lower().strip()

    # Remove feat / ft / featuring in brackets
    title = re.sub(
        r"\s*[\(\[]\s*(feat\.?|ft\.?|featuring)\s+.*?[\)\]]",
        "",
        title,
        flags=re.IGNORECASE,
    )

    # Remove common version information
    title = re.sub(
        r"\s*[\(\[]\s*"
        r"(remix|radio edit|edit|version|remastered|"
        r"live|acoustic|instrumental|extended|explicit)"
        r".*?[\)\]]",
        "",
        title,
        flags=re.IGNORECASE,
    )

    # Normalize unicode
    title = unicodedata.normalize(
        "NFKD",
        title,
    )

    # Remove accents
    title = "".join(
        char
        for char in title
        if not unicodedata.combining(char)
    )

    # Replace punctuation with spaces
    title = re.sub(
        r"[^\w\s]",
        " ",
        title,
    )

    # Multiple spaces
    title = re.sub(
        r"\s+",
        " ",
        title,
    )

    return title.strip()


# ============================================================
# SEARCH TERMS
# ============================================================

SEARCH_TERMS = [
    "The Weeknd",
    "Drake",
    "Taylor Swift",
    "Dua Lipa",
    "Ed Sheeran",
    "Bruno Mars",
    "Ariana Grande",
    "Billie Eilish",
    "Post Malone",
    "Justin Bieber",
    "Kendrick Lamar",
    "Travis Scott",
    "Lady Gaga",
    "Harry Styles",
    "SZA",
    "Rihanna",
    "Coldplay",
    "Imagine Dragons",
    "Linkin Park",
    "Maroon 5",
]


# ============================================================
# ITUNES SEARCH
# ============================================================

def search_itunes(term: str):
    params = urllib.parse.urlencode({
        "term": term,
        "media": "music",
        "entity": "song",
        "limit": 50,
        "country": "DE",
    })

    url = f"https://itunes.apple.com/search?{params}"

    try:
        with urllib.request.urlopen(
            url,
            timeout=10,
        ) as response:

            data = json.loads(
                response.read().decode("utf-8")
            )

        return data.get("results", [])

    except Exception as error:
        print(
            "iTunes request failed:",
            error,
        )

        return []


# ============================================================
# RANDOM SONG
# ============================================================

def get_random_song():
    """
    Gets a random song with a usable preview.
    """

    for _ in range(10):

        term = random.choice(
            SEARCH_TERMS
        )

        results = search_itunes(
            term
        )

        valid_results = [
            result
            for result in results
            if result.get("previewUrl")
            and result.get("trackName")
            and result.get("artistName")
        ]

        if not valid_results:
            continue

        song = random.choice(
            valid_results
        )

        return {
            "track_id": song.get(
                "trackId"
            ),

            "title": song.get(
                "trackName"
            ),

            "artist": song.get(
                "artistName"
            ),

            "album": song.get(
                "collectionName"
            ),

            "artwork": song.get(
                "artworkUrl100"
            ),

            "preview_url": song.get(
                "previewUrl"
            ),
        }

    return None