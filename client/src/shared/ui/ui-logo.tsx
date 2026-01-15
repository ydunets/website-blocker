import clsx from "clsx";

export function UILogo({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center gap-2 text-xl")}>
      {/* <Shield className="w-12 h-12" /> */}
      Website Blocker
    </div>
  );
}