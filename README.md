# The Gita Companion

An interactive walk through the Bhagavad Gita. Storyboard mode for reading chapter by chapter, knowledge graph mode for exploring characters and concepts.

Built as a Next.js 16 app, deployable to Vercel in one command.

## Quick start (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000 on your laptop. To test the iOS feel, open the same URL on your iPhone if it's on the same WiFi (use your laptop's local IP, e.g. `http://192.168.x.x:3000`).

## Deploy to Vercel

```bash
# 1. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create gita-companion --public --source=. --push
# (or: create repo manually on github.com, then:)
# git remote add origin <your-repo-url>
# git branch -M main
# git push -u origin main

# 2. Deploy to Vercel
npx vercel
# Follow the prompts. Accept defaults.
# For production: npx vercel --prod
```

After it deploys, open the URL on your iPhone and "Add to Home Screen" from Safari. It will run as a standalone app with the iOS status bar treated like a native app.

## Project layout

```
app/
  layout.tsx          Root layout, fonts, tab bar
  page.tsx            Storyboard tab (home)
  graph/page.tsx      Knowledge graph tab
  about/page.tsx      About / how-to-use tab
  globals.css         Theme + iOS safe-area handling

components/
  TabBar.tsx          Bottom tab nav
  ChapterReader.tsx   Storyboard reader (scenes + Modern Mirror)
  KnowledgeGraph.tsx  D3 force-directed graph
  FactSheet.tsx       Character/concept fact sheet (renders inside BottomSheet)
  BottomSheet.tsx     iOS-feel slide-up sheet
  Portraits.tsx       SVG character portraits

lib/
  chapters.ts         All 18 chapters: scenes, panels, modern mirrors, reflections
  graph.ts            Knowledge graph: 33 nodes (characters + concepts), edges
```

## Editing content

- **Add/edit a chapter**: open `lib/chapters.ts` and find or add the entry. Each chapter has scenes (with panels), a Modern Mirror, a reflection prompt, and lists of related concept and character IDs.
- **Add/edit a fact sheet node**: open `lib/graph.ts`. Add the node to `NODES` and any new connections to `EDGES`.
- **Tweak the visual style**: `tailwind.config.js` defines the krishna / arjuna / dust / dharma palettes. Portraits live in `components/Portraits.tsx` as inline SVG.

## What's in v1

- All 18 chapters, in storyboard format with scenes, panels, and a "Modern Mirror" tying each chapter to a modern dilemma
- Reflection prompts at the end of each chapter
- Knowledge graph with 33 nodes (8 characters + 25 concepts) and the edges between them
- Stylized SVG character portraits (Krishna, Arjuna, Sanjaya, Dhritarashtra, Duryodhana, Bhishma, Drona)
- iOS-native bottom-sheet fact sheets, with cross-references between concepts
- Fully responsive, optimized for mobile, works as a PWA when added to iPhone home screen

## Possible v2 ideas

- Save reflection answers (would need a backend or local storage layer)
- Audio playback per chapter (Easwaran or your own narration)
- Sanskrit verse view with transliteration
- Search across the entire app
- Sharing — generate a shareable card from a panel or fact sheet
- Theme picker (parchment / dark / etc.)
