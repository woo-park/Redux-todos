import React from 'react';

export default function FlashMessage(props) {
  return (
    <div className="flash-error">
      {props.message}
    </div>
  );
}

//test what this is doing
Error.defaultProps = {
  message: 'An error occurred!',
}
