import { Pagination, PaginationContent } from '~/components/ui/pagination';
import { PaginationNavButton } from './PaginationNavButton';
import { PaginationPageItem } from './PaginationPageItem';
import { PageItem, usePagination } from '~/features/incident/hooks/usePagination';

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageItemKey(page: PageItem, index: number): string {
  return page === 'ellipsis' ? `ellipsis-${index}` : `page-${page}`;
}

export function TableFooter({ currentPage, totalPages, onPageChange }: TableFooterProps) {
  const { pageNumbers, canNavigatePrevious, canNavigateNext } = usePagination(
    currentPage,
    totalPages
  );

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex justify-end">
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationNavButton
            type="previous"
            disabled={!canNavigatePrevious}
            onClick={() => onPageChange(currentPage - 1)}
          />

          {pageNumbers.map((page, index) => (
            <PaginationPageItem
              key={getPageItemKey(page, index)}
              page={page}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          ))}

          <PaginationNavButton
            type="next"
            disabled={!canNavigateNext}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
