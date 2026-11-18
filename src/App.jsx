import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./Pages/Dashboard/DashboardPage.jsx"
import DashboardLayout from "./Components/Layout/DashboardLayout.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ProfilePage from "./Pages/AdminProfile/ProfilePage.jsx";
import UsersPage from "./Pages/Users/UserPage.jsx";
import BranchPage from "./Pages/Branches/BranchPage.jsx";
import TrainerPage from "./Pages/Trainer/TrainerPage.jsx";
import SubscriptionPage from "./Pages/SubscriptionPlans/SubscriptionPage.jsx";
import SupplementManagement from "./Pages/Supplements Management/SuplementManagement.jsx";
import CategoryPage from "./Pages/Supplements Management/Category/Category.jsx";
import SupplementStorePage from "./Pages/Supplements Management/Supplements/SupplementStorePage.jsx";
import GoalGroupPage from "./Pages/Goal Groups/GoalGroupPage.jsx";
import WorkoutPage from "./Pages/Workout/WorkoutPage.jsx";
import DietPage from "./Pages/Diet Plan/DietPage.jsx";
import BannerPage from "./Pages/Banners/BannerPage.jsx";
import ReportsPage from "./Pages/Reports/ReportsPage.jsx"
import OffersPage from "./Pages/Offers/OffersPage.jsx";
// import CartPage from "./Pages/Cart/CartPage.jsx";
import ExercisePage from "./Pages/Exercise/ExercisePage.jsx"
import OrderPage from "./Pages/Cart/OrderPage.jsx";
import LandingPage from "./Pages/Landing/LandingPage.jsx";
import SiteLayout from "./Pages/Website/components/SiteLayout.jsx";
import AboutPage from "./Pages/Website/pages/AboutPage.jsx";
import ServicesPage from "./Pages/Website/pages/ServicesPage.jsx";
import ServiceDetailPage from "./Pages/Website/pages/ServiceDetailPage.jsx";
import WellnessPage from "./Pages/Website/pages/WellnessPage.jsx";
import MembershipPage from "./Pages/Website/pages/MembershipPage.jsx";
import ContactPage from "./Pages/Website/pages/ContactPage.jsx";
import BranchDetailPage from "./Pages/Website/pages/BranchDetailPage.jsx";
import TourPage from "./Pages/Website/pages/TourPage.jsx";
import LegalPage from "./Pages/Website/pages/LegalPage.jsx";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC LANDING PAGE */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/wellness-recovery" element={<WellnessPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/branches/:slug" element={<BranchDetailPage />} />
          <Route path="/book-gym-tour" element={<TourPage />} />
          <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
        </Route>

        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* CHILD ROUTES */}
          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="users"
            element={<UsersPage />}
          />

          <Route
            path="branches"
            element={<BranchPage />}
          />

          <Route
            path="trainers"
            element={<TrainerPage />}
          />

          <Route
            path="subscriptions"
            element={<SubscriptionPage />}
          />
          <Route path="supplements" element={<SupplementManagement />}>
            <Route index element={<CategoryPage />} />
            <Route path="store" element={<SupplementStorePage />} />
          </Route>

          <Route


            path="profile"
            element={<ProfilePage />}
          />
          <Route path="goalgroups" element={<GoalGroupPage />} />
          <Route path="workouts" element={<WorkoutPage />} />
          <Route path="diet-plans" element={<DietPage />} />
          <Route path="banners" element={<BannerPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="exercise" element={<ExercisePage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;