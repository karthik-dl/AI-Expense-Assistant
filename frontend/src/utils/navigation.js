import {
    LayoutDashboard,
    Wallet,
    IndianRupee,
    Target,
    BarChart3,
    FileText,
    Bot,
    User
} from "lucide-react";

export const navigation = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Expenses",
        path: "/expenses",
        icon: Wallet
    },
    {
        name: "Income",
        path: "/income",
        icon: IndianRupee
    },
    {
        name: "Budgets",
        path: "/budgets",
        icon: Target
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3
    },
    {
        name: "Reports",
        path: "/reports",
        icon: FileText
    },
    {
        name: "AI Summary",
        path: "/ai-summary",
        icon: Bot
    },
    {
        name: "Profile",
        path: "/profile",
        icon: User
    }
];