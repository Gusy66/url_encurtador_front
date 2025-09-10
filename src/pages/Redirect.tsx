import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRedirect } from '../hooks/useRedirect';

const Redirect: React.FC = () => {
  const { urlEncurtada } = useParams<{ urlEncurtada: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useRedirect(urlEncurtada || '');

  useEffect(() => {
    if (data?.originalUrl) {
      // Redireciona automaticamente após 2 segundos
      const timer = setTimeout(() => {
        window.location.href = data.originalUrl;
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Link não encontrado
          </h1>
          <p className="text-gray-600 mb-6 max-w-md">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-card p-8 text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Redirecionando...
        </h1>
        
        <p className="text-gray-600 mb-4">
          O link será aberto automaticamente em alguns instantes.
        </p>
        
        <p className="text-gray-600 mb-6">
          Não foi redirecionado?{' '}
          <a
            href={data.originalUrl}
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Acesse aqui
          </a>
        </p>
        
        <div className="flex justify-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    </div>
  );
};

export default Redirect;
