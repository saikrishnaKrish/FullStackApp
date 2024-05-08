import React from 'react'
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const SearchBarComponent = ({searchTerm,setSearchTerm,setsortDir}) => {
  return (
        <>
              <input
            className="search_input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="icons_container">
            <ArrowCircleUpIcon
              style={{ color: "white" }}
              fontSize="large"
              onClick={() => {
                setsortDir(1);
              }}
            ></ArrowCircleUpIcon>
            <ArrowCircleDownIcon
              fontSize="large"
              style={{ color: "white" }}
              onClick={() => {
                setsortDir(-1);
              }}
            ></ArrowCircleDownIcon>
          </div>
        </>
  )
}

export default SearchBarComponent