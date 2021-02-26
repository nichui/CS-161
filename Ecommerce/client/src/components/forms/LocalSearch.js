import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase());
    }
    return(


        //{/* Step 2*/}
        <input
            type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
        /> //{/*user can type keywords here*/}

    )
}

export default LocalSearch
