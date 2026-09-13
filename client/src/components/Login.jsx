import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Login = () => {
    const {
        setShowLogin,
        axios,
        setToken,
    } = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            const { data } = await axios.post(
                `/api/user/${state}`,
                {
                    name,
                    email,
                    password,
                }
            );

            if (data.success) {
                // Save token
                localStorage.setItem("token", data.token);

                // Update app authentication state
                setToken(data.token);

                // Close login modal
                setShowLogin(false);

                toast.success(
                    state === "register"
                        ? "Account created successfully!"
                        : "Welcome back!"
                );

                /*
                 * IMPORTANT:
                 * Do NOT navigate anywhere here.
                 *
                 * The user stays on the current page.
                 * So if they were on:
                 *
                 * /car-details/123
                 *
                 * they will remain on:
                 *
                 * /car-details/123
                 *
                 * and can continue their reservation.
                 */
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowLogin(false)}
            className="
                fixed inset-0
                z-[100]
                flex items-center justify-center
                px-4
                bg-[#102c25]/35
                backdrop-blur-sm
            "
        >

            <motion.form
                initial={{
                    opacity: 0,
                    scale: 0.94,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.35,
                    ease: "easeOut",
                }}
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="
                    relative
                    w-full
                    max-w-[390px]
                    rounded-[26px]
                    bg-white
                    p-7
                    sm:p-9
                    shadow-[0_25px_80px_rgba(0,0,0,0.18)]
                    border border-[#e7e3da]
                    overflow-hidden
                "
            >

                {/* Close Button */}

                <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="
                        absolute
                        top-5 right-5
                        w-8 h-8
                        rounded-full
                        bg-gray-100
                        hover:bg-gray-200
                        text-gray-500
                        flex items-center justify-center
                        transition-all
                        cursor-pointer
                    "
                >
                    ×
                </button>


                {/* Header */}

                <div className="text-center mb-7">

                    <div className="
                        mx-auto
                        w-12 h-12
                        rounded-2xl
                        bg-[#eef5f1]
                        flex items-center justify-center
                        text-emerald-800
                        text-xl
                        mb-4
                    ">
                        ✦
                    </div>

                    <h2 className="
                        text-2xl
                        font-semibold
                        text-[#17211d]
                    ">
                        {state === "login"
                            ? "Welcome back"
                            : "Start your journey"}
                    </h2>

                    <p className="
                        text-gray-400
                        text-sm
                        mt-2
                    ">
                        {state === "login"
                            ? "Sign in to continue your RV adventure."
                            : "Create an account and discover the open road."}
                    </p>

                </div>


                {/* Name */}

                {state === "register" && (
                    <div className="w-full mb-4">

                        <label className="
                            block
                            text-xs
                            font-semibold
                            text-gray-600
                            mb-1.5
                        ">
                            Full Name
                        </label>

                        <input
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            value={name}
                            placeholder="Your name"
                            className="
                                border border-gray-200
                                focus:border-emerald-700
                                focus:ring-2
                                focus:ring-emerald-700/10
                                rounded-xl
                                w-full
                                px-4 py-3
                                text-sm
                                outline-none
                                transition-all
                            "
                            type="text"
                            required
                        />

                    </div>
                )}


                {/* Email */}

                <div className="w-full mb-4">

                    <label className="
                        block
                        text-xs
                        font-semibold
                        text-gray-600
                        mb-1.5
                    ">
                        Email Address
                    </label>

                    <input
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        value={email}
                        placeholder="you@example.com"
                        className="
                            border border-gray-200
                            focus:border-emerald-700
                            focus:ring-2
                            focus:ring-emerald-700/10
                            rounded-xl
                            w-full
                            px-4 py-3
                            text-sm
                            outline-none
                            transition-all
                        "
                        type="email"
                        required
                    />

                </div>


                {/* Password */}

                <div className="w-full mb-5">

                    <label className="
                        block
                        text-xs
                        font-semibold
                        text-gray-600
                        mb-1.5
                    ">
                        Password
                    </label>

                    <input
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        value={password}
                        placeholder="Enter your password"
                        className="
                            border border-gray-200
                            focus:border-emerald-700
                            focus:ring-2
                            focus:ring-emerald-700/10
                            rounded-xl
                            w-full
                            px-4 py-3
                            text-sm
                            outline-none
                            transition-all
                        "
                        type="password"
                        required
                    />

                </div>


                {/* Switch Login / Register */}

                <div className="
                    text-center
                    text-sm
                    text-gray-500
                    mb-6
                ">

                    {state === "register" ? (
                        <>
                            Already have an account?{" "}

                            <button
                                type="button"
                                onClick={() =>
                                    setState("login")
                                }
                                className="
                                    text-emerald-800
                                    font-semibold
                                    hover:text-emerald-600
                                    cursor-pointer
                                "
                            >
                                Sign in
                            </button>
                        </>
                    ) : (
                        <>
                            New to Caravan Rental?{" "}

                            <button
                                type="button"
                                onClick={() =>
                                    setState("register")
                                }
                                className="
                                    text-emerald-800
                                    font-semibold
                                    hover:text-emerald-600
                                    cursor-pointer
                                "
                            >
                                Create account
                            </button>
                        </>
                    )}

                </div>


                {/* Submit Button */}

                <motion.button
                    whileHover={{
                        scale: loading ? 1 : 1.01,
                    }}
                    whileTap={{
                        scale: loading ? 1 : 0.98,
                    }}
                    disabled={loading}
                    type="submit"
                    className={`
                        w-full
                        py-3.5
                        rounded-xl
                        bg-[#123c32]
                        hover:bg-[#0d3028]
                        text-white
                        text-sm
                        font-semibold
                        transition-all
                        shadow-lg
                        shadow-emerald-900/10
                        ${
                            loading
                                ? "opacity-70 cursor-not-allowed"
                                : "cursor-pointer"
                        }
                    `}
                >
                    {loading
                        ? "Please wait..."
                        : state === "register"
                            ? "Create Account"
                            : "Sign In"}
                </motion.button>


                {/* Bottom Note */}

                <p className="
                    text-center
                    text-[10px]
                    text-gray-400
                    mt-5
                ">
                    Your journey starts with a single sign in.
                </p>

            </motion.form>

        </motion.div>
    );
};

export default Login;