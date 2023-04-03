import React from 'react';

function TextAreaWithDefault({ defaultValue, textValue, onTextAreaChange }) {
  defaultValue = localStorage.getItem("user_base_prompt");

  return (
    <textarea defaultValue={defaultValue} onChange={onTextAreaChange} className="textareacomp" rows={5}/>
  );
}

export default TextAreaWithDefault;
