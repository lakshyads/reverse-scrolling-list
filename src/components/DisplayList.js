import { useState, useRef, useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';

function DisplayList({
  listItems,
  fetchedItems,
  isLoading,
  scrollToEndRef,
  scrollToLoadedEndRef,
  requestPrevPage,
  setIsLoading,
}) {
  // =======================================================================
  // Infinite scroll+pagination state & handlers
  // -----------------------------------------------------------------------
  const loadDataRef = useRef();
  const shouldLoadMoreData = useOnScreen(loadDataRef);

  useEffect(() => {
    if (shouldLoadMoreData && !isLoading) {
      setIsLoading(true);
      requestPrevPage();
    }
  }, [shouldLoadMoreData, isLoading]);

  return (
    <div className='display-box' style={{ maxWidth: '500px' }}>
      {isLoading && <h3 className='loading'>Loading...</h3>}
      {/* {!isLoading && ( */}
      <div
        hidden={isLoading}
        ref={loadDataRef}
        className='load-more-placeholder'
      >
        Load more
      </div>
      {/* )} */}
      {fetchedItems}
      {<div ref={scrollToLoadedEndRef} />}
      {listItems}
      {<div ref={scrollToEndRef} />}
    </div>
  );
}

export default DisplayList;
