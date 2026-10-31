import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  CalendarDays,
  Target,
} from "lucide-react";

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
}) {
  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{ duration: 0.25 }}
      className="
        flex
        h-[420px]
        min-w-0
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:shadow-xl

        sm:h-[440px]

        lg:h-[460px]

        dark:border-slate-700
        dark:bg-slate-900/80
        dark:hover:border-orange-500/40
      "
    >
      {/* =====================================
          HEADER
      ====================================== */}

      <div
        className="
          shrink-0
          border-b
          border-gray-200
          p-4

          sm:p-5

          lg:p-6

          dark:border-slate-700
        "
      >
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          {/* Goal Icon */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-[#C11200]
              to-[#F96B00]
              text-white
              shadow-lg

              sm:h-11
              sm:w-11

              lg:h-12
              lg:w-12
            "
          >
            <Target
              size={20}
              className="
                sm:h-[21px]
                sm:w-[21px]

                lg:h-[22px]
                lg:w-[22px]
              "
            />
          </div>

          {/* Goal Name & Description */}

          <div className="min-w-0 flex-1">
            <h2
              className="
                break-words
                text-lg
                font-bold
                leading-tight
                text-gray-900

                sm:text-xl

                dark:text-white
              "
            >
              {goal.name}
            </h2>

            <p
              className="
                mt-2
                break-words
                text-sm
                leading-5
                text-gray-500

                sm:leading-6

                dark:text-slate-400
              "
            >
              {goal.description || "No description available"}
            </p>
          </div>
        </div>

        {/* Status */}

        {goal.status && (
          <div className="mt-3">
            <span
              className="
                inline-flex
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-semibold
                text-green-700

                dark:bg-green-500/20
                dark:text-green-400
              "
            >
              Active
            </span>
          </div>
        )}
      </div>

      {/* =====================================
          SCROLLABLE BODY
      ====================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          p-4

          sm:p-5

          lg:p-6

          [scrollbar-width:thin]
          [scrollbar-color:#475569_transparent]
        "
      >
        <div className="space-y-4">
          {/* Created Date */}

          <div
            className="
              flex
              min-w-0
              items-start
              gap-2
              text-sm
              text-gray-500

              dark:text-slate-400
            "
          >
            <CalendarDays
              size={16}
              className="mt-0.5 shrink-0"
            />

            <span className="shrink-0">
              Created:
            </span>

            <span
              className="
                min-w-0
                break-words
                font-medium
                text-gray-700

                dark:text-gray-200
              "
            >
              {formatDate(goal.createdAt)}
            </span>
          </div>

          {/* Members */}

          {goal.members && (
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-2
              "
            >
              <span
                className="
                  text-sm
                  text-gray-500
                  dark:text-slate-400
                "
              >
                Members
              </span>

              <span
                className="
                  break-words
                  text-sm
                  font-semibold
                  text-gray-900

                  dark:text-white
                "
              >
                {goal.members}
              </span>
            </div>
          )}

          {/* Trainer */}

          {goal.trainer && (
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-2
              "
            >
              <span
                className="
                  text-sm
                  text-gray-500
                  dark:text-slate-400
                "
              >
                Trainer
              </span>

              <span
                className="
                  max-w-[65%]
                  break-words
                  text-right
                  text-sm
                  font-semibold
                  text-gray-900

                  dark:text-white
                "
              >
                {goal.trainer}
              </span>
            </div>
          )}

          {/* 
            If you add more fields later, they will remain
            inside this scrollable section.
          */}
        </div>
      </div>

      {/* =====================================
          FOOTER / ACTION BUTTONS
      ====================================== */}

      <div
        className="
          shrink-0
          border-t
          border-gray-200
          p-4

          sm:p-5

          dark:border-slate-700
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:justify-end
          "
        >
          {/* Edit */}

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onEdit(goal)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-blue-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-blue-600
              transition-all

              hover:bg-blue-500
              hover:text-white

              sm:w-auto
              sm:py-2

              dark:text-blue-400
              dark:hover:text-white
            "
          >
            <Pencil size={16} />
            Edit
          </motion.button>

          {/* Delete */}

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onDelete(goal)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-red-600
              transition-all

              hover:bg-red-500
              hover:text-white

              sm:w-auto
              sm:py-2

              dark:text-red-400
              dark:hover:text-white
            "
          >
            <Trash2 size={16} />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}