import {mockZipData} from "@/constants/zipCodes"
export async function fetchZipCodes(query) {
    this.loading = true;
    try {
      // Filter mock data based on query
      this.zips = mockZipData.filter(zip =>
        zip.zip.includes(query) || zip.city.toLowerCase().includes(query.toLowerCase())
      );
      this.loading = false;
    } catch (error) {
      console.error('Error fetching zip codes:', error);
      this.errors = 'Failed to fetch zip codes.';
      this.loading = false;
    }
  }