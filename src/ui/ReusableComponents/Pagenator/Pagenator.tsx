import React from 'react';

const Pagenator = () => {
    return (
        <div>
            Pagination
            <select>
                <option key={1} value={1} >1</option>
                <option key={2} value={2} >2</option>
            </select>
            <button> &lt; </button>
            1 2 3 4 5
            <button> &gt; </button>
        </div>
    );
};

export default Pagenator;