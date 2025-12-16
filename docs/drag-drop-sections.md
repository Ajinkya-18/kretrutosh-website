# Drag-and-Drop Section Configuration

This document explains the sections defined for each page that supports drag-and-drop layout ordering.

## Contact Page Sections

The `page_contact` table has the following sections:

1. **hero** - Hero section with title (locked at top)
2. **form** - Google Form embed section
3. **calendly** - Calendly booking widget/button
4. **address** - Address details (HTML content)
5. **map** - Google Maps embed

### Default Order
```json
["hero", "form", "calendly", "address", "map"]
```

### Default Visibility
```json
{
  "hero": true,
  "form": true,
  "calendly": true,
  "address": true,
  "map": true
}
```

---

## Book Page Sections

The `book` table has the following sections:

1. **hero** - Hero section with title and subtitle (locked at top)
2. **content** - Main book content including:
   - Book cover image
   - About the book description
   - Price information
   - Call-to-action (Amazon link)
   - QR code section
3. **author** - Author bio section

### Default Order
```json
["hero", "content", "author"]
```

### Default Visibility
```json
{
  "hero": true,
  "content": true,
  "author": true
}
```

> [!NOTE]
> The Book page has a simpler structure with fewer sections since the main content area contains multiple sub-elements (cover, about, pricing, QR code) that are best kept together as a single section.

---

## Implementation Steps

### 1. Run the SQL Script

Execute the SQL script to add the columns:
```bash
# Option 1: Use Supabase Dashboard
# - Go to SQL Editor
# - Copy content from src/sql/add_drag_drop_support.sql
# - Execute

# Option 2: Use psql (if you have direct database access)
psql <connection-string> -f src/sql/add_drag_drop_support.sql
```

### 2. Update Frontend Pages

After running the SQL, update the frontend pages to respect `layout_order` and `section_visibility`:

#### Contact.tsx
Follow the pattern in [About.tsx](file:///a:/AI-Projects/client-projects/kretrutosh-consulting/src/pages/About.tsx):
- Fetch `layout_order` and `section_visibility` from database
- Create `renderSection()` function to map section keys to components
- Render sections in the order specified by `layout_order`
- Filter out sections where `section_visibility[key] === false`

#### Book.tsx
Already partially implemented - just needs to use the database fields instead of hardcoded layout.

### 3. Add Drag-and-Drop to Admin Panel

#### Contact Page Admin
Create similar to [page_about/edit.tsx](file:///a:/AI-Projects/client-projects/kretrutosh-consulting/admin-panel/src/pages/page_about/edit.tsx):
```tsx
const DEFAULT_SECTIONS: SectionItem[] = [
  { key: "hero", label: "Hero Section", locked: true },
  { key: "form", label: "Contact Form" },
  { key: "calendly", label: "Calendly Booking" },
  { key: "address", label: "Address Details" },
  { key: "map", label: "Google Map" }
];
```

#### Book Page Admin
```tsx
const DEFAULT_SECTIONS: SectionItem[] = [
  { key: "hero", label: "Hero Section", locked: true },
  { key: "content", label: "Book Content & CTA" },
  { key: "author", label: "About the Author" }
];
```

---

## Testing Checklist

After implementation:

- [ ] Run SQL migration script
- [ ] Verify columns exist in Supabase dashboard
- [ ] Update Contact.tsx frontend to use layout_order/section_visibility
- [ ] Update Book.tsx frontend to use layout_order/section_visibility
- [ ] Add drag-and-drop UI to page_contact/edit.tsx
- [ ] Add drag-and-drop UI to book/edit.tsx
- [ ] Test reordering sections in admin panel
- [ ] Test toggling visibility switches
- [ ] Verify changes appear on frontend pages
- [ ] Test real-time sync
