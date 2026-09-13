import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Sidebar = () => {
    const {
        user,
        axios,
        fetchUser,
        logout,
    } = useAppContext();

    const [image, setImage] = useState("");

    const updateImage = async () => {
        if (!image) return;

        try {
            const formData = new FormData();
            formData.append("image", image);

            const { data } = await axios.post(
                "/api/owner/update-image",
                formData
            );

            if (data.success) {
                await fetchUser();
                toast.success(data.message);
                setImage("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Unable to update image"
            );
        }
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/profile/dashboard",
            icon: "▦",
        },
        {
            name: "Manage Caravans",
            path: "/profile/manage-cars",
            icon: "▣",
        },
        {
            name: "Manage Bookings",
            path: "/profile/manage-bookings",
            icon: "☷",
        },
        {
            name: "My Bookings",
            path: "/profile/my-bookings",
            icon: "▫",
        },
    ];

    return (
        <aside
            className="
                w-[235px]
                shrink-0
                bg-white
                border-r
                border-[#e5e9e6]
                min-h-[calc(100vh-76px)]
                sticky
                top-[76px]
                self-start
                hidden
                md:flex
                flex-col
            "
        >
            {/* ================= PROFILE ================= */}

            <div className="px-5 pt-7 pb-6 border-b border-[#edf0ee]">
                <div className="flex flex-col items-center">

                    <div className="relative">
                        <label
                            htmlFor="sidebar-profile-image"
                            className="group relative block cursor-pointer"
                        >
                            <img
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : user?.image ||
                                          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
                                }
                                alt="Profile"
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    object-cover
                                    ring-4
                                    ring-[#f1f5f2]
                                    shadow-sm
                                "
                            />

                            <input
                                type="file"
                                id="sidebar-profile-image"
                                accept="image/*"
                                hidden
                                onChange={(e) =>
                                    setImage(e.target.files?.[0] || "")
                                }
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    hidden
                                    group-hover:flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-black/35
                                    text-white
                                    text-xs
                                "
                            >
                                Edit
                            </div>
                        </label>

                        {image && (
                            <motion.button
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                type="button"
                                onClick={updateImage}
                                className="
                                    absolute
                                    -right-4
                                    -top-2
                                    px-2.5
                                    py-1.5
                                    rounded-full
                                    bg-[#123c32]
                                    text-white
                                    text-[10px]
                                    font-medium
                                    shadow-md
                                "
                            >
                                Save
                            </motion.button>
                        )}
                    </div>

                    <p
                        className="
                            mt-4
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-400
                            font-semibold
                        "
                    >
                        Account
                    </p>

                    <p
                        className="
                            mt-1
                            text-sm
                            font-semibold
                            text-[#123c32]
                            max-w-[180px]
                            truncate
                        "
                    >
                        {user?.name || "User"}
                    </p>

                </div>
            </div>

            {/* ================= NAVIGATION ================= */}

            <nav className="px-3 py-5 flex-1">
                <div className="space-y-1">

                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                relative
                                flex
                                items-center
                                gap-3
                                w-full
                                px-4
                                py-3.5
                                rounded-xl
                                transition-all
                                duration-200
                                ${
                                    isActive
                                        ? "bg-[#123c32] text-white"
                                        : "text-[#68746e] hover:bg-[#f1f5f2] hover:text-[#123c32]"
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span
                                        className={`
                                            w-6
                                            h-6
                                            flex
                                            items-center
                                            justify-center
                                            rounded-md
                                            text-sm
                                            ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-[#7b8681]"
                                            }
                                        `}
                                    >
                                        {item.icon}
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        {item.name}
                                    </span>

                                    {isActive && (
                                        <span
                                            className="
                                                absolute
                                                right-0
                                                top-1/2
                                                -translate-y-1/2
                                                w-1
                                                h-8
                                                rounded-l-full
                                                bg-[#c6a15b]
                                            "
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}

                </div>
            </nav>

            {/* ================= LOGOUT ================= */}

            <div className="px-3 pb-5">

                <div className="border-t border-[#edf0ee] pt-4">

                    <button
                        type="button"
                        onClick={logout}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3.5
                            rounded-xl
                            text-[#e45b5b]
                            hover:bg-[#fff4f4]
                            transition-all
                        "
                    >
                        <span
                            className="
                                w-6
                                h-6
                                flex
                                items-center
                                justify-center
                                text-sm
                            "
                        >
                            ↪
                        </span>

                        <span className="text-sm font-medium">
                            Logout
                        </span>
                    </button>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;