
import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const PageContainer = ({
  children,
  title,
  description,
  className,
}: PageContainerProps) => {
  return (
    <div className={cn("page-container", className)}>
      {(title || description) && (
        <div className="mb-8 animate-slide-up">
          {title && <h1 className="font-semibold tracking-tight">{title}</h1>}
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
