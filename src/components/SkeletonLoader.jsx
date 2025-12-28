const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  );
};

export const TimerSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex mb-8 shadow-md">
        <SkeletonLoader className="h-10 w-20 rounded-full mr-2" />
        <SkeletonLoader className="h-10 w-24 rounded-full" />
      </div>
      
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <SkeletonLoader className="w-64 h-64 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <SkeletonLoader className="h-12 w-32 rounded" />
        </div>
      </div>
      
      <div className="flex space-x-4 mb-8">
        <SkeletonLoader className="h-12 w-20 rounded-full" />
        <SkeletonLoader className="h-10 w-16 rounded-full" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
        <SkeletonLoader className="h-6 w-32 mb-4 mx-auto" />
        <div className="space-y-6">
          <div>
            <SkeletonLoader className="h-4 w-40 mb-2" />
            <SkeletonLoader className="h-2 w-full rounded-lg" />
          </div>
          <div>
            <SkeletonLoader className="h-4 w-36 mb-2" />
            <SkeletonLoader className="h-2 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;