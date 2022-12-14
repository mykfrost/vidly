import React from 'react';
import _ from 'lodash';

const Select = ({name , label ,options , error , ...rest}) => {
    return ( 
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <select className='form-control' name={name} id={name} {...rest}>
                <option value=""/>
                {options.map(option =>(
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger" >{error}</div>}

        </div>
     );
}
 
export default Select;