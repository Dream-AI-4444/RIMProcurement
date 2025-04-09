# Kratom Wholesale Platform

A web app connecting U.S. kratom wholesale buyers and suppliers via an interactive quiz that delivers personalized product recommendations.

🌿 Overview

Buyers answer a multi-step quiz about their business. The platform analyzes the data and recommends tailored kratom products and vendors.

🚀 Features
	•	Quiz Engine: Multi-step, responsive, logic-based
	•	Custom Recommendations: Driven by business needs and quality priorities
	•	Accounts: Secure login and profile management
	•	Dashboard: Tracks submissions, user behavior, preferences
	•	Blockchain Hooks: Optional supply chain transparency
	•	Security: Helmet, rate limiting, schema validation
	•	Responsive: Works great on desktop and mobile

🛠 Tech Stack
	•	Frontend: React, TypeScript, Tailwind, Shadcn UI
	•	Backend: Node.js, Express
	•	DB: PostgreSQL + Drizzle ORM
	•	Auth: Passport.js
	•	Payments: Stripe
	•	Logging: Structured, level-based
	•	Security: Helmet, rate limiting, Zod validation

📋 Requirements
	•	Node.js 20+
	•	PostgreSQL 14+
	•	pnpm

🔧 Setup

.env config

NODE_ENV=development

# DB connection
DATABASE_URL=postgres://username:password@localhost:5432/kratom

# or, individual params
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kratom
DB_USER=postgres
DB_PASSWORD=postgres

PORT=5000
SESSION_SECRET=REPLACE_ME
LOG_LEVEL=info

Local Install

git clone <repo-url>
cd kratom
pnpm install
pnpm db:generate
pnpm db:push
pnpm dev

Docker (Dev or Prod)

pnpm docker:dev     # hot reload
pnpm docker:prod    # production
pnpm docker:down    # stop

App runs at http://localhost:5000

🧪 Dev Scripts

pnpm dev          # dev server
pnpm build        # production build
pnpm start        # run prod build
pnpm check        # typecheck
pnpm db:push      # push DB schema
pnpm db:generate  # generate migrations
pnpm db:studio    # launch Drizzle Studio
pnpm db:migrate   # apply migrations

Logging levels: error, warn, info (default), debug

🩺 Health Check

curl http://localhost:5000/health

🧬 DB Schema (PostgreSQL + Drizzle)
	•	users: login/auth
	•	quiz_submissions: user responses + result metadata (e.g., quality scores, blockchain opts)

🔐 Security
	•	Helmet: Secure HTTP headers
	•	Rate limiting: Abuse protection
	•	Zod: Input validation
	•	.env validation: Fail fast on misconfig
	•	Error handling: Centralized, typed responses

🚢 Deployment

Requirements
	•	Node.js 20+
	•	PostgreSQL 14+
	•	1GB RAM min
	•	10GB disk space

Options

Docker (Recommended)
Use provided docker-compose.prod.yml

Manual
Install Node + Postgres
Run pnpm build then pnpm start
Configure as systemd service or equivalent

📡 Ops + Monitoring
	•	/health endpoint for uptime checks
	•	Structured logs, LOG_LEVEL env var
	•	Graceful shutdown on SIGINT/SIGTERM

🤝 Contributing

git checkout -b feature/my-feature
git commit -am 'Add new feature'
git push origin feature/my-feature
# then open a PR

📝 License

MIT — see LICENSE
