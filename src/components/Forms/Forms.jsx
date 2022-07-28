import { Button } from '@mui/material';
import * as React from 'react';
import MultiSelectMenu from '../MultiSelectMenu/MultiSelectMenu';
import SingleSelectMenu from '../SingleSelectMenu/SingleSelectMenu';
import CustomTextField from '../TextField/CustomTextField';

const names = [
    { id: 1, name: 'Oliver Hansen'},
    { id: 2, name: 'Van Henry'},
    { id: 3, name: 'April Tucker'},
    { id: 4, name: 'Ralph Hubbard'},
    { id: 5, name: 'Omar Alexander'},
    { id: 6, name: 'Carlos Abbott'},
    { id: 7, name: 'Miriam Wagner'},
    { id: 8, name: 'Bradley Wilkerson'},
    { id: 9, name: 'Virginia Andrews'},
    { id: 10, name: 'Kelly Snyder'},
];

const Forms = () => {
    var formStateModel = {
        field1Error: true,
        field2Error: true,
        field3Error: true,
    }
    const [error, setError] = React.useState(true);
    const [formState, setFormState] = React.useState(formStateModel)
    const [formData, setFormData] = React.useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleErrorRoot = (status) => {
        setError(status.isError);
        setFormState({...formState, [Object.keys(status)[1]]: Object.values(status)[1]});
    }

    const handleFieldValue = (data) => {
        setFormData({...formData, [data.name]: data.value});
    }
    return (
        <form noValidate onSubmit={handleSubmit}>
            <MultiSelectMenu 
                placeholderProp={'Select Region'}
                itemsArray={names} 
                markerType={'checkbox'} 
                fixedItemLabel={ { label:'Select all', hasMarker:true }} 
                inputLabel={'Region'} 
                requiredProp={false}
                chips={true}
                setErrorRoot={handleErrorRoot}
                handleFieldValue={handleFieldValue}
            />
            <br />
            <CustomTextField 
                setErrorRoot={handleErrorRoot}
                handleFieldValue={handleFieldValue}
                inputLabel={'Name'}

            />
            <br />
            <SingleSelectMenu 
                placeholderProp={'Select Brand name'}
                itemsArray={names} 
                markerType={'switch'} 
                fixedItemLabel={ { label:'Select one option only'}} 
                inputLabel={'Brand name'} 
                requiredProp={true}
                chips={false}
                setErrorRoot={handleErrorRoot}
                handleFieldValue={handleFieldValue}
            />
            <br />
            <Button 
                variant='contained'
                type='submit' 
                disabled={Object.values(formState).every(value => value === false) ? false : true}
            >
                Submit
            </Button>
        </form>
    )
}

export default Forms;