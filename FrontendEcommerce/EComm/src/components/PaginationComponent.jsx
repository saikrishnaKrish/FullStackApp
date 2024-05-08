import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PaginationComponent = ({pageNum,setPageNum,totalPages}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          if (pageNum == 1) return;
          setPageNum((pageNum) => pageNum - 1);
        }}
        disabled={pageNum == 1 ? true : false}
      >
        <KeyboardArrowLeftIcon fontSize="large"></KeyboardArrowLeftIcon>
      </button>

      <div className="pagenum">{pageNum}</div>

      <button
        onClick={() => {
          if (pageNum == totalPages) return;
          setPageNum((pageNum) => pageNum + 1);
        }}
        disabled={pageNum == totalPages ? true : false}
      >
        <ChevronRightIcon fontSize="large"></ChevronRightIcon>
      </button>
    </div>
  );
};

export default PaginationComponent;
