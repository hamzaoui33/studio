// This layout has been moved to /src/app/(quiz-flow)/layout.tsx
// This file is intentionally left to prevent route conflicts during transition.
// It should ideally be removed from the project.
import type { ReactNode } from 'react';

export default function PlaceholderQuizLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
