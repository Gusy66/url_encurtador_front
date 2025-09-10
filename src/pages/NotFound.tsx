import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
          <div className="absolute inset-0 text-8xl font-bold text-red-500 opacity-20 transform translate-x-1 translate-y-1">
            404
          </div>
          <div className="absolute inset-0 text-8xl font-bold text-blue-400 opacity-20 transform -translate-x-1 -translate-y-1">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Link não encontrado
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. 
          Saiba mais em{' '}
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 underline"
          >
            brev.ly
          </button>
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

export default NotFound;
