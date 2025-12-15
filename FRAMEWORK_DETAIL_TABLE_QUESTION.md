# Framework Detail Page - Table Structure Question

## Issue

The `FrameworkDetail.tsx` page is trying to fetch "sections" for each framework from `sections_framework_details` table, but this table doesn't exist.

## Questions for User

1. **Should framework detail pages have dynamic sections?**
   - If YES: We need to create the `sections_framework_details` table
   - If NO: We should remove the sections functionality and only show framework metadata

2. **Current Query Logic:**
```typescript
// Trying to fetch sections that belong to a specific framework
.from('sections_framework_details')
.eq('parent_slug', slug)  // Get sections for this framework
.eq('is_visible', true)
.order('display_order', { ascending: true})
```

3. **Possible Solutions:**

### Option A: All framework data is in `frameworks` table
- Remove sections functionality
- Store all framework details in the main `frameworks` record
- Page shows: title, description, outcomes, image (already working)

### Option B: Create `sections_framework_details` table
Create a table to store dynamic sections for each framework:
```sql
CREATE TABLE IF NOT EXISTS public.sections_framework_details (
  id SERIAL PRIMARY KEY,
  parent_slug TEXT REFERENCES frameworks(slug) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT,
  content_body TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  bg_theme TEXT DEFAULT 'light',
  grid_columns INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Option C: Store sections as JSONB in frameworks table
Add a column to `frameworks`:
```sql
ALTER TABLE frameworks 
ADD COLUMN sections JSONB DEFAULT '[]'::jsonb;
```

## Temporary Fix Applied

Commented out the sections query to prevent errors. Framework detail pages now show only the main framework data without dynamic sections.

## Current Functionality

Framework detail pages now display:
- ✅ Framework title
- ✅ Short description  
- ✅ Measurable outcomes
- ✅ Framework icon/image
- ❌ Dynamic sections (disabled until table structure resolved)
