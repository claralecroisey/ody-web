export function Loader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <span className={`loading loading-dots loading-${size}`}></span>;
}

export function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
