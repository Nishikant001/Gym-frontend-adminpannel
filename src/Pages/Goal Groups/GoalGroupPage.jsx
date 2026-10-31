import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import GoalHeader from "./component/GoalHeader.jsx";
import GoalGrid from "./component/GoalGrid.jsx";
import AddGoalModal from "./component/AddGoalModal.jsx";
import EditGoalModal from "./component/EditGoalModal.jsx";
import DeleteGoalModal from "./component/DeleteGoalModal.jsx";

import {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../Api/goalGroupApi.js";

export default function GoalGroupPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  // ===============================
  // Fetch Goals
  // ===============================

  const fetchGoals = async () => {
    try {
      setLoading(true);

      const res = await getAllGoals();

      if (res.success) {
        setGoals(res.goals || []);
      }
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // ===============================
  // Add Goal
  // ===============================

  const handleCreateGoal = async (formData) => {
    try {
      const res = await createGoal(formData);

      if (res.success) {
        setShowAddModal(false);
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Edit Goal
  // ===============================

  const handleUpdateGoal = async (formData) => {
    try {
      const res = await updateGoal(selectedGoal._id, formData);

      if (res.success) {
        setShowEditModal(false);
        setSelectedGoal(null);
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Delete Goal
  // ===============================

  const handleDeleteGoal = async () => {
    try {
      const res = await deleteGoal(selectedGoal._id);

      if (res.success) {
        setShowDeleteModal(false);
        setSelectedGoal(null);
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Skeleton Loading
  // ===============================

  const renderSkeleton = () => {
    return [...Array(6)].map((_, index) => (
      <div
        key={index}
        className="
          min-w-0
          w-full
          animate-pulse
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-4
          shadow

          sm:p-5

          lg:p-6

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* Skeleton Title */}
        <div
          className="
            mb-5
            h-5
            w-2/3
            max-w-40
            rounded
            bg-gray-300
            dark:bg-slate-700
          "
        />

        {/* Skeleton Description */}
        <div
          className="
            mb-8
            h-4
            w-4/5
            max-w-64
            rounded
            bg-gray-200
            dark:bg-slate-800
          "
        />

        {/* Skeleton Buttons */}
        <div className="flex flex-wrap justify-between gap-3">
          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-slate-800" />

          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-slate-800" />
        </div>
      </div>
    ));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          min-h-screen
          w-full
          min-w-0
          overflow-x-hidden
          bg-[#F5F7FB]
          px-3
          py-4
          transition-colors
          duration-300

          sm:px-4
          sm:py-5

          md:px-5
          md:py-6

          lg:px-6

          dark:bg-[#060816]
        "
      >
        {/* ===============================
            Header
        =============================== */}

        <div className="w-full min-w-0">
          <GoalHeader
            totalGoals={goals.length}
            onCreate={() => setShowAddModal(true)}
          />
        </div>

        {/* ===============================
            Goal Grid
        =============================== */}

        <div className="mt-5 w-full min-w-0 sm:mt-6 lg:mt-8">
          {loading ? (
            <div
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-4

                sm:gap-5

                lg:grid-cols-2
                lg:gap-6

                2xl:grid-cols-3
              "
            >
              {renderSkeleton()}
            </div>
          ) : (
            <GoalGrid
              goals={goals}
              onEdit={(goal) => {
                setSelectedGoal(goal);
                setShowEditModal(true);
              }}
              onDelete={(goal) => {
                setSelectedGoal(goal);
                setShowDeleteModal(true);
              }}
            />
          )}
        </div>
      </motion.div>

      {/* ===============================
          Add Goal Modal
      =============================== */}

      <AddGoalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateGoal}
      />

      {/* ===============================
          Edit Goal Modal
      =============================== */}

      <EditGoalModal
        isOpen={showEditModal}
        goal={selectedGoal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedGoal(null);
        }}
        onSubmit={handleUpdateGoal}
      />

      {/* ===============================
          Delete Goal Modal
      =============================== */}

      <DeleteGoalModal
        isOpen={showDeleteModal}
        goal={selectedGoal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedGoal(null);
        }}
        onDelete={handleDeleteGoal}
      />
    </>
  );
}