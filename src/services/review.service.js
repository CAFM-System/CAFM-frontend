import apiClient from "./apiclient";

const ReviewService = {
  // Fetch all reviews for the logged-in technician
  // Matches the route in server.js: app.use('/api/ticket-reviews', ...)
  async getMyReviews() {
    const response = await apiClient.get("/ticket-reviews/my-reviews");
    return response.data;
  },

  // (Optional) If you need to fetch reviews for a specific ticket later
  async getReviewsByTicketId(ticketId) {
    const response = await apiClient.get(`/ticket-reviews/${ticketId}`);
    return response.data;
  }
};

export default ReviewService;