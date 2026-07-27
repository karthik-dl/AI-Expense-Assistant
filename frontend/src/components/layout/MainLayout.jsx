import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {
    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8 bg-slate-50 min-h-screen">
                    {children}
                </main>

            </div>

        </div>

    );
}

export default MainLayout;