# Code Review Report — Assortir Frontend

## Critical Issues

FILE: src/assets/Legal.tsx
LINE: 383
SEVERITY: Critical
ISSUE: `dangerouslySetInnerHTML` is used to render markdown string content. If this file is ever executed or adapted to render user-supplied content, it introduces a Cross-Site Scripting (XSS) vulnerability.
FIX: Remove the `dangerouslySetInnerHTML` block. Note that `src/pages/Legal.tsx` already uses `react-markdown` correctly, so `src/assets/Legal.tsx` might be an unused/duplicate file that should be deleted altogether.

## High Issues

FILE: src/pages/Home.tsx
LINE: 88-107
SEVERITY: High
ISSUE: Edge function is called using a manual `fetch` request, extracting the `access_token` manually from the auth session. This pattern is fragile, hardcodes the URL, and manually manages auth headers which can lead to leaked tokens or improper session management if tokens refresh mid-flight.
FIX: Replace the `fetch` block with the built-in Supabase client function: `await supabase.functions.invoke('styling-recommendation', { body: { intent, item: {...} } })`.

FILE: src/context/AuthContext.tsx
LINE: 104-105, 114, 143, 147, 151, 155, 269-270
SEVERITY: High
ISSUE: Multiple occurrences of `as any` type assertions when assigning responses from Supabase queries (e.g., `const profVal = profileRes.status === 'fulfilled' ? (profileRes.value as any) : null`). This entirely breaks TypeScript safety and can lead to unexpected runtime `undefined` errors if the database schema changes.
FIX: Strongly type the Supabase `.select()` queries or cast the value to the proper interfaces (e.g., `Profile`, `Subscription`) exported in `src/types.ts`.

FILE: src/pages/Home.tsx
LINE: 109
SEVERITY: High
ISSUE: `await res.json()` happens outside the `try` block's error handling for non-200 responses. If the Edge Function crashes and returns an HTML 500 page, `.json()` will throw a `SyntaxError` that masks the actual HTTP failure.
FIX: Check `if (!res.ok)` *before* attempting to parse `.json()`, or wrap the `.json()` parsing in a safe try/catch block.

## Medium Issues

FILE: src/context/AuthContext.tsx
LINE: 88-156
SEVERITY: Medium
ISSUE: The `fetchUserData` performs a large amount of parallel fetching every time a user signs in or refreshes data. However, it manages timeouts with arbitrary `setTimeout` races. If a user unmounts or signs out during a slow network request, the state might still set after unmount.
FIX: Implement an `AbortController` signal to cancel network requests if the user signs out or the component unmounts.

FILE: src/pages/Home.tsx
LINE: 115
SEVERITY: Medium
ISSUE: `setError((data as any).error ?? 'Something went wrong')` is used to extract an error from a response.
FIX: Update the `StyleResponse` interface in `types.ts` to guarantee `error?: string` exists, and remove the `any` cast.

FILE: src/pages/Settings.tsx
LINE: 156
SEVERITY: Medium
ISSUE: `const monthlyLimit = (subscription as any)?.plans?.monthly_query_limit ?? 3` forces `any` to navigate a nested relation.
FIX: Define the relational join correctly in the Supabase query return type or assert `subscription` as a specific intersected type that includes the joined `plans` object.

FILE: src/pages/Result.tsx
LINE: 219-223
SEVERITY: Medium
ISSUE: `fetchQuery` is called inside a `useEffect` without a cleanup function. If the user navigates away before the network request finishes, `setResult` will trigger a state update on an unmounted component.
FIX: Add an `isMounted` boolean flag or `AbortController` inside the `useEffect` to prevent state updates if the component unmounts.

FILE: src/pages/History.tsx
LINE: 166-168
SEVERITY: Medium
ISSUE: `fetchHistory` is called in `useEffect` without cleanup, leading to potential unmounted state updates.
FIX: Add cleanup logic to ignore the result if unmounted.

FILE: src/pages/Legal.tsx
LINE: 97-124
SEVERITY: Medium
ISSUE: `fetchDoc` relies on a raw `fetch` to load markdown files inside `useEffect`. It lacks a cleanup mechanism. If `doc` param changes rapidly, race conditions can occur where older text overwrites newer text.
FIX: Implement an `ignore = false` boolean flag in the `useEffect` that gets set to `true` in the cleanup function, ensuring only the latest fetch call updates state.

