'use client';

import { PaginationItem, PaginationNext, PaginationPrevious } from '~/components/ui/pagination';

interface PaginationNavButtonProps {
  type: 'previous' | 'next';
  disabled: boolean;
  onClick: () => void;
}

export function PaginationNavButton({ type, disabled, onClick }: PaginationNavButtonProps) {
  const Component = type === 'previous' ? PaginationPrevious : PaginationNext;

  return (
    <PaginationItem>
      <Component
        onClick={onClick}
        className={disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        aria-disabled={disabled}
      />
    </PaginationItem>
  );
}
