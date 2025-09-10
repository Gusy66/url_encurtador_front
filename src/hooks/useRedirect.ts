import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

export const useRedirect = (shortenedUrl: string) => {
  return useQuery({
    queryKey: ['redirect', shortenedUrl],
    queryFn: () => apiService.getOriginalUrl(shortenedUrl),
    enabled: !!shortenedUrl,
    retry: false,
  });
};
