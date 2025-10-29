import React from 'react';

const ChevronLeft = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function getPages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, '...', total];
  }

  if (current >= total - 2) {
    return [1, '...', total - 2, total - 1, total];
  }

  return [1, '...', current, '...', total];
}

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange = () => {} }) => {
  const pages = getPages(currentPage, totalPages);

  const buttonBase = 'min-w-8 h-8 px-3 flex items-center justify-center rounded-md border border-[#00000080] text-sm';
  const inactive = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  const active = 'bg-[#009CA8] text-white border-[#009CA8]';
  const disabled = 'bg-white text-gray-400 border-gray-300 cursor-not-allowed';

  return (
    <div className="px-4 sm:px-6 py-4 border-t flex items-center justify-center gap-2">
      {/* Prev */}
      <button
        className={`${buttonBase} ${currentPage === 1 ? disabled : inactive}`}
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </button>

      {/* Page numbers */}
      {pages.map((p, idx) => (
        typeof p === 'string' ? (
          <span key={`ellipsis-${idx}`} className={`${buttonBase} ${disabled}`}>…</span>
        ) : (
          <button
            key={`page-${p}`}
            className={`${buttonBase} ${p === currentPage ? active : inactive}`}
            onClick={() => onPageChange(p)}
            aria-label={`Go to page ${p}`}
          >
            {p}
          </button>
        )
      ))}

      {/* Next */}
      <button
        className={`${buttonBase} ${currentPage === totalPages ? disabled : inactive}`}
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;