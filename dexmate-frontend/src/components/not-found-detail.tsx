type NotFoundDetailProps = {
  data?: unknown;
  children: React.ReactNode;
};
export function NotFoundDetail({ data, children }: NotFoundDetailProps) {
  if (!data) {
    return <div>Not Found</div>;
  }

  return <>{children}</>;
}
