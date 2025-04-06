import Image from "next/image"
import { Book, Star } from "lucide-react"
import Link from "next/link"

function CourseList({ courses }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {courses.map((course, index) => (
        <Link key={index} href={"/course-preview/" + course.id}>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-600 hover:scale-[1.02] bg-white">
            <div className="relative">
              <Image
                src={course.banner.url || "/placeholder.svg"}
                alt={course.name}
                width={1000}
                height={500}
                className="aspect-video object-cover w-full"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                {course.free ? "Free" : "Premium"}
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-1 text-gray-800">{course.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm text-gray-500">By</span>
                <h2 className="text-sm font-medium text-purple-700">{course.author}</h2>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <Book className="h-5 w-5 text-purple-600 rounded-full bg-purple-100 p-0.5" />
                  <h2 className="text-xs font-medium text-gray-600">{course.totalChapters} Chapters</h2>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-gray-700">{(4 + (index % 1.5)).toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className={`text-sm font-semibold ${course.free ? "text-green-600" : "text-purple-700"}`}>
                  {course.free ? "Free Access" : "Premium"}
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                  {["Beginner", "Intermediate", "Advanced"][index % 3]}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CourseList

