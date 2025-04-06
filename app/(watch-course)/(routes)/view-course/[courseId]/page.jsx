"use client";
import React, { useEffect, useState } from "react";
import ChapterNav from "./_components/ChapterNav";
import FullVideoPlayer from "./_components/FullVideoPlayer";
import { useUser } from "@clerk/nextjs";
import { getCourseById } from "../../../../_services";

function ViewCourse({ params: paramsPromise }) {
  const { user } = useUser();
  const [params, setParams] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [userCourse, setUserCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    }
    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (user && params?.courseId) {
      getCourse(params.courseId);
    }
  }, [user, params]);

  const getCourse = async (courseId) => {
    try {
      const response = await getCourseById(
        courseId,
        user?.primaryEmailAddress?.emailAddress
      );

      if (response?.courseList) {
        const processedCourseData = {
          ...response.courseList
        };

        Object.keys(response.courseList).forEach(key => {
          if (key === 'chapter' || key.startsWith('lecture')) {
            const data = response.courseList[key];
            processedCourseData[key] = Array.isArray(data) ? data : data ? [data] : [];
          }
        });

        setCourseData(processedCourseData);
        setUserCourse(response.userEnrollCourses);

        // Set the first available chapter as selected
        const firstChapter = Object.values(processedCourseData)
          .flat()
          .find(chapter => chapter?.video?.url);
        setSelectedChapter(firstChapter);

        // Calculate initial course progress
        calculateCourseProgress(processedCourseData, response.userEnrollCourses);
      } else {
        setError("Course not found");
      }
    } catch (err) {
      console.error("Error fetching course:", err);
      setError("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const calculateCourseProgress = (courseData, userCourseData) => {
    if (!userCourseData?.completedChapter) {
      setCourseProgress(0);
      return;
    }

    const completedChapters = new Set(userCourseData.completedChapter);
    const allChapters = Object.values(courseData)
      .flat()
      .filter(chapter => chapter?.video?.url);

    const progress = (completedChapters.size / allChapters.length) * 100;
    setCourseProgress(Math.round(progress));
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleVideoComplete = async (chapter) => {
    if (!user || !chapter?.id) return;

    try {
      // Here you would typically make an API call to mark the chapter as completed
      // For now, we'll just update the local state
      const updatedUserCourse = {
        ...userCourse,
        completedChapter: [...(userCourse?.completedChapter || []), chapter.id]
      };
      setUserCourse(updatedUserCourse);
      calculateCourseProgress(courseData, updatedUserCourse);
    } catch (error) {
      console.error("Error marking chapter as completed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">No course data available</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-72 border-r shadow-sm">
        <ChapterNav 
          course={courseData} 
          onChapterSelect={handleChapterSelect}
          userCourse={userCourse}
        />
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{courseData.name}</h1>
              <p className="text-gray-600 mt-1">{courseData.author}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Course Progress</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${courseProgress}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1">{courseProgress}% Complete</div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{courseData.description}</p>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FullVideoPlayer 
              chapter={selectedChapter} 
              onVideoComplete={handleVideoComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
