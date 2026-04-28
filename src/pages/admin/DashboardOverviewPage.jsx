import { useEffect, useState } from "react";
import CategoryChart from "../../components/admin/CategoryChart.jsx";
import LiveOrdersFeed from "../../components/admin/LiveOrdersFeed.jsx";
import PageLoader from "../../components/PageLoader.jsx";
import SalesChart from "../../components/admin/SalesChart.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import TopProductsCard from "../../components/admin/TopProductsCard.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import useSocket from "../../hooks/useSocket.js";
import { fetchDashboardSummary } from "../../services/dashboardService.js";
import { formatCurrency } from "../../utils/format.js";
import api from "../../services/api.js";

export default function DashboardOverviewPage() {
  const [summary, setSummary] = useState(null);
  const [billStats, setBillStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useDocumentTitle("Admin overview");

  async function loadSummary() {
    const data = await fetchDashboardSummary();
    setSummary(data);
    setNotifications(data.recentOrders || []);
  }

  async function loadBillStats() {
    try {
      const { data } = await api.get("/bills/stats");
      setBillStats(data);
    } catch (error) {
      console.error("Failed to load bill stats:", error);
    }
  }

  useEffect(() => {
    Promise.all([loadSummary(), loadBillStats()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    socket.emit("admin:join");

    const handlePresence = ({ activeUsers }) => {
      setSummary((previous) =>
        previous
          ? {
            ...previous,
            overview: {
              ...previous.overview,
              activeUsers,
            },
          }
          : previous,
      );
    };

    const handleRefresh = () => {
      loadSummary();
      loadBillStats();
    };

    const handleNewOrder = (payload) => {
      setNotifications((previous) => [payload, ...previous].slice(0, 6));
      loadSummary();
    };

    socket.on("dashboard:presence", handlePresence);
    socket.on("dashboard:refresh", handleRefresh);
    socket.on("order:new", handleNewOrder);

    return () => {
      socket.off("dashboard:presence", handlePresence);
      socket.off("dashboard:refresh", handleRefresh);
      socket.off("order:new", handleNewOrder);
    };
  }, [socket]);

  if (loading || !summary || !billStats) {
    return <PageLoader />;
  }

  const statCards = [
    ["Total users", summary.overview.totalUsers, "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200", "Registered accounts across the platform"],
    ["Total orders", summary.overview.totalOrders, "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-200", "Includes every completed checkout"],
    ["Total revenue", formatCurrency(summary.overview.totalRevenue), "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200", "Gross revenue tracked from order totals"],
    ["Active users", summary.overview.activeUsers, "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200", "Currently connected authenticated users"],
    ["Total bills", billStats.totalBills, "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200", "Total bills created"],
    ["Paid bills", billStats.paidBills, "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-200", "Completed payments"],
    ["Bill revenue", formatCurrency(billStats.totalRevenue), "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200", "Revenue from all bills"],
    ["Pending bills", billStats.pendingBills, "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-200", "Awaiting payment"],
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([title, value, accent, note]) => (
          <StatCard key={title} title={title} value={value} accent={accent} note={note} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SalesChart data={summary.dailySales} />
        <TopProductsCard products={summary.topProducts} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <LiveOrdersFeed orders={notifications} />
        <CategoryChart data={summary.categoryPerformance} />
      </div>
    </div>
  );
}
