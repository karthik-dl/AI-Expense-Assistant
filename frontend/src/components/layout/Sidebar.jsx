import { NavLink } from "react-router-dom";
import {
    FaChartPie,
    FaWallet,
    FaMoneyBillWave,
    FaBullseye,
    FaChartBar,
    FaFileAlt,
    FaRobot,
    FaUser
} from "react-icons/fa";

const menu = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaChartPie />
    },
    {
        title: "Expenses",
        path: "/expenses",
        icon: <FaWallet />
    },
    {
        title: "Income",
        path: "/income",
        icon: <FaMoneyBillWave />
    },
    {
        title: "Budgets",
        path: "/budgets",
        icon: <FaBullseye />
    },
    {
        title: "Analytics",
        path: "/analytics",
        icon: <FaChartBar />
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <FaFileAlt />
    },
    {
        title: "AI Summary",
        path: "/ai-summary",
        icon: <FaRobot />
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <FaUser />
    }
];

function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

            <h1 className="text-2xl font-bold mb-10">
                AI Expense Assistant
            </h1>

            <nav className="space-y-2">

                {
                    menu.map((item) => (

                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                }`
                            }
                        >
                            {item.icon}
                            {item.title}
                        </NavLink>

                    ))
                }

            </nav>

        </aside>
    );
}

export default Sidebar;