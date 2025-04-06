import { gql, request } from "graphql-request";

// Define the base URL using the Hygraph endpoint and the API key from environment variables.
const MASTER_URL = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_KEY}/master`;

// Function to fetch the course list
export const getCourseList = async () => {
  const query = gql`
    query CourseList {
      courseLists {
        name
        banner {
          url
        }
        free
        id
        author
        totalChapters
        tag
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
};

// Function to fetch a course by its ID
export const getCourseById = async (id , userEmail) => {
  if (!id) throw new Error('Course ID is required');

  const query = gql`
    query GetCourse($id: ID!) {
      courseList(where: { id: $id }) {
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
            
          }
        }
            lecture1 {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
            lecture2 {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
            lecture3 {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
        description
        name
        id
        free
        author
        totalChapters
        youtubeUrl
      }
  userEnrollCourses(where: { 
    courseId: "`+id+`", 
    userEmail: "`+userEmail+`"
  }) {
    courseId
    userEmail
    completedChapter
  }


    }
  `;

  try {
    const result = await request(MASTER_URL, query, { id  , userEmail});
    return result;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

// Function to enroll in a course
export const EnrollCourse = async (courseId, userEmail) => {
  if (!courseId || !userEmail) {
    throw new Error('Course ID and user email are required');
  }
  const mutationQuery = gql`
    mutation EnrollCourse($courseId: String!, $userEmail: String!) {
      createUserEnrollCourse(data: {
        userEmail: $userEmail,
        courseId: $courseId
      }) {
        id
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery, { courseId, userEmail });
    return result;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};



