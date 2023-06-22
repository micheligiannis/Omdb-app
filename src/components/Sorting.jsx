import React,{useState} from 'react';
import './Sorting.css';

const Sorting = ({ handleSort }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSortOption = (option) => {
      handleSort(option);
      setIsOpen(false);
    };
  
    return (
      <div className="dropdown">
        <button type="button" className="dropbtn" onClick={toggleMenu}>
          Sort Options
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <button type="button" onClick={() => handleSortOption("rating")}>
              Sort by Rating
            </button>
            <button type="button" onClick={() => handleSortOption("alphabetical")}>
              Sort Alphabetically
            </button>
            <button type="button" onClick={() => handleSortOption("year")}>
              Sort by Year
            </button>
          </div>
        )}
      </div>
    );
  };

export default Sorting;
