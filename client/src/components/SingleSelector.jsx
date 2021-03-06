import React, { useState } from "react";
import Select from 'react-select'

const styles = {
  menu: base => ({
    ...base,
    marginTop: 0
  })
}

// Component for the add counselor page single selectors.
export default function SingleSelector({filters, id, onChange, isQuery, isSearchable}) {
  //isQuery is true if it will be used as a filter option in the main find a counselor page

  //options here is one list from filters.

  //convert options in format of Select component
  //Will be empty if filters is empty.
  const options = Object.entries(filters).length === 0?[]:filters.list.map((item, index) => ({value: index, label: item}));
  
  const [optionSelected, setSelectedOptions] = useState('');

  const handleChangeInner = (selected) => {
    //if this is a query option in the pricing tool it has to be in lowercase
    const optionsSelected = isQuery ? selected.label.replace(/ /g, "_").toLowerCase():selected.label;
    onChange({ id, optionsSelected});
    
    setSelectedOptions(selected);
  };
  
  return (
    <Select
      options={options}
      isLoading={!options}
      closeMenuOnSelect={true}
      onChange={handleChangeInner}
      value={optionSelected}
      id={id}
      styles={styles}
      placeholder=""
      isSearchable={isSearchable}
      required
    />
  );
}
//Most Single select should not have search feature
SingleSelector.defaultProps = {
  isSearchable : false
}