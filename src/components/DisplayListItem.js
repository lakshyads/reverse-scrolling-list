import { useState } from 'react';

function DisplayListItem({ value, expandByDefault = false }) {
  const [isExpanded, setIsExpanded] = useState(expandByDefault);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  return (
    <div>
      <div onClick={toggleExpand}>
        {value} (click me to {isExpanded ? 'collapse' : 'expand'})
      </div>
      {isExpanded && <div className='expanded'>{value} expanded</div>}
    </div>
  );
}

export default DisplayListItem;
