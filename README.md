# Christo Pharmacy Server

A small Node.js server for the Christo Pharmacy demo website, built while learning web development.

**Live demo:** https://christo-pharmacy.onrender.com/
(Free hosting: the first load can take about a minute. Demo only, so please don't enter real personal details.)

## What it does

- Serves the website from the `public` folder
- `/drugs?search=` returns matching drugs as JSON
- `/messages` receives contact-form messages, validates them, and stores them in PostgreSQL
- `/admin` shows stored messages behind a password
- `/health` and `/ready` are checks for the hosting platform

## Built with

Node.js (no framework), PostgreSQL with the `pg` package, hosted on Render.

## What I learned

- How requests, responses, GET, and POST work
- Validating input on the server
- Keeping secrets in environment variables
- Parameterised SQL queries, and escaping output
- Deploying and debugging on a real host

## Run it locally

    npm install
    npm run dev

Add `ADMIN_PASSWORD` (12 or more characters) to a `.env` file.