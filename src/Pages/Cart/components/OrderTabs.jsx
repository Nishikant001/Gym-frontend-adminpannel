import { motion } from "framer-motion";
import {
  ShoppingCart,
  ListChecks,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function OrderTabs({
  activeTab,
  setActiveTab,
}) {
  const { theme } = useTheme();

  const tabs = [
    {
      id: "order",
      label: "Order",
      icon: ShoppingCart,
    },
    {
      id: "status",
      label: "Status",
      icon: ListChecks,
    },
  ];

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1
        rounded-xl
        border
        p-1

        ${
          theme === "dark"
            ? "bg-[#0F172A] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;

        const active =
          activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              relative
              flex
              items-center
              gap-2
              rounded-lg
              px-5
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-300

              ${
                active
                  ? "text-white"
                  : theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }
            `}
          >
            {active && (
              <motion.div
                layoutId="order-active-tab"
                className="
                  absolute
                  inset-0
                  rounded-lg
                  bg-gradient-to-r
                  from-[#C11200]
                  to-[#F96B00]
                  shadow-lg
                  shadow-orange-500/20
                "
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            <Icon
              size={17}
              className="relative z-10"
            />

            <span className="relative z-10">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}