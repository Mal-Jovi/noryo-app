<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Tauri CSS hot reload

If CSS edits show up immediately in the browser but the Tauri dev window keeps the old styles until restart, try moving the stylesheet import from the route page to its shared parent layout. This restored live updates for `app/(dashboard)/patients/patients.css` when its import moved from `patients/page.tsx` to `app/(dashboard)/layout.tsx`.

One possible cause is that the Tauri window missed hot updates for the stylesheet loaded when navigating to the Patients route. The parent layout loads earlier and stays mounted across dashboard routes, so its stylesheet may already be registered for hot updates when Patients opens. This explains the observed behavior, but the exact cause is unconfirmed.
