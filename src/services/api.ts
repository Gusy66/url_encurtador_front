import { Link, CreateLinkRequest, CreateLinkResponse, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async createLink(data: CreateLinkRequest): Promise<CreateLinkResponse> {
    return this.request<CreateLinkResponse>('/links', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLinks(): Promise<{ data: Link[]; nextCursor: string | null }> {
    return this.request<{ data: Link[]; nextCursor: string | null }>('/links');
  }

  async deleteLink(id: string): Promise<void> {
    console.log('Deletando link com ID:', id);
    return this.request<void>(`/links/${id}`, {
      method: 'DELETE',
    });
  }

  async getOriginalUrl(slug: string): Promise<{ originalUrl: string }> {
    return this.request<{ originalUrl: string }>(`/links/${slug}/original`);
  }

  async downloadCSV(): Promise<{ key: string; url: string; fallback?: boolean }> {
    return this.request<{ key: string; url: string; fallback?: boolean }>('/exports/links', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }
}

export const apiService = new ApiService();

// Bind methods to preserve 'this' context
apiService.createLink = apiService.createLink.bind(apiService);
apiService.getLinks = apiService.getLinks.bind(apiService);
apiService.deleteLink = apiService.deleteLink.bind(apiService);
apiService.getOriginalUrl = apiService.getOriginalUrl.bind(apiService);
apiService.downloadCSV = apiService.downloadCSV.bind(apiService);
