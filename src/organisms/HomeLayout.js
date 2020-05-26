import React from 'react';
import { HeaderLayout } from '../molecules';

const HomeLayout = (props) => {
    return (
        <HeaderLayout>
            {props.children}
        </HeaderLayout>      
    );
};

export default HomeLayout;