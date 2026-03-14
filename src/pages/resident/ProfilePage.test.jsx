import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserProfileCard from "./ProfilePage";

const mockGetProfile = vi.fn();
const mockUpdateProfile = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../components/resident/Footer", () => ({
  default: () => <div data-testid="resident-footer" />,
}));

vi.mock("../resident/ProfileCard", () => ({
  default: ({ heading, data }) => (
    <div>
      <span>{heading}</span>
      <span>{data}</span>
    </div>
  ),
}));

vi.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    isDarkMode: false,
    bg: "bg-primary",
    cardBg: "bg-white",
    text: "text-secondary",
    subText: "text-gray-500",
    inputBg: "bg-white border-gray-300 text-secondary",
    modalBg: "bg-white",
    buttonSecondary: "bg-gray-100 text-secondary border-gray-200",
  }),
}));

vi.mock("../../services/residentProfile.service", () => ({
  default: {
    getProfile: (...args) => mockGetProfile(...args),
    updateProfile: (...args) => mockUpdateProfile(...args),
  },
}));

const baseProfile = {
  first_name: "Jane",
  last_name: "Resident",
  date_of_birth: "1990-02-03",
  gender: "male",
  marital_status: "single",
  phone: "0771234567",
  apartment_no: "A-12",
  resident_count: 2,
  email: "jane@example.com",
  nic_passport: "991234567V",
};

const enterEditMode = async () => {
  render(<UserProfileCard />);

  fireEvent.click(await screen.findByRole("button", { name: /edit profile/i }));
  fireEvent.click(screen.getByRole("button", { name: /yes, edit/i }));
};

describe("Resident profile page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetProfile.mockResolvedValue({ data: { profile: baseProfile } });
    mockUpdateProfile.mockResolvedValue({ data: { profile: baseProfile } });
  });

  it("sends normalized values and omits blank optional fields", async () => {
    await enterEditMode();

    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: "female" },
    });
    fireEvent.change(screen.getByLabelText(/marital status/i), {
      target: { value: "widowed" },
    });
    fireEvent.change(screen.getByLabelText(/no. of residents/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        first_name: "Jane",
        last_name: "Resident",
        phone: "0771234567",
        gender: "female",
        marital_status: "widowed",
        apartment_no: "A-12",
      });
    });
  });

  it("shows the first backend validation error message", async () => {
    mockUpdateProfile.mockRejectedValue({
      response: {
        data: {
          errors: [{ msg: "Invalid marital status" }],
        },
      },
    });

    await enterEditMode();

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText("Invalid marital status")).toBeTruthy();
  });
});
