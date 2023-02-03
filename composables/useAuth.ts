export const useAuth = () => {
  return definePageMeta({ middleware: 'auth' });
};
