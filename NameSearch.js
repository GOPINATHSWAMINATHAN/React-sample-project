import React from "react";

const NameSearch = ({handleNameSearch, placeholder}) => {
    return (
        <div className = 'search'> 
            <input 
                onChange= {(event) => handleNameSearch(event.target.value)}
                type= 'text'
                placeholder= {placeholder}
            />
        </div>
    )
}

export default NameSearch;