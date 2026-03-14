export const scoreColor = (s) =>
  s >= 75 ? "text-emerald-400" : s >= 50 ? "text-yellow-400" : "text-red-400";

export const scoreLabel = (s) =>
  s >= 75 ? "Strong" : s >= 50 ? "Moderate" : "Weak";

export const sevColor = {
  High: "bg-red-400",
  Medium: "bg-yellow-400",
  Low: "bg-emerald-400",
};

export const sevText = {
  High: "text-red-400",
  Medium: "text-yellow-400",
  Low: "text-emerald-400",
};

export const sevBg = {
  High: "bg-red-500/10 border-red-500/30",
  Medium: "bg-yellow-500/10 border-yellow-500/30",
  Low: "bg-emerald-500/10 border-emerald-500/30",
};