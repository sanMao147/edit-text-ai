# Edit Text in Image

AI-powered tool to edit, replace, add, delete text and logos in images while preserving original style, texture, and lighting.

**[Live Demo](https://edit-text-ai.vercel.app)**

## Features

- **Replace Text** - Modify existing text in images with AI-matched style
- **Add Text** - Insert new text with seamless background blending
- **Delete Text/Logo** - Remove unwanted text or watermarks using AI inpainting
- **Change Color** - Modify text color while preserving visual consistency
- **Effect Matching** - AI automatically matches texture, lighting, and background

## Tech Stack

- **Framework**: Next.js 15 + TypeScript
- **Styling**: TailwindCSS v4
- **Internationalization**: next-intl (EN/ZH)
- **State Management**: Zustand
- **AI Engine**: Mock (ready for OpenAI Vision + Inpainting integration)

## Quick Start

```bash
# Clone the repository
git clone git@github.com:sanMao147/edit-text-ai.git
cd edit-text-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx      # Landing Page
│   │   └── editor/       # Editor Page
│   └── api/              # API routes
├── components/
│   ├── landing/          # Landing Page components
│   └── editor/           # Editor components
├── i18n/                 # Internationalization config
├── messages/             # Translation files (en.json, zh.json)
├── services/             # AI engine abstraction
├── stores/               # Zustand stores
└── types/                # TypeScript definitions
```

## How It Works

1. **Upload Image** - Drag & drop or click to upload
2. **Describe Changes** - Select edit mode and enter parameters
3. **Download Result** - Compare before/after and download

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sanMao147/edit-text-ai)

## Environment Variables

```env
# Optional: For real AI API integration
OPENAI_API_KEY=your_api_key
```

## Roadmap

- [ ] Integrate OpenAI Vision + Inpainting API
- [ ] User authentication system
- [ ] Edit history management
- [ ] Batch processing support
- [ ] More language support (JP, KR)

## License

MIT
