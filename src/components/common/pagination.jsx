import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
    const {itemsCount ,onPageChange,currentPage, pageSize} = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if(pagesCount === 1) return null;
   const pages = _.range(1 , pagesCount + 1);


    return (
    <nav>
        
        <ul className="pagination">
            {pages.map(page => (
            <li key={page} style={{cursor : 'pointer'}} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={ ()=> onPageChange(page)} >{page}</a>
            </li>
            ))}       
      
        </ul> 
    </nav>
    );
}

//After we define pagination , we add typechecking properties to it
 
Pagination.ropTypes = {
    itemsCount: PropTypes.number.isRequired ,
    onPageChange: PropTypes.func.isRequired,
    currentPage : PropTypes.number.isRequired,
     pageSize: PropTypes.number.isRequired

};
export default Pagination;