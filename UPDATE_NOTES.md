# WorkNest Update Notes

## Updated features
- Admin application status dropdown is connected with backend.
- Selecting `Rejected` deletes the application from MongoDB and refreshes the UI.
- User dashboard now includes a profile card and application tracking.
- Admin dashboard now includes an admin profile card, stats, job CRUD, and applications table.
- Job model now supports `logo` for company logo URL.
- Admin can add company logo URL while creating/updating a job.
- Jobs page shows admin-created MongoDB jobs with company logo cards.
- Admin sees Edit/Delete controls on job cards; users see Apply button.
- UI styling refreshed with Tailwind classes and dark-mode support.

## Run
Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```
