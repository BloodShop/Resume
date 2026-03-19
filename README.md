https://bloodshop.github.io/Resume/

## Run locally

Start a simple static server on port `4173`:

```bash
cd /home/akolyakov/.openclaw/workspace/Resume
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

Stop the server with `Ctrl+C`.

## Insta360 local previews

Inline Insta360 previews are loaded from local files only after clicking the preview card.

Place exported preview files in `videos/insta360/` using these names:

- `ride.mp4` or `ride.webm`
- `flights.mp4` or `flights.webm`
- `snow.mp4` or `snow.webm`
- `forest.mp4` or `forest.webm`
- `flight.mp4` or `flight.webm`

Optional fallback:

- `ride.gif`
- `flights.gif`
- `snow.gif`
- `forest.gif`
- `flight.gif`
