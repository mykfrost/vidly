import React, { Component } from 'react';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';
const Table = () => {
    const {columns , sortColumn , onSort , data} = props;
    return (  
        <table className="table">
        <TableHeader 
            columns={columns} 
            ortColumn={sortColumn}
            onSort={onSort} />
                       
        <TableBody
            columns={columns}
            data ={data} />                                                    
            </table> 
    );
}
 
export default Table;