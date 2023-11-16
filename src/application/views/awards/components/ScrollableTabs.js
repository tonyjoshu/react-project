import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function ScrollableTabs({ itemsList = [], value, setValue }) {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Tabs
                value={ value }
                onChange={ handleChange }
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {
                    itemsList.map((item, index) => (
                        <Tab key={ index } style={ { textTransform: 'capitalize', fontSize: 16 } } label={ item } />
                    ))
                }
            </Tabs>
        </>
    )
}