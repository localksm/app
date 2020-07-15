import React from 'react';
import { HeaderLayout } from '../molecules';

const HomeLayout = (props) => {
    return (
        <HeaderLayout rightChildren={props.rightChildren}>
            {props.children}
        </HeaderLayout>      
    );
};

export default HomeLayout;