import _ from 'lodash';

export function paginate(items , pageNumber , pageSize){
    //calculate the starting index of the items on this page(pageNumber)
    const startIndex =(pageNumber -1) * pageSize;

    //Convert items array to lodash wrapper
    return _(items).slice(startIndex)
    .take(pageSize)
    .value();
    //use lodash go t starting index and take all the items for the urrent page
    //_.slice(items , startIndex);
    // _.take()
    //.value returns a regular array
}