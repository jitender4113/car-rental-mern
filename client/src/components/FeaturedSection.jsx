// import React from 'react'
// import Title from './Title'
// import { assets } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import { motion } from 'motion/react'

// const FeaturedSection = () => {

//     const navigate = useNavigate()
//     const {cars} = useAppContext()

//   return (
//     <motion.div 
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 1, ease: "easeOut" }}
//     className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>

//         <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.5 }}
//         >
//             <Title title='Featured Vehicles' subTitle='Explore our selection of premium vehicles available for your next adventure.'/>
//         </motion.div>

//         <motion.div 
//         initial={{ opacity: 0, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 1 }}
//         className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
//         {
//             cars.slice(0,6).map((car)=> (
//                 <motion.div key={car._id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, ease: "easeOut"  }}
//                 >
//                     <CarCard car={car}/>
//                 </motion.div>
//             ))
//         }
//         </motion.div>

//         <motion.button 
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.4 }}
//         onClick={()=> {
//             navigate('/cars'); scrollTo(0,0)
//         }}
//          className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
//             Explore all cars <img src={assets.arrow_icon} alt="arrow" />
//         </motion.button>
      
//     </motion.div>
//   )
// }

// export default FeaturedSection
import React from 'react'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const FeaturedSection = () => {

    const navigate = useNavigate()
    const { cars } = useAppContext()

    return (
        <section className="bg-[#f8faf8] py-20 md:py-24 px-5 md:px-10 lg:px-16 xl:px-24">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-end justify-between gap-5 mb-10"
                >

                    <div>
                        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
                            Handpicked for your next journey
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Featured Caravans/RVs
                        </h2>

                        <p className="text-gray-500 mt-3 max-w-xl">
                            Discover comfortable, adventure-ready caravans and RVs
                            for your next road trip.
                        </p>
                    </div>


                    {/* View all */}
                    <button
                        onClick={() => {
                            navigate('/cars')
                            scrollTo(0, 0)
                        }}
                        className="
                            hidden
                            md:flex
                            items-center
                            gap-2
                            text-primary
                            font-semibold
                            whitespace-nowrap
                            hover:gap-3
                            transition-all
                            cursor-pointer
                        "
                    >
                        View all RVs

                        <img
                            src={assets.arrow_icon}
                            alt="arrow"
                            className="w-4"
                        />
                    </button>

                </motion.div>


                {/* RV Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        gap-5
                    "
                >

                    {cars.slice(0, 8).map((car, index) => (

                        <motion.div
                            key={car._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.08
                            }}
                        >
                            <CarCard car={car} />
                        </motion.div>

                    ))}

                </motion.div>


                {/* Mobile View All */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center mt-10 md:hidden"
                >
                    <button
                        onClick={() => {
                            navigate('/cars')
                            scrollTo(0, 0)
                        }}
                        className="
                            flex
                            items-center
                            gap-2
                            px-6
                            py-3
                            border
                            border-primary
                            text-primary
                            font-semibold
                            rounded-full
                            hover:bg-primary
                            hover:text-white
                            transition
                            cursor-pointer
                        "
                    >
                        View all RVs

                        <img
                            src={assets.arrow_icon}
                            alt="arrow"
                            className="w-4"
                        />
                    </button>
                </motion.div>

            </div>

        </section>
    )
}

export default FeaturedSection