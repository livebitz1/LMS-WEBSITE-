"use client"
import { motion } from "framer-motion"

function CategoryFilter({ activeFilter, onFilterChange }) {
  const filterOptions = [
    {
      id: 1,
      name: "All",
      value: "all",
    },
    {
      id: 2,
      name: "React Js",
      value: "react",
    },
    {
      id: 3,
      name: "Next Js",
      value: "nextjs",
    },
    {
      id: 4,
      name: "Tailwind Css",
      value: "tailwindcss",
    },
    {
      id: 5,
      name: "Firebase",
      value: "firebase",
    },
  ]

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-3 md:gap-4 py-2 max-w-full overflow-x-auto hide-scrollbar">
        {filterOptions.map((item, index) => {
          const isActive = activeFilter === item.value
          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.value)}
              className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "text-purple-800 bg-purple-50 border-transparent shadow-sm"
                    : "text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50"
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:ring-offset-1`}
            >
              {isActive && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 bg-purple-100 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{item.name}</span>
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter

