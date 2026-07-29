# All Fire Services Australia

Next.js website for All Fire Services Australia.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL` for canonical links, social metadata, robots and the sitemap.
- `GEMINI_API_KEY` for the chatbot API route.

The website builds without these variables. The chatbot returns a controlled
`503` response until `GEMINI_API_KEY` is configured.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Use the standard Next.js preset, keep the build command as `npm run build`, and
add the environment variables above in the Vercel project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
