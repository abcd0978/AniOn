export default function Pagination({
  currentPage,
  totalPages,
  onClick,
}: {
  currentPage: number;
  totalPages: number;
  onClick: (page: number | "prev" | "next") => void;
}) {
  return (
    <div>
      <span className="page-click" onClick={() => onClick("prev")}>
        {"<"}
      </span>
      {Array.from({ length: totalPages }).map((_, idx) => {
        if (idx < 5) {
          return (
            <span
              className={`page-click ${
                currentPage === idx + 1 && "active-page"
              }`}
              key={idx}
              onClick={() => onClick(idx + 1)}
            >
              {idx + 1}
            </span>
          );
        } else if (idx === 5) {
          return (
            <span key={idx}>
              <span style={{ marginLeft: 5, marginRight: 5 }}>...</span>
              <span
                className={`page-click ${
                  currentPage === totalPages && "active-page"
                }`}
                onClick={() => onClick(totalPages)}
              >
                {totalPages}
              </span>
            </span>
          );
        }
        return null; // 추가된 부분
      })}
      <span className="page-click" onClick={() => onClick("next")}>
        {">"}
      </span>
    </div>
  );
}
