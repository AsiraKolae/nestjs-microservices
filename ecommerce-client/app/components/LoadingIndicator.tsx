const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-50 space-x-5">
      <div className='h-4 w-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 bg-green-500 rounded-full animate-bounce'></div>
    </div>
  );
};

export default LoadingIndicator;
