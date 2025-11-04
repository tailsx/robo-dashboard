import { Spinner } from "./ui/spinner";

type LoadingSwapperProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

function LoadingSwapper({ isLoading, children }: LoadingSwapperProps) {
  if (isLoading) return <Spinner />;

  return children;
}

export { LoadingSwapper };
