"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { EnrollCourse } from "../../../../../_services";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function EnrollmentSection({ courseDetail }) {
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();

  // State to manage loading, success, and error messages
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (courseDetail?.userEnrollCourses?.length > 0) {
      setIsEnrolled(true);
    }
  }, [courseDetail]);

  const enrollCourse = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (isEnrolled) {
      router.push(`/view-course/${courseDetail.id}`);
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);
      setError("");

      const response = await EnrollCourse(
        courseDetail.id,
        user.primaryEmailAddress?.emailAddress
      );

      console.log("EnrollCourse Response =>", response);
      setSuccess(true);
      
      // Redirect user to the course page after successful enrollment
      router.push(`/view-course/${courseDetail.id}`);
    } catch (err) {
      console.error("Enrollment failed:", err);
      setError("Failed to enroll in the course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="mt-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-700">Course Enrollment</h2>
        <p className="text-sm text-gray-500">
          Gain access to all course materials and resources
        </p>
      </div>

      <div className="p-4">
        {!userLoaded ? (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="h-5 w-5 text-purple-500 animate-spin mr-2" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-green-800 font-medium">Successfully enrolled!</h3>
                  <p className="text-green-700 text-sm">
                    You now have access to this course.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-800 font-medium">Enrollment failed</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Course Price:</span>
                <span className="text-purple-700 font-bold">
                  {courseDetail?.free ? 'Free' : '₹800'}
                </span>
              </div>

              <div className="text-xs text-gray-500 mb-2">
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span>24/7 support</span>
                  </li>
                </ul>
              </div>

              <button
                className={`p-3 w-full rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center
                  ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"}`}
                onClick={enrollCourse}
                disabled={loading}
                aria-label={isEnrolled ? "View Course" : "Enroll in course"}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Enrolling...
                  </>
                ) : (
                  <span>
                    {isEnrolled ? "View Course" : `Enroll Now - ${courseDetail?.free ? 'Free' : '₹800'}`}
                  </span>
                )}
              </button>

              {!user && (
                <p className="text-xs text-center text-gray-500 mt-2">
                  You need to be logged in to enroll in this course
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="p-3 bg-gray-50 rounded-b-lg border-t text-xs text-center text-gray-500">
        Secure payment • Money back guarantee • Instant access
      </div>
    </div>
  );
}

export default EnrollmentSection;
