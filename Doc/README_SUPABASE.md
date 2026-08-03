# Trace / Supabase setup

Trace stores a source-aware copy of `src/data/knowledge-base.json` in Supabase. Retrieval combines Postgres full-text search and Gemini Embedding 2 vectors with Reciprocal Rank Fusion (RRF). The application has a local lexical fallback, so the chatbot can still answer when the database is unavailable.

## Required environment variables

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-key
INIT_SECRET=generate-a-long-random-secret
```

For production model routing, connect the project to Vercel so OIDC is available, or also set:

```env
AI_GATEWAY_API_KEY=your-ai-gateway-key
```

Never expose the Supabase service-role key or `INIT_SECRET` through a `NEXT_PUBLIC_` variable.

## Create or migrate the database

Run [`sql/supabase-init.sql`](../sql/supabase-init.sql) in Supabase Dashboard → SQL Editor. The script:

- enables `pgvector`;
- adds source, confidence, knowledge-version, and embedding-model metadata;
- creates GIN full-text and HNSW vector indexes;
- installs `hybrid_search` and `match_documents` functions;
- enables Row Level Security.

Existing rows are marked as `gemini-embedding-001`. They are intentionally excluded from Gemini Embedding 2 queries until the next synchronization, because vectors from different model spaces must not be mixed.

## Synchronize the knowledge base

Start the site, then call the protected endpoint:

```bash
npm run dev

curl -X POST http://localhost:3001/api/vector-store/init \
  -H "Authorization: Bearer $INIT_SECRET"
```

The endpoint upserts the current records and reports the synchronized count. Run it again whenever `src/data/knowledge-base.json`, the embedding model, or the knowledge version changes.

## Verify

```bash
npx tsc --noEmit
npm run build
```

Then ask Trace both a current-state question and a conflict question, for example:

- `Where does Jacky currently work?`
- `The old résumé says Ulala is current. Which record should I trust?`

The answer should cite the newer Alpha Pay record and identify the older résumé as historical.
