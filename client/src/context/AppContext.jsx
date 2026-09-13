import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();

    const currency = import.meta.env.VITE_CURRENCY;

    // =========================================================
    // AUTH TOKEN
    // =========================================================
    // Read token immediately on first render.
    // This prevents login popup from appearing briefly on refresh.

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            axios.defaults.headers.common["Authorization"] = storedToken;
        }

        return storedToken;
    });

    const [user, setUser] = useState(null);

    const [isOwner, setIsOwner] = useState(false);

    const [showLogin, setShowLogin] = useState(false);

    const [pickupDate, setPickupDate] = useState("");

    const [returnDate, setReturnDate] = useState("");

    // All publicly available caravans / RVs
    const [cars, setCars] = useState([]);

    // RVs listed by currently logged-in user
    const [myCars, setMyCars] = useState([]);

    const [loadingUser, setLoadingUser] = useState(
        () => Boolean(localStorage.getItem("token"))
    );

    const [loadingMyCars, setLoadingMyCars] = useState(false);


    // =========================================================
    // FETCH LOGGED-IN USER
    // =========================================================

    const fetchUser = async () => {

        try {

            setLoadingUser(true);

            const { data } = await axios.get("/api/user/data");

            if (data.success) {

                setUser(data.user);

                setIsOwner(data.user.role === "owner");

            } else {

                setUser(null);
                setIsOwner(false);

            }

        } catch (error) {

            console.log(
                "User fetch error:",
                error.response?.data?.message || error.message
            );

            setUser(null);
            setIsOwner(false);

        } finally {

            setLoadingUser(false);

        }
    };


    // =========================================================
    // FETCH ALL PUBLIC CARAVANS / RVs
    // =========================================================

    const fetchCars = async () => {

        try {

            const { data } = await axios.get("/api/user/cars");

            if (data.success) {

                setCars(data.cars || []);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            console.log(
                "Cars fetch error:",
                error.response?.data?.message || error.message
            );

        }

    };


    // =========================================================
    // FETCH CURRENT USER'S OWN RVs
    // =========================================================

    const fetchMyCars = async () => {

        if (!token) {

            setMyCars([]);

            return;

        }

        try {

            setLoadingMyCars(true);

            const { data } = await axios.get("/api/owner/cars");

            if (data.success) {

                setMyCars(data.cars || []);

            } else {

                setMyCars([]);

            }

        } catch (error) {

            console.log(
                "My RV fetch error:",
                error.response?.data?.message || error.message
            );

            setMyCars([]);

        } finally {

            setLoadingMyCars(false);

        }

    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {

        localStorage.removeItem("token");

        delete axios.defaults.headers.common["Authorization"];

        setToken(null);

        setUser(null);

        setMyCars([]);

        setIsOwner(false);

        setShowLogin(false);

        navigate("/");

        toast.success("You have been logged out");

    };


    // =========================================================
    // FETCH PUBLIC DATA ON APP START
    // =========================================================

    useEffect(() => {

        fetchCars();

    }, []);


    // =========================================================
    // WHEN TOKEN CHANGES
    // =========================================================

    useEffect(() => {

        if (token) {

            // Make sure every future request has the token
            axios.defaults.headers.common["Authorization"] = token;

            // Save token
            localStorage.setItem("token", token);

            // Fetch logged-in user
            fetchUser();

            // Fetch user's own RVs
            fetchMyCars();

        } else {

            delete axios.defaults.headers.common["Authorization"];

            localStorage.removeItem("token");

            setUser(null);

            setMyCars([]);

            setIsOwner(false);

            setLoadingUser(false);

        }

    }, [token]);


    // =========================================================
    // CONTEXT VALUE
    // =========================================================

    const value = {

        navigate,

        currency,

        axios,


        // Authentication
        token,
        setToken,

        user,
        setUser,

        loadingUser,


        // Owner
        isOwner,
        setIsOwner,


        // User
        fetchUser,


        // Login modal
        showLogin,
        setShowLogin,


        // Logout
        logout,


        // Public caravans
        cars,
        setCars,
        fetchCars,


        // Current user's caravans
        myCars,
        setMyCars,
        fetchMyCars,
        loadingMyCars,


        // Booking dates
        pickupDate,
        setPickupDate,

        returnDate,
        setReturnDate,

    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};


export const useAppContext = () => {
    return useContext(AppContext);
};