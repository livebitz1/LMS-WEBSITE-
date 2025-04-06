import React from 'react';
import { Book } from 'lucide-react';

function CourseDetails({ courseDetail }) {
  if (!courseDetail) {
    return (
      <div className="mt-5 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500 font-medium">Course details not available</p>
      </div>
    );
  }

  const {
    name = '',
    description = '',
    totalChapters = 0,
    chapter = [],
  } = courseDetail;

  return (
    <div className="mt-6 p-6 rounded-xl border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      
      <div className="flex items-center gap-3 mt-3">
        <div className="rounded-full bg-purple-100 p-1.5">
          <Book className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-sm font-medium text-gray-500">{totalChapters} Chapters</h2>
      </div>
      
      <p className="mt-4 text-gray-600 leading-relaxed line-clamp-4">
        {description}
      </p>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          Course Content
          <span className="text-sm font-normal text-gray-500">({chapter?.length || 0} sections)</span>
        </h3>
        
        {chapter && chapter.length > 0 ? (
          <div className="mt-4 space-y-3">
            {chapter.map((chap, index) => (
              <div 
                key={chap?.id || index} 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <h4 className="font-medium text-gray-700">{chap?.name || `Chapter ${index + 1}`}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500 italic">No chapters available</p>
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">Course Details</h3>
        <div className="mt-3 px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            <span className="font-medium">Total Chapters:</span> {totalChapters}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;