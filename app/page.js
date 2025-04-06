"use client"

import Image from "next/image"
import Link from "next/link"
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs"
import { BookOpen, Users, Award, ArrowRight, Play, BarChart3, Calendar, CheckCircle2, ChevronRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function Home() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()

  const isHomePage = pathname === "/"

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                EduFlow
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Courses
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Paths
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Community
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Login</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button onClick={() => signOut()} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Sign Out
                </button>
                <UserButton afterSignOutUrl="/" className="h-10 w-10" />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="inline-flex bg-purple-900/50 text-purple-200 px-3 py-1 text-sm font-medium rounded-full">
                Learning Reimagined
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Elevate Your Skills with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  EduFlow
                </span>{" "}
                LMS
              </h1>

              <p className="text-lg text-gray-300 max-w-xl">
                Learn at your own pace, track your progress, and level up your skills with interactive courses and
                personalized learning paths.
              </p>

              <div className="flex flex-wrap gap-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/browse">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                </SignedIn>

                <button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center"
                    >
                      <span className="text-xs">{i}</span>
                    </div>
                  ))}
                </div>
                <p>Joined by 10,000+ learners worldwide</p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Learning Platform Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl p-4 w-48 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="text-purple-400 h-5 w-5" />
                  <span className="text-sm font-medium">Your Progress</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[65%]" />
                </div>
                <div className="mt-2 text-xs text-gray-400">65% completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, value: "500+", label: "Courses" },
              { icon: Users, value: "50,000+", label: "Students" },
              { icon: Award, value: "99%", label: "Satisfaction" },
              { icon: Calendar, value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/30 text-purple-400 mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-gray-400">Expand your knowledge with our top-rated courses</p>
            </div>
            <button className="text-purple-400 flex items-center hover:underline">
              View all courses
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Web Development Masterclass",
                category: "Development",
                level: "Intermediate",
                lessons: 42,
                duration: "12 hours",
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "Data Science Fundamentals",
                category: "Data",
                level: "Beginner",
                lessons: 36,
                duration: "10 hours",
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "UX/UI Design Principles",
                category: "Design",
                level: "All Levels",
                lessons: 24,
                duration: "8 hours",
                image: "/placeholder.svg?height=400&width=600",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400 border border-gray-700 px-2 py-0.5 rounded-full">
                      {course.level}
                    </span>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons} lessons
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-400">{course.duration}</div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">Learn more</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-4 bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
              Platform Features
            </span>
            <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-gray-400">
              Our platform is designed to provide you with the best learning experience possible
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Interactive Courses",
                description: "Engage with interactive content that makes learning enjoyable and effective",
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description: "Monitor your progress with detailed analytics and personalized insights",
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Connect with fellow learners and instructors for guidance and collaboration",
              },
              {
                icon: Calendar,
                title: "Flexible Schedule",
                description: "Learn at your own pace with on-demand access to all course materials",
              },
              {
                icon: CheckCircle2,
                title: "Verified Certificates",
                description: "Earn industry-recognized certificates upon course completion",
              },
              {
                icon: Award,
                title: "Expert Instructors",
                description: "Learn from industry professionals with real-world experience",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300 p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-4 bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold mb-4">What our students say</h2>
            <p className="text-gray-400">Hear from our community of learners about their experience with EduFlow</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 text-5xl text-purple-500 opacity-30">"</div>
                <div className="mb-6">
                  <p className="text-gray-300 relative z-10">
                    EduFlow has completely transformed my learning journey. The courses are well-structured, and the
                    interactive elements keep me engaged throughout. I've gained valuable skills that have directly
                    impacted my career.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 overflow-hidden relative">
                    <Image src={`/placeholder.svg?height=100&width=100`} alt="Student" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Student Name</div>
                    <div className="text-sm text-gray-400">Web Development Student</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your learning journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already advancing their careers with EduFlow
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold">
                  Get Started Free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="bg-transparent border border-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/browse">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold">
                  Explore Courses
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Learning Paths
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    For Teams
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                EduFlow
              </div>
            </div>
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} EduFlow LMS. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

