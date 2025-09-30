import { mockDashboardRequestsData } from "@/data/dashboardRequestsData";

/**
 * Generates the next available request ID by finding the highest numbered REQ_XXX
 * and incrementing it by 1
 */
export const generateNextRequestId = (): string => {
  // Extract all numeric parts from request IDs
  const existingNumbers = mockDashboardRequestsData
    .map(request => {
      const match = request.requestId.match(/REQ_(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(num => !isNaN(num));

  // Find the highest number and add 1
  const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
  const nextNumber = maxNumber + 1;

  // Format with zero padding to maintain consistent format
  return `REQ_${nextNumber.toString().padStart(3, '0')}`;
};