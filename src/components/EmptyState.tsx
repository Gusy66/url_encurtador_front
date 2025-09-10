import React from 'react';
import { Link2 } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <Link2 className="h-16 w-16 text-gray-300" />
}) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-500 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
