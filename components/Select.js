import React from 'react';
import styled from "styled-components";

const SelectI = styled.select`
  background: #3B3B3B;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
`

const Select = ({optionsList = [], defaultValue, value = "", changeValue}) => {
    return (
        <SelectI
            value={value}
            onChange={e => changeValue(e.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {optionsList.map(option =>
                <option
                    key={option.id || option.slug}
                    value={option.id || option.slug}
                >{option.name}</option>
            )}
        </SelectI>
    );
};

export default Select;