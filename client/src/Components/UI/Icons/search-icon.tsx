import React from 'react'
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai'
import './global_icon.scss';

const SearchIcon = () => {
    return (
        <IconContext.Provider value={{className: 'serach-icon'}}>
            <AiOutlineSearch/>
        </IconContext.Provider>
    )
};

export default SearchIcon
