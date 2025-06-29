'use client';

import { useMemo } from 'react';

export type PageItem = number | 'ellipsis';

const MAX_VISIBLE_PAGES = 5;
const ELLIPSIS_THRESHOLD = 3;

export function usePagination(currentPage: number, totalPages: number) {
  const pageNumbers = useMemo<PageItem[]>(
    () => generatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const canNavigatePrevious = currentPage > 1;
  const canNavigateNext = currentPage < totalPages;

  return {
    pageNumbers,
    canNavigatePrevious,
    canNavigateNext
  };
}

function generatePageNumbers(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= ELLIPSIS_THRESHOLD) {
    return [1, 2, 3, 4, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}
