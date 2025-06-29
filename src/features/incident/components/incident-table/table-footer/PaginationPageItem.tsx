'use client';

import { PaginationEllipsis, PaginationItem, PaginationLink } from '~/components/ui/pagination';
import { PageItem } from '~/features/incident/hooks/usePagination';

interface PaginationPageItemProps {
  page: PageItem;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationPageItem({ page, currentPage, onPageChange }: PaginationPageItemProps) {
  return (
    <PaginationItem>
      {page === 'ellipsis' ? (
        <PaginationEllipsis />
      ) : (
        <PaginationLink
          onClick={() => onPageChange(page)}
          isActive={currentPage === page}
          className="cursor-pointer"
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </PaginationLink>
      )}
    </PaginationItem>
  );
}
