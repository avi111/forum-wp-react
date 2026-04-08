import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StudentsArea } from "./StudentsArea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStudentJobs, useStudentPapers } from "../hooks/useAppQueries";

// Mock the hooks
jest.mock("../hooks/useAppQueries");

const mockUseStudentPapers = useStudentPapers as jest.Mock;
const mockUseStudentJobs = useStudentJobs as jest.Mock;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("StudentsArea Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    jest.clearAllMocks();
  });

  test("renders the component with tabs", () => {
    mockUseStudentPapers.mockReturnValue({ isLoading: true });
    mockUseStudentJobs.mockReturnValue({ isLoading: true });

    render(
      <QueryClientProvider client={queryClient}>
        <StudentsArea />
      </QueryClientProvider>,
    );

    expect(screen.getByText("איזור סטודנטים")).toBeInTheDocument();
    expect(screen.getByText("עבודות סטודנטים")).toBeInTheDocument();
    expect(screen.getByText("משרות והזדמנויות")).toBeInTheDocument();
  });

  test("displays loading state for papers", () => {
    mockUseStudentPapers.mockReturnValue({ isLoading: true });
    mockUseStudentJobs.mockReturnValue({
      isLoading: false,
      data: { data: [] },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <StudentsArea />
      </QueryClientProvider>,
    );

    // The lucide-react loader doesn't have a specific text by default, but we check if the papers tab is active.
    expect(screen.getByText("עבודות סטודנטים")).toHaveClass("text-indigo-600");
  });

  test("displays papers when data is available", async () => {
    const mockPapers = [
      {
        id: "1",
        title: "מחקר על פסילוסיבין",
        studentName: "ישראל ישראלי",
        institution: "אוניברסיטת תל אביב",
        degree: "תואר שני",
        year: "2023",
        excerpt: "תקציר המחקר...",
      },
    ];

    mockUseStudentPapers.mockReturnValue({
      isLoading: false,
      data: { data: mockPapers },
    });
    mockUseStudentJobs.mockReturnValue({
      isLoading: false,
      data: { data: [] },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <StudentsArea />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("מחקר על פסילוסיבין")).toBeInTheDocument();
      expect(screen.getByText("ישראל ישראלי")).toBeInTheDocument();
      expect(screen.getByText("אוניברסיטת תל אביב")).toBeInTheDocument();
    });
  });

  test("switches to jobs tab and displays jobs", async () => {
    mockUseStudentPapers.mockReturnValue({
      isLoading: false,
      data: { data: [] },
    });

    const mockJobs = [
      {
        id: "10",
        title: "דרוש/ה עוזר/ת מחקר",
        companyName: "האוניברסיטה העברית",
        jobType: "משרה חלקית",
        location: "ירושלים",
        content: "תיאור המשרה...",
      },
    ];

    mockUseStudentJobs.mockReturnValue({
      isLoading: false,
      data: { data: mockJobs },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <StudentsArea />
      </QueryClientProvider>,
    );

    // Switch to jobs tab
    fireEvent.click(screen.getByText("משרות והזדמנויות"));

    await waitFor(() => {
      expect(screen.getByText("דרוש/ה עוזר/ת מחקר")).toBeInTheDocument();
      expect(screen.getByText("האוניברסיטה העברית")).toBeInTheDocument();
      expect(screen.getByText("משרה חלקית")).toBeInTheDocument();
    });
  });

  test("displays empty state messages", async () => {
    mockUseStudentPapers.mockReturnValue({
      isLoading: false,
      data: { data: [] },
    });
    mockUseStudentJobs.mockReturnValue({
      isLoading: false,
      data: { data: [] },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <StudentsArea />
      </QueryClientProvider>,
    );

    // Papers empty state
    await waitFor(() => {
      expect(
        screen.getByText("אין עבודות סטודנטים להצגה כרגע."),
      ).toBeInTheDocument();
    });

    // Jobs empty state
    fireEvent.click(screen.getByText("משרות והזדמנויות"));
    await waitFor(() => {
      expect(screen.getByText("אין משרות להצגה כרגע.")).toBeInTheDocument();
    });
  });
});
