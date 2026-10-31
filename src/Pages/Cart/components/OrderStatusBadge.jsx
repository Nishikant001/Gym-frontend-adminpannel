export default function OrderStatusBadge({
  status,
}) {
  const normalized =
    String(status || "pending")
      .toLowerCase();

  const styles = {
    pending:
      "bg-amber-500/15 text-amber-500 border-amber-500/20",

    confirmed:
      "bg-blue-500/15 text-blue-500 border-blue-500/20",

    packed:
      "bg-purple-500/15 text-purple-500 border-purple-500/20",

    shipped:
      "bg-indigo-500/15 text-indigo-500 border-indigo-500/20",

    delivered:
      "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",

    cancelled:
      "bg-red-500/15 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        capitalize

        ${
          styles[normalized] ||
          "bg-gray-500/15 text-gray-500 border-gray-500/20"
        }
      `}
    >
      {normalized}
    </span>
  );
}