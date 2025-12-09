export const GRID_MAP: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
};

export const ALIGN_MAP: Record<string, string> = {
  left: "text-left items-start",
  center: "text-center items-center mx-auto",
  right: "text-right items-end ml-auto",
};

export const THEME_MAP: Record<string, string> = {
  light: "bg-background text-foreground", // white/default
  white: "bg-background text-foreground", 
  gray: "bg-muted/50 text-foreground",  // muted
  muted: "bg-muted/50 text-foreground",
  navy: "bg-[#0A192F] text-white",      // brand dark
  dark: "bg-[#0A192F] text-white",
};
