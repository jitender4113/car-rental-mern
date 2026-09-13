// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import NavbarOwner from "../../components/owner/NavbarOwner";
// import Sidebar from "../../components/owner/Sidebar";
// import { useAppContext } from "../../context/AppContext";

// const Layout = () => {

//     const navigate = useNavigate();

//     const {
//         token,
//         loadingUser,
//         user,
//     } = useAppContext();


//     // User is not logged in

//     if (!loadingUser && !token) {
//         navigate("/");
//         return null;
//     }


//     // Wait for user data

//     if (loadingUser || !user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#fafbf9]">

//                 <div className="flex items-center gap-3 text-[#123c32]">

//                     <span className="w-5 h-5 border-2 border-[#123c32] border-t-transparent rounded-full animate-spin" />

//                     <span className="text-sm font-medium">
//                         Loading...
//                     </span>

//                 </div>

//             </div>
//         );
//     }


//     return (
//         <div className="min-h-screen bg-[#fafbf9]">

//             <NavbarOwner />

//             <div className="flex">

//                 <Sidebar />

//                 <main className="flex-1 min-w-0">

//                     <Outlet />

//                 </main>

//             </div>

//         </div>
//     );
// };

// export default Layout;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
    const location = useLocation();
    const { token, loadingUser, user } = useAppContext();

    const isAddCarPage = location.pathname === "/owner/add-car";

    if (!loadingUser && !token) {
        return <Navigate to="/" replace />;
    }

    if (loadingUser || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafbf9]">
                <div className="flex items-center gap-3 text-[#123c32]">
                    <span className="w-5 h-5 border-2 border-[#123c32] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafbf9]">

            {/* Owner header only on dashboard/manage pages */}
            {!isAddCarPage && <NavbarOwner />}

            <div className="flex">

                {/* Sidebar hidden on Add RV */}
                {!isAddCarPage && <Sidebar />}

                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default Layout;