import "expo-router/entry";

// Optional: Add a tiny root style for perfect full-screen layout
if (typeof document !== "undefined") {
  document.documentElement.style.height = "100%";
  document.body.style.height = "100%";
  document.body.style.margin = "0";
  document.getElementById("root")?.style.setProperty("height", "100%");
}