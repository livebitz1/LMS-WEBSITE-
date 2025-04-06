"use client";

import { PlayCircle, CheckCircle } from "lucide-react";
import { useEffect } from "react";

function ChapterNav({ course, activeChapter, completedChapters = [], onChapterSelect }) {
  useEffect(() => {
    console.log("Received Course Data:", course);
  }, [course]);

  // Function to organize chapters and lectures properly
  const getAllChapters = (courseData) => {
    if (!courseData) return [];

    // Dynamically find all chapter and lecture keys
    const chapterKeys = Object.keys(courseData).filter((key) => key === "chapter" || key.startsWith("lecture"));

    return chapterKeys
      .map((key) => {
        const chapters = courseData[key];
        const chapterArray = Array.isArray(chapters) ? chapters : chapters ? [chapters] : [];
        const validChapters = chapterArray.filter(Boolean);

        if (validChapters.length === 0) return null;

        return {
          name: key === "chapter" ? "Main Chapters" : `Lecture ${key.replace("lecture", "")}`,
          chapters: validChapters,
        };
      })
      .filter(Boolean);
  };

  const allSections = getAllChapters(course);

  return (
    <div className="border-b border-gray-300 p-4">
      <h2 className="text-lg font-semibold mb-2">{course?.name || "No Course Name"}</h2>
      <h2 className="text-gray-500 text-sm mb-4">{course?.author || "Unknown Author"}</h2>

      <div className="mt-4">
        {allSections.length > 0 ? (
          allSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <h3 className="text-md font-bold mb-2">{section.name}</h3>
              <ul>
                {section.chapters.map((chapter, chapterIndex) => {
                  const isCompleted = completedChapters.includes(chapter?.id);
                  const isActive = activeChapter === chapter?.id;

                  return (
                    <li
                      key={chapter?.id || chapterIndex}
                      onClick={() => onChapterSelect(chapter)}
                      className={`flex items-center gap-3 text-md p-2 rounded-lg cursor-pointer transition 
                        ${isActive ? "bg-green-100 text-green-600" : "text-gray-700 hover:bg-gray-100"}
                        ${isCompleted ? "border-l-4 border-green-500" : ""}`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <PlayCircle size={20} color={isActive ? "#007B55" : "#6B46C1"} />
                      )}
                      <span>{chapter?.name || "No Chapter Name"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm p-2">No chapters available</p>
        )}
      </div>
    </div>
  );
}

export default ChapterNav;

