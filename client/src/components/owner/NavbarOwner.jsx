import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'motion/react'

const NavbarOwner = () => {

    const { user } = useAppContext()

    return (
        <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
                flex
                items-center
                justify-between
                px-6
                md:px-10
                lg:px-14
                py-4
                bg-white
                border-b
                border-gray-200
                relative
                z-50
            "
        >

            {/* Logo */}
            <Link to="/">
                <motion.img
                    whileHover={{ scale: 1.04 }}
                    src={assets.logo}
                    alt="Caravan Rental"
                    className="h-8 md:h-9"
                />
            </Link>


            {/* Owner Profile */}
            <div className="
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-full
                bg-[#f2f6f3]
                border
                border-[#dce8e2]
            ">

                {/* Avatar */}
                <div className="
                    w-9
                    h-9
                    rounded-full
                    bg-[#123c32]
                    flex
                    items-center
                    justify-center
                    text-white
                    text-sm
                    font-semibold
                    shrink-0
                ">
                    {user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : 'O'}
                </div>


                {/* Name */}
                <div className="hidden sm:block pr-2">

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.12em]
                        text-gray-400
                        font-semibold
                    ">
                        Owner
                    </p>

                    <p className="
                        text-sm
                        font-semibold
                        text-[#123c32]
                        max-w-[150px]
                        truncate
                    ">
                        {user?.name || 'Owner'}
                    </p>

                </div>

            </div>

        </motion.nav>
    )
}

export default NavbarOwner