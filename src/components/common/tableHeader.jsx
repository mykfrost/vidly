import React, { Component } from 'react';
class TableHeader extends Component {
    //Columns: Array
    //Sortfcolumn : object
    //onSort : function
    raiseSort = path => {
        // Sorting in descending order
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path)
        sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            //sort column set to the new path
            sortColumn.path = path ;
            //and sort order should always be ascending whenever we sort on a new column
            sortColumn.order = 'asc';
        }
        // this.setState({sortColumn : {path: path , order :'asc'} });
        //Finally update the state based on this new sort order
        //Raise the sort event 
        this.props.onSort(sortColumn);
};
    render() { 
        return (
            <thead><tr>
               {this.props.columns.map(column => (
               <th key={column.path} onClick={ () => this.raiseSort(column.path)}>{column.label}</th>))}
            </tr></thead>
            
        );
    }
}
 
export default TableHeader;