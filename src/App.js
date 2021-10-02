import './styles.css';
import { useState, useRef, useEffect } from 'react';
import useOnScreen from './hooks/useOnScreen';
import { fetchDataByPage } from './utils/pagination.utils';

export default function App() {
  // =======================================================================
  // Component states
  // -----------------------------------------------------------------------
  // Pagination
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  // Input & List
  const [inp, setInp] = useState(null);
  const [listData, setListdata] = useState([]);
  // List to keep track of all expanded records
  const [currentExpanded, setCurrentExpanded] = useState([]);
  // To keep track of newly added record (will be used to scroll to end of the list)
  const [totalNewRecords, setTotalNewRecords] = useState(0);

  // Scrollable ref - To end of list when new record is added
  const listEndRef = useRef();
  useEffect(() => listEndRef.current.scrollIntoView(), [totalNewRecords]);

  // =======================================================================
  // Infinite scroll
  // -----------------------------------------------------------------------
  const loadDataRef = useRef();
  const shouldLoadMoreData = useOnScreen(loadDataRef);

  useEffect(() => {
    if (shouldLoadMoreData) setCurrentPage(currentPage + 1);
  }, [shouldLoadMoreData, currentPage]);

  useEffect(() => {
    let loadedData = [];
    try {
      loadedData = fetchDataByPage(currentPage, pageSize);
    } catch (error) {
      alert(error);
    }
    setListdata(loadedData.concat(listData.slice(0 - totalNewRecords)));
  }, [currentPage]);
  // ========================================================================

  /**
   * Handle add new record to list action
   */
  const handleAddToList = () => {
    if (inp === null || inp === undefined) return;

    setListdata(listData.concat(inp));
    toggleExpand(listData.length);
    setInp(null);
    setTotalNewRecords(totalNewRecords + 1);
  };

  /**
   * Toggle to expand/collapse a record
   * @param {*} index Index of record to expand
   */
  const toggleExpand = (index) => {
    if (currentExpanded.includes(index))
      setCurrentExpanded(currentExpanded.filter((ind) => ind !== index));
    else setCurrentExpanded(currentExpanded.concat(index));
  };

  return (
    <div className='App'>
      <h1>Wipro Telstra</h1>
      <h2>React Assignment 1</h2>
      <input
        placeholder='type here'
        value={inp ? inp : ''}
        onChange={(e) => setInp(e.target.value)}
      />
      &nbsp;
      <button onClick={handleAddToList}>Add to list</button>
      <br />
      <br />
      <div className='display-box' style={{ maxWidth: '500px' }}>
        <div ref={loadDataRef}>Load more</div>
        {listData.map((val, index) => (
          <div key={index}>
            <div onClick={() => toggleExpand(index)}>
              {val} (click me to expand)
            </div>
            {currentExpanded.includes(index) && (
              <div className='expanded'>{val} expanded</div>
            )}
          </div>
        ))}
        <div ref={listEndRef} />
      </div>
    </div>
  );
}
