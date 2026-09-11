# Homelab Dashboard

> [!NOTE]  
> This project is made using AI tools.

A self-hosted dashboard for your homelab: live server stats (via
[Beszel](https://github.com/henrygd/beszel)), a daily greeting, and a fully
editable list of services — all served by **one dependency-free Python
script**. No database, no build step, no accounts, no framework to keep
up to date.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/87b3bad3-eb48-4c4c-859b-1622e7e9f974" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8c51a0fa-a5b1-4744-b359-9ef98ae46172" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e67d48c4-391a-4b49-ba24-4ccd13560e54" />

## Features

**Dashboard** (`/`)

- A clock, with 12h/24h format and timezone both configurable.
- A greeting pulled from `motd.txt`, with an optional custom heading.
- Live CPU / RAM / load stats for your servers, pulled from Beszel.
- A storage gauge read from a plain text file, so it works with any
  NAS or script that can write one line of text.
- Your services, grouped into sections you define. Click a tile to
  open it in the same tab, middle-click (or cmd/ctrl-click) to open
  it in a new tab.
- Sections and individual services can each be toggled on/off without
  deleting them or losing their configuration.
- Light/dark theme follows your system setting, with a manual toggle
  in the bottom-left corner.
- Responsive layout: on desktop the sidebar stays put while the
  service list scrolls independently (no visible scrollbar); on
  narrow/mobile screens the greeting and sections come first and the
  sidebar becomes a footer at the bottom.

**Manage services** (`/manage.html`, via the gear icon)

- Add, rename, re-icon, reorder (drag the handle), or delete sections
  and services.
- Toggle any section or service on/off without deleting it.
- Pick any icon from the full [Material Design Icons](https://pictogrammers.com/library/mdi/)
  library via a searchable picker.
- Optionally set a custom highlight color per service, or leave it on
  the automatic, stable-per-service color.
- Every change saves immediately — there's no separate "save" step —
  and shows up on the dashboard right away.

Everything is stored in plain files next to the script: `services.json`
for your layout, `motd.txt` for the greeting, `nas_disk.txt` for the
storage gauge. No database, and nothing to migrate between versions.

## Requirements

- Python 3 (standard library only — no `pip install` needed).
- A [Beszel](https://github.com/henrygd/beszel) hub, if you want live
  server stats. The dashboard still works without one; your servers
  will just show as "down".
- A modern browser. No accounts, sessions, or auth — this is built for
  a trusted LAN, not the public internet.

## Quick start

1. Confirm Python 3 is available:

   ```bash
   python3 --version
   ```

2. Copy the example config and fill it in:

   ```bash
   cp config.env.example config.env
   nano config.env
   ```

   At minimum, set `BESZEL_URL`, `BESZEL_EMAIL`, `BESZEL_PASSWORD`, and
   `DASHBOARD_SERVERS` so the sidebar can show real stats. A **read-only**
   Beszel user is recommended — this script only ever reads stats, never
   manages anything in Beszel. See the [configuration reference](#configuration-reference)
   below for every available setting.

3. Write your greeting into `motd.txt` (see [The greeting](#the-greeting-motdtxt)).

4. Copy `nas_disk.txt.example` to `nas_disk.txt` and fill in your real
   used/total storage (see [Storage gauge](#storage-gauge)). Skipping
   this just hides the gauge — nothing else is affected.

5. Run it:

   ```bash
   chmod +x serve_dashboard   # first time only
   ./serve_dashboard
   ```

   You should see:

   ```
   homelab dashboard serving on http://0.0.0.0:2954 (Ctrl+C to stop)
   ```

6. From any device on your LAN, visit `http://<server-ip>:2954/`
   (or whatever `HOST`/`PORT` you configured).

7. Click the gear icon in the bottom-left corner to open **Manage
   services** and replace the example services (Home Assistant,
   Immich, Sonarr, etc.) with your own.

## Configuration reference

All settings live in `config.env`, read once at startup (changes need
a restart — nothing here is hot-reloaded).

| Setting | Default | Description |
|---|---|---|
| `HOST` | `0.0.0.0` | Bind address for the dashboard's own server. `0.0.0.0` makes it reachable from other devices on your LAN. |
| `PORT` | `2954` | Port for the dashboard's own server. |
| `DASHBOARD_NAME` | — | Name used in the automatic "Good afternoon, `<name>`" greeting. |
| `MOTD_PATH` | `motd.txt` | Path to the greeting file. `serve_dashboard` only reads it — something else (a cron job, a script) is expected to write it. |
| `SERVICES_PATH` | `services.json` | Path to the sections/services file that "Manage services" reads and writes. Created automatically on first run. |
| `BESZEL_URL` | `http://127.0.0.1:8090` | Base URL of your Beszel hub, no trailing slash. |
| `BESZEL_EMAIL` | — | Login for a Beszel user. A read-only user is recommended. |
| `BESZEL_PASSWORD` | — | Password for the Beszel user above. |
| `DASHBOARD_SERVERS` | — | Comma-separated Beszel system names to show in the sidebar, in display order. Must match Beszel's names exactly. |
| `VAULT_SYSTEM_NAME` | — | Label shown above the storage gauge (e.g. "HassiVault storage"). Leave blank to just show "Storage". Purely cosmetic — doesn't need to match a Beszel system. |
| `NAS_DISK_PATH` | `nas_disk.txt` | Path to the plain-text `<used>/<total>` (GB) file behind the storage gauge. Gauge is hidden if the file is missing or unparsable. `serve_dashboard` only reads it — something else (a cron job, a script) is expected to write it. |
| `CLOCK_FORMAT` | `auto` | `auto` follows the browser's locale; `12` or `24` forces that format. |
| `TIMEZONE` | — | IANA zone name (e.g. `Europe/Helsinki`) for the clock and greeting. Leave blank to use the server's local system time. |

## Managing services and sections

Open **Manage services** from the gear icon. From there you can:

- **Add a section** — give it a name and an icon, and choose whether
  it goes to the top or bottom of the dashboard. Like services, a
  section has an on/off toggle — both in the editor and as a switch
  next to its name in the list — so you can hide an entire section
  (and everything in it) without deleting anything.
- **Add a service** — name, address (the URL the tile opens), an icon
  (search the full icon library), an optional custom highlight color,
  which section it belongs to, and whether it's active. Inactive
  services stay in the list here but are hidden from the dashboard —
  handy for services you're not ready to show yet.
- **Highlight color** — by default, each service's icon color is
  picked automatically and stays stable across reloads. Pick a color
  in the service editor to override it, or click "Use automatic" to
  revert.
- **Reorder** — drag a service by its handle to move it within its
  section; use the up/down arrows next to a section's name to
  reorder sections.
- **Edit or delete** — the pencil and trash icons on any row or
  section. Deleting a section also deletes the services inside it
  (you'll be asked to confirm).

Every action saves immediately to `services.json` — there's no
separate "save" step, and no login is required (this is meant for a
trusted LAN only, same as the rest of the dashboard).

## The greeting (`motd.txt`)

`motd.txt` supports two formats:

- **One line** — shown as the message under the automatic "Good
  morning/afternoon/evening, `<DASHBOARD_NAME>`" heading.
- **Two (or more) lines** — the first line replaces the heading
  entirely (shown verbatim), and every line after it is joined
  together as the message underneath. Use this if a script should
  write a fully custom heading instead of the automatic one.

An empty or missing `motd.txt` falls back to the automatic heading
with no message, same as a fresh install. `serve_dashboard` only
*reads* this file — writing it (by hand, or from a script/cron job)
is up to you.

## Storage gauge

The sidebar's storage gauge reads a plain text file (`NAS_DISK_PATH`,
`nas_disk.txt` by default) containing a single line like:

```
50/257
```

That's `<used>/<total>`, in GB. Keeping it up to date is up to you — a
cron job, a small script on your NAS, whatever's convenient;
`serve_dashboard` only ever reads it. If the file is missing or
doesn't parse, the gauge is simply hidden and the rest of the
dashboard is unaffected. `VAULT_SYSTEM_NAME` is just the label shown
above the gauge and doesn't need to match a Beszel system name.

## Clock

`CLOCK_FORMAT` controls the sidebar clock:

- `auto` (default) — follows the browser's own locale.
- `12` or `24` — forces that format regardless of locale.

`TIMEZONE` (an IANA zone name like `Europe/Helsinki`) controls what
time the clock — and the greeting — are calculated in. Leave it blank
to use the server's own local system time.

## API reference

`serve_dashboard` exposes a small JSON API, used by the dashboard and
management pages (and available for your own scripts/automations):

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/motd` | `{"name", "greeting", "header", "message", "clock_format", "timezone"}` |
| `GET` | `/api/stats` | `{"servers": [...], "vault": {...}\|null}` — live Beszel stats, cached 10s. `vault` comes from `NAS_DISK_PATH`, not Beszel. |
| `GET` | `/api/config` | `{"sections": [...]}` — the full dashboard layout. |
| `POST` | `/api/sections` | Create a section. |
| `PATCH` | `/api/sections/<id>` | Rename / re-icon / reorder / toggle a section. |
| `DELETE` | `/api/sections/<id>` | Delete a section and its services. |
| `POST` | `/api/services` | Create a service. |
| `PATCH` | `/api/services/<id>` | Edit / move / toggle a service. |
| `DELETE` | `/api/services/<id>` | Delete a service. |
| `POST` | `/api/reorder/sections` | `{"order": [id, ...]}` |
| `POST` | `/api/reorder/services` | `{"section_id": id, "order": [id, ...]}` |

No authentication is required or supported — treat this the same way
you'd treat any other unauthenticated LAN-only service.

## Project structure

```
backend/
├── serve_dashboard        # the web server (Python 3, standard library only)
├── config.env.example     # copy to config.env and fill in your values
├── motd.txt               # the greeting shown at the top of the dashboard
├── nas_disk.txt.example   # copy to nas_disk.txt and keep it updated
├── services.json          # your sections/services (created automatically)
└── static/                # front end (HTML/CSS/JS) + bundled icon library
```

- `serve_dashboard` — the whole backend: HTTP server, config loading,
  Beszel polling, and the JSON API above.
- `config.env.example` — copy to `config.env`; see the
  [configuration reference](#configuration-reference).
- `motd.txt` — the greeting file; see [above](#the-greeting-motdtxt).
  `serve_dashboard` only reads it.
- `nas_disk.txt.example` — copy to `nas_disk.txt` (or wherever
  `NAS_DISK_PATH` points); see [Storage gauge](#storage-gauge).
- `services.json` — your sections and services, created automatically
  on first run with example services so the dashboard isn't empty.
  This is what "Manage services" reads and writes; plain JSON if you
  ever want to edit it directly.
- `static/` — the dashboard's front end and the bundled icon library
  (Material Design Icons, with a small legacy fallback set so icons
  chosen before this pack was added never go blank). Nothing here
  needs editing for normal use.

## Troubleshooting

- **A server shows "down" with no stats** — check that its name in
  `DASHBOARD_SERVERS` exactly matches its name in Beszel, and that
  Beszel is reachable at `BESZEL_URL` from this machine.
- **Storage gauge is missing** — check that the file at
  `NAS_DISK_PATH` (`nas_disk.txt` by default) exists next to
  `serve_dashboard` and contains a line like `50/257`.
- **Port already in use** — another process is already using the
  configured port; stop it or change `PORT` in `config.env`.
- **Changes made in "Manage services" don't show up** — the dashboard
  re-checks for changes every 30 seconds; a full page reload also
  picks them up immediately.
- **Icons look broken after an update** — clear your browser's HTTP
  cache (not just cookies/site data): in Chrome,
  `chrome://settings/clearBrowserData` → check only "Cached images
  and files" → Clear data, then reload.
