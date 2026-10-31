import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import OrderHeader from "./components/OrderHeader";
import OrderTabs from "./components/OrderTabs";

import CartStats from "./components/CartStats";
import CartTable from "./components/CartTable";
import EmptyState from "./components/EmptyState";
import LoadingSkeleton from "./components/OrderLoadingSkeleton";

import OrderStatusTable from "./components/OrderStatusTable";
import OrderLoadingSkeleton from "./components/OrderLoadingSkeleton";

import { getAllCart } from "../../Api/cartApi";
import { getAllOrders } from "../../Api/orderApi";

export default function OrderPage() {
  const { theme } = useTheme();

  /*
  |--------------------------------------------------------------------------
  | Tabs
  |--------------------------------------------------------------------------
  */

  const [activeTab, setActiveTab] =
    useState("order");

  /*
  |--------------------------------------------------------------------------
  | Cart state
  |--------------------------------------------------------------------------
  */

  const [loadingCart, setLoadingCart] =
    useState(true);

  const [carts, setCarts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Orders state
  |--------------------------------------------------------------------------
  */

  const [loadingOrders, setLoadingOrders] =
    useState(false);

  const [orders, setOrders] =
    useState([]);

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch cart
  |--------------------------------------------------------------------------
  */

  const fetchCart = async () => {
    try {
      setLoadingCart(true);

      const res =
        await getAllCart();

      if (
        res?.success &&
        res?.cart
      ) {
        setCarts(
          Array.isArray(res.cart)
            ? res.cart
            : [res.cart]
        );
      } else {
        setCarts([]);
      }

    } catch (err) {
      console.error(
        "Failed to fetch carts:",
        err
      );

      setCarts([]);

    } finally {
      setLoadingCart(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch orders
  |--------------------------------------------------------------------------
  */

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      setError("");

      const res =
        await getAllOrders();

      // console.log(
      //   "All Orders:",
      //   res
      // );

      if (
        res?.success
      ) {
        setOrders(
          Array.isArray(res.orders)
            ? res.orders
            : []
        );
      } else {
        setOrders([]);
      }

    } catch (err) {
      console.error(
        "Failed to fetch orders:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Failed to load orders."
      );

      setOrders([]);

    } finally {
      setLoadingOrders(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchCart();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch orders when Status tab opens
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      activeTab === "status"
    ) {
      fetchOrders();
    }
  }, [activeTab]);

  /*
  |--------------------------------------------------------------------------
  | Filter carts
  |--------------------------------------------------------------------------
  */

  const filteredCarts =
    useMemo(() => {

      const keyword =
        search
          .toLowerCase()
          .trim();

      if (!keyword) {
        return carts;
      }

      return carts.filter(
        (cart) => {

          const member =
            cart.memberName ||
            cart.user?.name ||
            cart.member ||
            "";

          const product =
            cart.productName ||
            cart.product?.name ||
            cart.product ||
            "";

          return (
            String(member)
              .toLowerCase()
              .includes(keyword) ||

            String(product)
              .toLowerCase()
              .includes(keyword)
          );
        }
      );

    }, [carts, search]);

  /*
  |--------------------------------------------------------------------------
  | Cart statistics
  |--------------------------------------------------------------------------
  */

  const stats =
    useMemo(() => {

      const pending =
        carts.filter(
          (cart) =>
            String(
              cart.status || ""
            ).toLowerCase() ===
            "pending"
        ).length;

      const abandoned =
        carts.filter(
          (cart) =>
            String(
              cart.status || ""
            ).toLowerCase() ===
            "abandoned"
        ).length;

      const value =
        carts.reduce(
          (sum, cart) => {

            return (
              sum +
              Number(
                cart.total ||
                cart.totalAmount ||
                cart.value ||
                0
              )
            );

          },
          0
        );

      return {
        pending,
        abandoned,
        value,
      };

    }, [carts]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`
        min-h-screen
        p-6

        ${
          theme === "dark"
            ? "bg-transparent text-white"
            : "bg-[#F5F7FB] text-gray-900"
        }
      `}
    >

      {/* HEADER */}

      <OrderHeader
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
      />

      {/* TABS */}

      <div className="mt-6">

        <OrderTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      </div>

      {/* ERROR */}

      {error && (
        <div className="
          mt-4
          rounded-xl
          border
          border-red-500/20
          bg-red-500/10
          px-4
          py-3
          text-sm
          text-red-400
        ">
          {error}
        </div>
      )}

      {/* =====================================================
          ORDER TAB
      ===================================================== */}

      {activeTab === "order" && (
        <>
          {/* STATS */}

          <div className="mt-6">

            <CartStats
              stats={stats}
            />

          </div>

          {/* TABLE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className={`
              mt-6
              overflow-hidden
              rounded-2xl
              border

              ${
                theme === "dark"
                  ? "border-white/10 bg-[#0F172A]/50"
                  : "border-gray-200 bg-white"
              }
            `}
          >

            {loadingCart ? (
              <LoadingSkeleton />
            ) : filteredCarts.length === 0 ? (
              <EmptyState />
            ) : (
              <CartTable
                carts={filteredCarts}
                refreshCart={
                  fetchCart
                }
              />
            )}

          </motion.div>
        </>
      )}

      {/* =====================================================
          STATUS TAB
      ===================================================== */}

      {activeTab === "status" && (
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className={`
            mt-6
            overflow-hidden
            rounded-2xl
            border

            ${
              theme === "dark"
                ? "border-white/10 bg-[#0F172A]/50"
                : "border-gray-200 bg-white"
            }
          `}
        >

          {loadingOrders ? (
            <OrderLoadingSkeleton />
          ) : (
            <OrderStatusTable
              orders={orders}
              refreshOrders={
                fetchOrders
              }
            />
          )}

        </motion.div>
      )}

    </motion.div>
  );
}