"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct for App Router
import { getCourseById } from "../../../../_services";
import VideoPlayer from "./_components/VideoPlayer";

import CourseDetails from "./_components/CourseDetails";
import EnrollmentSection from "./_components/EnrollmentSection";
import { useUser } from "@clerk/nextjs";

function CoursePreview() {
  const [courseDetail, setCourseDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);          // Add error state
  const { user } = useUser();
  const { courseId } = useParams(); // ✅ Correct way to get params in App Router

  useEffect(() => {
    if (!courseId || !user) {
      setIsLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getCourseById(
          courseId,
          user.primaryEmailAddress?.emailAddress
        );
        
        if (response?.courseList) {
          setCourseDetail(response.courseList);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        console.error('Detailed error:', err);
        setError('Failed to load course details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, user]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Loading course details...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-5">{error}</div>;
  }

  return courseDetail?.name&&(
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-2">
          {courseDetail? (
            <VideoPlayer videoUrl={courseDetail?.chapter?.video.url} />
          ) : (
            <div className="text-center p-4 bg-gray-100 rounded">
              No video content available
            </div>
          )}
          {courseDetail && <CourseDetails courseDetail={courseDetail} />}
        </div>
        <div className="mt-5">
          <EnrollmentSection courseDetail={courseDetail} />
        </div>
      </div>
    </div>
  );
}

export default CoursePreview;
