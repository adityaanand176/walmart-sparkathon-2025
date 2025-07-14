import React from 'react';

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse flex flex-col">
          <div className="h-48 w-full bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="flex-1" />
          <div className="h-8 bg-gray-200 rounded w-full mt-2" />
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton; 