FILE: src/service/weather_service.ts
LINE: 310-313
SEVERITY: Medium
ISSUE: `catch (err)` block in `getWeatherForStyling` swallows the error entirely by just returning `null` with a `console.warn`. While graceful degradation is good, swallowing critical failures makes debugging network or API deprecations very difficult.
FIX: Add reporting to a telemetry service or return a dedicated `{ success: false, error: ... }` signature so the caller can log it appropriately in development.

FILE: src/pages/History.tsx
LINE: 137
SEVERITY: Medium
ISSUE: `HistoryItem` is an interactable element with an `onClick` handler, but it is rendered as a stylized `div`. Screen readers won't recognize it as a button, and it cannot be focused via the keyboard (Tab key).
FIX: Add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler that triggers the navigation on `Enter` or `Space`, or change the underlying element to a `<button>`.

## Low Issues

FILE: src/pages/Home.tsx
LINE: 65-74
SEVERITY: Low
ISSUE: `useEffect` is used to log a status check on `canSubmit` every time the form fields change. This runs on almost every keystroke/selection, causing unnecessary execution cycles in production.
FIX: Remove the `useEffect` block completely, as `canSubmit` is already derived synchronously during render.

FILE: src/components/index.tsx
LINE: 271, 500
SEVERITY: Low
ISSUE: Custom inputs like `Chip` and `IntentButton` may lack `aria-pressed` states.
FIX: Add `aria-pressed={!!$active}` to elements that act as toggle switches or selected state buttons.

FILE: src/pages/History.tsx
LINE: 181-186
SEVERITY: Low
ISSUE: Dead, commented-out code representing an older `supabase.from('queries')` select exists.
FIX: Remove the commented-out code.

FILE: src/pages/Onboarding.tsx
LINE: 105
SEVERITY: Low
ISSUE: Dead, commented-out code: `/* const [p1, p2, p3, p4, p5] = await Promise.all([ */`
FIX: Remove the commented-out line.

FILE: src/pages/Home.tsx
LINE: 67
SEVERITY: Low
ISSUE: `console.log('Home: canSubmit is still false. Status:', ...)` left in production code.
FIX: Remove the `console.log` statement.

FILE: src/context/AuthContext.tsx
LINE: 72, 77, 85, 88, 125, 159, 186, 195, 210
SEVERITY: Low
ISSUE: Numerous debugging `console.log` statements for the auth state lifecycle exist in the codebase.
FIX: Remove or replace with a dedicated development logger that gets stripped in production.

---

## Overall Code Health

The Assortir frontend is a functional React/TypeScript codebase with a solid foundation, using a modern stack (Vite + Styled Components + Supabase). However, there are significant areas for improvement across all layers. The security footprint needs tightening around API calls and HTML injection. Performance could be improved by adopting proper dependency management and memoization patterns to prevent unnecessary renders. TypeScript usage currently relies heavily on `any` escapes, which undermines the language's safety. Error handling is present but often swallows actual errors or assumes success where network failures could occur. Accessibility is lacking for interactive elements, particularly for screen readers. Finally, some clean up of dead code and developer logs is required.

## Top 3 Issues to Fix Immediately

1. **SECURITY:** Remove `dangerouslySetInnerHTML` in `src/assets/Legal.tsx` and refactor the Supabase Edge Function call in `src/pages/Home.tsx` to use the official `supabase.functions.invoke()` method instead of `fetch` with manual token passing.
2. **TYPESCRIPT:** Replace all `any` and `as any` type assertions, particularly in `AuthContext.tsx` and `Home.tsx` regarding API and Supabase responses, with strictly typed definitions to prevent runtime access errors.
3. **REACT BEST PRACTICES (Memory Leaks):** Add proper cleanup functions to all `useEffect` hooks performing asynchronous fetches (`fetchQuery` in `Result.tsx`, `fetchHistory` in `History.tsx`, and `fetchDoc` in `Legal.tsx`) to prevent state updates on unmounted components.

## Common Patterns

- **Overuse of `any` type casting:** Instead of properly typing Supabase responses (via generic `.returns<T>()` or checking `.data`), type coercion is frequently used (`as any`).
- **Swallowing Errors:** Multiple catch blocks either return null or ignore the actual `error.message`, replacing it with generic "Something went wrong" text, making debugging hard.
- **Missing Accessibility Traits:** Custom stylized `div` elements are used as interactive buttons (`HistoryItem`, custom chips) without semantic `<button>` roles, `onKeyDown` handlers, or `aria-labels`.