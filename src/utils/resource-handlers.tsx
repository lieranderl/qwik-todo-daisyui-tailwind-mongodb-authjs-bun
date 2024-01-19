export const errorHandler = (error: Error) => {
  return <div class="alert alert-error">Error: {error.message}</div>;
};

export const pendingHandler = () => {
  return <span class="loading loading-spinner loading-sm"></span>;
};
