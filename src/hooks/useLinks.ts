import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Link, CreateLinkRequest } from '../types';

export const useLinks = () => {
  return useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const response = await apiService.getLinks();
      return response.data;
    },
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLinkRequest) => apiService.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteLink(id),
    onSuccess: (data, id) => {
      console.log('Link deletado com sucesso:', id);
      // Atualização otimista - remove o item da lista imediatamente
      queryClient.setQueryData(['links'], (oldData: any) => {
        if (!oldData || !oldData.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((link: any) => link.id !== id)
        };
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar link:', error);
      // Em caso de erro, recarrega os dados do servidor
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
};

export const useDownloadCSV = () => {
  return useMutation({
    mutationFn: apiService.downloadCSV,
  });
};
