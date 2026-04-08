import { useCallback } from 'react';

// Mock data (can be empty or simple for initial setup)
const MOCK_STUDENT_PAPERS: any[] = [];
const MOCK_STUDENT_JOBS: any[] = [];

export const useAPI = () => {
  const fetchStudentPapers = useCallback(async () => {
    return { data: MOCK_STUDENT_PAPERS, total: MOCK_STUDENT_PAPERS.length };
  }, []);

  const fetchStudentJobs = useCallback(async () => {
    return { data: MOCK_STUDENT_JOBS, total: MOCK_STUDENT_JOBS.length };
  }, []);

  // Return other API functions as mocks if needed by other tests
  return {
    fetchStudentPapers,
    fetchStudentJobs,
    // Add other mocked functions here if necessary
    post: jest.fn(), // Mock the post function if it's used directly
    submitJoinForm: jest.fn(),
    sendContactForm7: jest.fn(),
    subscribeToNewsletter: jest.fn(),
    fetchCurrentUser: jest.fn(),
    fetchSettings: jest.fn(),
    fetchTemplate: jest.fn(),
    fetchResearchers: jest.fn(),
    fetchArticles: jest.fn(),
    fetchArticlesPaged: jest.fn(),
    fetchTags: jest.fn(),
    fetchNews: jest.fn(),
    fetchEvents: jest.fn(),
    fetchMeetings: jest.fn(),
    fetchTrainings: jest.fn(),
    sendContactMessage: jest.fn(),
    fetchQuestionnairesByAuthor: jest.fn(),
  };
};

// Also mock getAdminAjaxUrl and getRestUrl if they are imported directly
export const getAdminAjaxUrl = jest.fn(() => 'http://mock-admin-ajax.url');
export const getRestUrl = jest.fn(() => 'http://mock-rest.url');

// Mock the isStorybook variable if it's imported directly
export const isStorybook = false;
