import React, { useState } from 'react';
import { withContext } from '../apollo';
import { FilePickerComponent } from '.';
import { handlerSingleFilePicker } from '../utils/misc';
import { useLoader } from '../utils/hooks';

const FilePicker = (props) => {
  const [chosenItems, setChosenItems] = useState([]);
  const { load, setLoad } = useLoader();

  return (
    <FilePickerComponent
      loading={load}
      handlerSingleFilePicker={() =>
        handlerSingleFilePicker(props, setLoad, chosenItems, setChosenItems)
      }
      children={props.children}
    />
  );
};

export default withContext(FilePicker);
