import './styles.css';
import { useState, useRef, useEffect } from 'react';
import useOnScreen from './hooks/useOnScreen';
import { fetchDataByPage } from './utils/pagination.utils';

import Header from './components/Header';
import Input from './components/Input';
import Button from './components/Button';
import DisplayList from './components/DisplayList';
import DisplayListItem from './components/DisplayListItem';

export default function App() {
  // =======================================================================
  // Display list state & handlers
  // -----------------------------------------------------------------------
  const [listItems, setListItems] = useState([]);
  const [fetchedDataItems, setFetchedDataItems] = useState([]);
  const scrollToEndRef = useRef();
  const scrollToLoadedEndRef = useRef();

  // =======================================================================
  // Form state & handlers
  // -----------------------------------------------------------------------
  const [inputValue, setInputValue] = useState('');
  const resetInputValue = () => setInputValue('');
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === null || value === undefined) resetInputValue();
    else setInputValue(value);
  };
  /**
   * Handler for add item to list button
   */
  const handleAddToList = () => {
    if (inputValue === '') return;
    setListItems(
      listItems.concat(
        <DisplayListItem value={inputValue} expandByDefault={true} />
      )
    );
    resetInputValue();
    // Once the item is added to list, scrill to it
    scrollToEndRef.current.scrollIntoView({
      behaviour: 'smooth',
    });
  };

  // =======================================================================
  // Infinite scroll+pagination state & handlers
  // -----------------------------------------------------------------------
  const pageSize = 20; // Items per page
  const [currentPage, setCurrentPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPrevPage = () => {
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const dataItems = await fetchDataByPage(currentPage, pageSize);
        if (fetchedDataItems.length > 0)
          setListItems(fetchedDataItems.concat(listItems));
        setFetchedDataItems(
          dataItems.map((item) => <DisplayListItem value={item} key={item} />)
        );
      } catch (error) {
        alert(error);
      } finally {
        scrollToLoadedEndRef.current.scrollIntoView({ behaviour: 'smooth' });
        setIsLoading(false);
      }
    };
    if (currentPage !== null) fetch();
  }, [currentPage]);

  // =======================================================================
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className='App'>
      {/* Header */}
      <Header assignmentNo={1} />
      <br />

      {/* Controlled Form */}
      <Input value={inputValue} handleOnChange={handleInputChange} />
      <Button text={'X'} onClick={resetInputValue} />
      <Button
        className={'submit-button'}
        text={'Add to list'}
        onClick={handleAddToList}
      />
      <br />
      <br />
      {/* Display list */}
      <DisplayList
        listItems={listItems}
        fetchedItems={fetchedDataItems}
        isLoading={isLoading}
        scrollToEndRef={scrollToEndRef}
        scrollToLoadedEndRef={scrollToLoadedEndRef}
        requestPrevPage={requestPrevPage}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
