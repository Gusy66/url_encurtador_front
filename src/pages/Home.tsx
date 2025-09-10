import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Copy, Trash2, Download } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLinks, useCreateLink, useDeleteLink, useDownloadCSV } from '../hooks/useLinks';
import { CreateLinkRequest } from '../types';

const createLinkSchema = z.object({
  originalUrl: z.string().url('URL inválida'),
  shortenedUrl: z.string().min(1, 'Link encurtado é obrigatório').regex(/^[a-zA-Z0-9-_]+$/, 'Apenas letras, números, hífens e underscores são permitidos'),
});

type CreateLinkForm = z.infer<typeof createLinkSchema>;

const Home: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const { data: links = [], isLoading: linksLoading } = useLinks();
  const createLinkMutation = useCreateLink();
  const deleteLinkMutation = useDeleteLink();
  const downloadCSVMutation = useDownloadCSV();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<CreateLinkForm>({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit = async (data: CreateLinkForm) => {
    try {
      await createLinkMutation.mutateAsync({
        originalUrl: data.originalUrl,
        slug: data.shortenedUrl,
      });
      reset();
    } catch (error: any) {
      if (error.message.includes('already exists') || error.message.includes('já existe')) {
        setError('shortenedUrl', { message: 'Este link encurtado já existe' });
      } else {
        setError('root', { message: 'Erro ao criar link' });
      }
    }
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este link?')) {
      await deleteLinkMutation.mutateAsync(id);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const result = await downloadCSVMutation.mutateAsync();
      
      if (result.fallback) {
        // Se for fallback, usa o data URL diretamente
        const a = document.createElement('a');
        a.href = result.url;
        a.download = 'links.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // Se for URL do R2, faz download normal
        const response = await fetch(result.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'links.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Erro ao baixar CSV:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de criação */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Novo link</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Link Original"
                placeholder="www.exemplo.com.br"
                {...register('originalUrl')}
                error={errors.originalUrl?.message}
              />
              
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  brev.ly/
                </span>
                <Input
                  label="Link Encurtado"
                  placeholder="meu-link"
                  className="rounded-l-none"
                  {...register('shortenedUrl')}
                  error={errors.shortenedUrl?.message}
                />
              </div>

              {errors.root && (
                <p className="text-sm text-red-600">{errors.root.message}</p>
              )}

              <Button
                type="submit"
                loading={createLinkMutation.isPending}
                className="w-full"
              >
                Salvar link
              </Button>
            </form>
          </Card>

          {/* Lista de links */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Meus links</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadCSV}
                loading={downloadCSVMutation.isPending}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Baixar CSV</span>
              </Button>
            </div>

            {linksLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : links.length === 0 ? (
              <EmptyState
                title="AINDA NÃO EXISTEM LINKS CADASTRADOS"
                description="Crie seu primeiro link encurtado usando o formulário ao lado"
              />
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div key={link.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <a 
                          href={`/${link.slug}`}
                          className="text-sm font-medium text-primary-600 truncate hover:text-primary-700 hover:underline cursor-pointer"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          brev.ly/{link.slug}
                        </a>
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {link.originalUrl}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {link.clicks} acessos
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(`brev.ly/${link.slug}`, link.id)}
                          className="p-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(link.id)}
                          loading={deleteLinkMutation.isPending}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {copiedId === link.id && (
                      <p className="text-xs text-green-600 mt-1">Copiado!</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
