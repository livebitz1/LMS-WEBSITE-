"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';  // Import Clerk's useUser hook
import CategoryFilter from './_components/CategoryFilter';
import { getCourseList } from './../../../_services/index';
import CourseList from './_components/CourseList';

const Browse = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { user, isLoaded, isSignedIn } = useUser(); // Get user state from Clerk

  useEffect(() => {
    if (isSignedIn) {
      getCourses(); // Fetch courses if user is signed in
    }
  }, [isSignedIn]);

  // Add new useEffect for filtering
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => 
        course.tag?.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredCourses(filtered);
    }
  }, [activeFilter, courses]);

  const getCourses = () => {
    getCourseList().then(resp => {
      console.log(resp);
      setCourses(resp.courseLists);
      setFilteredCourses(resp.courseLists); // Set initial filtered courses
    });
  };

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  if (!isLoaded) {
    // You can show a loading spinner or nothing while Clerk is loading the user state
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  if (!isSignedIn) {
    // If user is not signed in, show a message prompting login
    return <div className="text-center p-8">Please log in to access the courses.</div>;
  }

  // If signed in, render the Browse page content
  return (
    <div className="p-5">
      <CategoryFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      {filteredCourses.length > 0 ? (
        <CourseList courses={filteredCourses} />
      ) : (
        <div className="text-center p-8 text-gray-500">
          No courses found for this category.
        </div>
      )}
    </div>
  );
};

export default Browse;
