import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FileText,
  Download,
  ChevronDown,
  Package,
} from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";
import {
  updateOrderStatus,
  downloadInvoice,
} from "../../../Api/orderApi";

export default function OrderStatusTable({
  orders = [],
  refreshOrders,
}) {
  const { theme } = useTheme();

  const [updatingId, setUpdatingId] =
    useState(null);

  const [downloadingId, setDownloadingId] =
    useState(null);

  const statuses = [
    "pending",
    "confirmed",
    "packed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  /*
  |--------------------------------------------------------------------------
  | Update status
  |--------------------------------------------------------------------------
  */

  const handleStatusChange = async (
    orderId,
    status
  ) => {
    try {
      setUpdatingId(orderId);

      await updateOrderStatus(
        orderId,
        status
      );

      await refreshOrders?.();

    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Download invoice
  |--------------------------------------------------------------------------
  */

  const handleDownloadInvoice = async (
    invoiceId,
    invoiceNumber
  ) => {
    try {
      setDownloadingId(invoiceId);

      const response =
        await downloadInvoice(
          invoiceId
        );

      const blob =
        new Blob(
          [response.data],
          {
            type: "application/pdf",
          }
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${invoiceNumber || "invoice"}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Invoice download failed:",
        error
      );

      alert(
        "Failed to download invoice."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Empty
  |--------------------------------------------------------------------------
  */

  if (!orders.length) {
    return (
      <div className="py-20 text-center">

        <Package
          size={42}
          className="
            mx-auto
            mb-4
            text-[#F96B00]
          "
        />

        <h3
          className={`
            text-xl
            font-bold

            ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }
          `}
        >
          No Orders Found
        </h3>

        <p className="
          mt-2
          text-sm
          text-gray-500
        ">
          There are currently no orders available.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="min-w-[1100px] w-full">

        {/* HEADER */}

        <thead
          className={
            theme === "dark"
              ? "bg-[#111827]"
              : "bg-gray-50"
          }
        >
          <tr
            className={`
              border-b

              ${
                theme === "dark"
                  ? "border-white/10"
                  : "border-gray-200"
              }
            `}
          >

            {[
              "Order No",
              "Order Items",
              "Total",
              "Date",
              "Order Status",
              "Invoice",
            ].map((heading) => (
              <th
                key={heading}
                className={`
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-widest

                  ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                `}
              >
                {heading}
              </th>
            ))}

          </tr>
        </thead>

        {/* BODY */}

        <tbody>

          {orders.map(
            (order, index) => {

              const status =
                order.orderStatus ||
                "pending";

              const items =
                Array.isArray(
                  order.items
                )
                  ? order.items
                  : [];

              const date =
                order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "-";

              return (
                <motion.tr
                  key={
                    order._id ||
                    index
                  }
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.04,
                  }}
                  className={`
                    border-b
                    transition-colors

                    ${
                      theme === "dark"
                        ? "border-white/5 hover:bg-[#F96B00]/5"
                        : "border-gray-100 hover:bg-orange-50/50"
                    }
                  `}
                >

                  {/* ORDER NO */}

                  <td className="px-6 py-5">

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <div className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-[#C11200]
                        to-[#F96B00]
                        text-white
                      ">
                        <Package
                          size={18}
                        />
                      </div>

                      <div>

                        <p
                          className={`
                            font-semibold

                            ${
                              theme === "dark"
                                ? "text-white"
                                : "text-gray-900"
                            }
                          `}
                        >
                          #
                          {String(
                            order._id || ""
                          ).slice(-8)}
                        </p>

                        <p className="
                          mt-1
                          text-xs
                          text-gray-500
                        ">
                          Order
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ITEMS */}

                  <td className="px-6 py-5">

                    <div className="space-y-2">

                      {items.map(
                        (
                          item,
                          itemIndex
                        ) => (
                          <div
                            key={
                              item._id ||
                              itemIndex
                            }
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <span
                              className={`
                                max-w-[260px]
                                truncate
                                text-sm

                                ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                }
                              `}
                            >
                              {item.productName ||
                                "Product"}
                            </span>

                            <span className="
                              rounded-md
                              bg-gray-500/10
                              px-2
                              py-0.5
                              text-xs
                              text-gray-500
                            ">
                              x
                              {item.quantity ||
                                0}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </td>

                  {/* TOTAL */}

                  <td className="
                    px-6
                    py-5
                    font-semibold
                    text-[#F96B00]
                  ">
                    ₹
                    {Number(
                      order.totalAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  {/* DATE */}

                  <td
                    className={`
                      px-6
                      py-5
                      text-sm

                      ${
                        theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {date}
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <div className="
                      relative
                      w-44
                    ">

                      <select
                        value={status}
                        disabled={
                          updatingId ===
                          order._id
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className={`
                          w-full
                          appearance-none
                          rounded-lg
                          border
                          bg-transparent
                          px-3
                          py-2
                          pr-9
                          text-sm
                          outline-none
                          transition

                          ${
                            theme === "dark"
                              ? "border-white/10 bg-[#111827] text-white"
                              : "border-gray-200 bg-white text-gray-800"
                          }

                          focus:border-[#F96B00]
                          focus:ring-1
                          focus:ring-[#F96B00]
                        `}
                      >

                        {statuses.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item
                                .charAt(0)
                                .toUpperCase() +
                                item.slice(1)}
                            </option>
                          )
                        )}

                      </select>

                      <ChevronDown
                        size={16}
                        className="
                          pointer-events-none
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-gray-500
                        "
                      />

                    </div>

                    <div className="mt-2">
                      <OrderStatusBadge
                        status={status}
                      />
                    </div>

                  </td>

                  {/* INVOICE */}

                  <td className="px-6 py-5">

                    {status ===
                    "delivered" ? (
                      order.invoiceId ? (
                        <button
                          disabled={
                            downloadingId ===
                            order.invoiceId
                          }
                          onClick={() =>
                            handleDownloadInvoice(
                              order.invoiceId,
                              order.invoiceNumber
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-green-500/10
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-green-500
                            transition
                            hover:bg-green-500/20
                          "
                        >
                          <Download
                            size={16}
                          />

                          {downloadingId ===
                          order.invoiceId
                            ? "Downloading..."
                            : "Invoice"}
                        </button>
                      ) : (
                        <button
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-[#F96B00]/10
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-[#F96B00]
                            transition
                            hover:bg-[#F96B00]/20
                          "
                          onClick={() => {
                            alert(
                              "Invoice generation API is required."
                            );
                          }}
                        >
                          <FileText
                            size={16}
                          />

                          Generate
                        </button>
                      )
                    ) : (
                      <span className="
                        text-xs
                        text-gray-500
                      ">
                        Available after delivery
                      </span>
                    )}

                  </td>

                </motion.tr>
              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
}