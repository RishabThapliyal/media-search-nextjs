# React Code ko Next.js me Convert karte waqt kiye gaye Changes

## 1. **"use client" Directive (Next.js App Router Requirement)**

Next.js App Router me Server Components default hote hain. Jo components hooks (useState, useEffect, useSelector, useDispatch) ya browser APIs use karte hain, unhe **"use client"** add karna zaroori hai.

**Files me add kiya:**
- `app/HomePage/page.jsx`
- `app/CollectionPage/page.jsx`
- `app/components/SearchBar.jsx`
- `app/components/Tabs.jsx`
- `app/components/ResultGrid.jsx`
- `app/components/Resultcard.jsx`
- `app/components/CollectionCard.jsx`
- `app/components/Navbar.jsx`
- `app/redux/ReduxProvider.js`
- `app/redux/CollectionHydrator.jsx`

---

## 2. **mediaApi Location Change**

**Pehle (React):** `app/api/mediaApi.js` me tha  
**Ab (Next.js):** `lib/mediaApi.js` me move kiya

**Reason:** Next.js me `app/api/` folder **API Routes** ke liye reserved hai. Wahan jo bhi file hogi, Next.js use Route Handler samjhega. mediaApi ek normal utility hai, isliye `lib/` me rakha.

**Import change:** `../api/mediaApi` → `@/lib/mediaApi`

---

## 3. **Giphy API Response Mapping Fix**

GitHub code **Tenor API** use kar raha tha, tum **Giphy** use kar rahe ho.

**Pehle (Tenor format):**
- `response.data.results` 
- `item.media_formats.tinygif.url`
- `item.media_formats.gif.url`

**Ab (Giphy format):**
- `response.data` (array seedha)
- `item.images.fixed_height.url` / `item.images.downsized.url`
- `item.images.original.url` / `item.images.downsized_large.url`

---

## 4. **Routing Structure (App Router)**

**Next.js App Router** me routing file/folder structure se hoti hai:

- `app/page.js` → Route: `/`
- `app/HomePage/page.jsx` → Route: `/HomePage`
- `app/CollectionPage/page.jsx` → Route: `/CollectionPage`

Root route (`/`) pe HomePage ka content `app/page.js` me import karke dikhaya ja raha hai.

---

## 5. **Navigation – Link Component**

**Pehle (React Router):** `<Link>` ya `<a href="">`  
**Ab (Next.js):** `next/link` ka `Link` component

Navbar me:
```jsx
import Link from "next/link";
<Link href="/">Home</Link>
<Link href="/CollectionPage">Collection</Link>
```

---

## 6. **localStorage + SSR (Server-Side Rendering)**

**Problem:** `localStorage` sirf browser me hai. Next.js pehle server pe render karta hai, wahan `localStorage` nahi hota.

**Solution:**
- `collectionSlice` me initialState ab `items: []` hai
- Naya `CollectionHydrator` component banaya jo `useEffect` me client pe mount hone ke baad localStorage se data load karke `hydrateCollection` dispatch karta hai
- `hydrateCollection` reducer add kiya jo Redux store me localStorage ka data daalta hai

---

## 7. **Toast (react-toastify)**

- `react-toastify` package add ki
- Layout ke andar `ReduxProvider` me `ToastContainer` add kiya
- `react-toastify/dist/ReactToastify.css` import kiya

---

## 8. **Path Alias (@/)**

`jsconfig.json` me path alias:
```json
"paths": { "@/*": ["./*"] }
```

Isse `@/lib/mediaApi` se import kar sakte ho.

---

## 9. **Remove Button Fix (Collection Page)**

- `removeCollection` ab `{ type, id }` object leta hai (id clash avoid karne ke liye)
- Comparison `String(item.id) === String(id)` se kiya taake number/string type se problem na aaye
- Remove pe `removeToast()` bhi dispatch hota hai
- List ke liye `key={idx}` ki jagah `key={\`${item.type}-${item.id}\`}` use kiya taake React sahi se re-render kare

---

## 10. **Layout & Metadata**

`app/layout.js` Server Component hai (metadata ke liye):

```jsx
export const metadata = {
  title: "Media Search",
};
```

Layout me `ReduxProvider`, `Navbar` aur `{children}` wrap hain.

---

## Short Summary

| Change | Reason |
|--------|--------|
| "use client" | Hooks aur browser APIs ke liye client component chahiye |
| mediaApi → lib/ | app/api/ sirf API routes ke liye |
| Giphy mapping | Tenor ki jagah Giphy response structure use karna |
| Link from next/link | Next.js navigation |
| CollectionHydrator | localStorage SSR ke sath use karne ke liye |
| react-toastify | Toast notifications |
| Remove button fix | Type-safe remove + toast feedback |
