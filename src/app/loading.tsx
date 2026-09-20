export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
      <p className="text-sm tracking-[0.16em] text-muted-foreground uppercase">
        Loading
      </p>
    </div>
  );
}
