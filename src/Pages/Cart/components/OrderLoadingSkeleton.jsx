import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function OrderLoadingSkeleton() {
  const { theme } = useTheme();

  const headers = [
    "Order No",
    "Order Items",
    "Total",
    "Date",
    "Order Status",
    "Invoice",
  ];

  return (
    <div className="overflow-x-auto">

      <table className="
        min-w-[1100px]
        w-full
      ">

        <thead
          className={
            theme === "dark"
              ? "bg-[#111827]"
              : "bg-gray-50"
          }
        >
          <tr>

            {headers.map(
              (header) => (
                <th
                  key={header}
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-gray-500
                  "
                >
                  {header}
                </th>
              )
            )}

          </tr>
        </thead>

        <tbody>

          {[1, 2, 3, 4, 5].map(
            (row) => (
              <tr
                key={row}
                className="border-b border-white/5"
              >

                {headers.map(
                  (_, index) => (
                    <td
                      key={index}
                      className="px-6 py-5"
                    >
                      <motion.div
                        animate={{
                          opacity: [
                            0.4,
                            0.8,
                            0.4,
                          ],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat:
                            Infinity,
                        }}
                        className={`
                          h-5
                          rounded
                          ${
                            theme ===
                            "dark"
                              ? "bg-gray-700"
                              : "bg-gray-200"
                          }
                        `}
                      />
                    </td>
                  )
                )}

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}