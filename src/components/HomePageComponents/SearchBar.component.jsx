import { useState } from 'react';
import {
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
    Box,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper
} from '@mui/material';
import './SearchBar.styles.css'
import { Search, ExpandMore as ExpandMoreIcon, DoneAll } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { set } from 'lodash';


const categories = [
    {
        "name": "Torrents",
        "domains": [
            {
                "name": "PirateBay"
            },
            {
                "name": "1337x"
            }

        ]
    },
    {
        "name": "Streams",
        "domains": [
            {
                "name": "BingeWatch"
            },
            {
                "name": "SoaperTv"
            },
            {
                "name": "FlixHQ"
            },

        ]
    },
    {
        "name": "Games",
        "domains": [
            {
                "name": "Fitgirl"
            }
        ]
    }
]


export default function SearchBar({setSearchData}) {


    const customOptionsStateArray = categories.map((category) => {
        return useState(Array.from({ length: category.domains.length }, () => true))
    })

    const handleSearchOnClick = (e) => {
        e.preventDefault()
        const input_value = document.getElementById('input').value
        const searchArray = []

        categories.forEach((category, i)=>{
            category.domains.forEach((domain, j)=>{
                if(customOptionsStateArray[i][0][j] === true ){
                    searchArray.push({"name":domain.name})
                }
            })
        })

        console.log(searchArray);
        console.log(input_value);
        const data = {
            searchString:input_value,
            searchArray:searchArray
        }

        
        setSearchData(data)
    }

    const [radio_value, set_radio_value] = useState('All')

    const [expanded, setExpanded] = useState('h-0');


    const onRadioChange = (e) => {
        set_radio_value(e.target.value);
        if (e.target.value === 'Custom') {
            console.log('custom clicked');
            setExpanded('h-96')
        } else {
            if (e.target.value === 'All') {
                customOptionsStateArray.map((custom_category)=>{
                    custom_category[1](Array.from({ length: custom_category[0].length }, () => true))
                })
            }else if(e.target.value === 'Torrents'){

                customOptionsStateArray[0][1](Array.from({ length:  customOptionsStateArray[0][0].length }, () => true))
                customOptionsStateArray[1][1](Array.from({ length:  customOptionsStateArray[1][0].length }, () => false))
                customOptionsStateArray[2][1](Array.from({ length:  customOptionsStateArray[2][0].length }, () => false))
            }else if(e.target.value === 'Streams'){

                customOptionsStateArray[0][1](Array.from({ length:  customOptionsStateArray[0][0].length }, () => false))
                customOptionsStateArray[1][1](Array.from({ length:  customOptionsStateArray[1][0].length }, () => true))
                customOptionsStateArray[2][1](Array.from({ length:  customOptionsStateArray[2][0].length }, () => false))
            
            } else if(e.target.value === 'Games'){

                customOptionsStateArray[0][1](Array.from({ length:  customOptionsStateArray[0][0].length }, () => false))
                customOptionsStateArray[1][1](Array.from({ length:  customOptionsStateArray[1][0].length }, () => false))
                customOptionsStateArray[2][1](Array.from({ length:  customOptionsStateArray[2][0].length }, () => true))
            }
            setExpanded('h-0')
        }
    }

    const isAllTrue = (arr) => {
        return arr.every(i => i === true)
    }
    const isAllFalse = (arr) => {
        return arr.every(i => i === false)
    }

    const handleAll = (e, i, setArray) => {
        setArray(Array.from({ length: categories[i].domains.length }, () => e.target.checked))
    }

    const children = (domains, parent_idx) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
            {domains.map((e, index) => {
                return <FormControlLabel
                    key={`option ${e.name}`}
                    label={e.name}
                    className='p-2'
                    control={
                        <Checkbox
                            checked={customOptionsStateArray[parent_idx][0][index]}
                            onChange={(e) => {
                                const newArray = Array.from(customOptionsStateArray[parent_idx][0])
                                newArray[index] = e.target.checked
                                customOptionsStateArray[parent_idx][1](newArray)
                            }}
                        />
                    }
                />
            })}
        </Box>
    );




    return (
        <div className="text-field !w-[80%] !mt-[5vh]">
            <form className='' onSubmit={handleSearchOnClick}>
                <div className='flex items-center relative search-container'>
                    <input type="text" id="input" className="input" required placeholder='Search...' />
                    <div className="underline" />
                    <div className='default-underline'></div>
                    <IconButton className='search-btn' type='submit'><Search /></IconButton>
                </div>
                <RadioGroup
                    row
                    className='RadioGroup'
                    style={{ display: "flex", justifyContent: "space-around", margin: "32px 0px" }}
                    name="position"
                    onChange={onRadioChange}
                    value={radio_value}
                    defaultValue="All">

                    <FormControlLabel
                        value="All"
                        control={<Radio />}
                        label="All" />

                    <FormControlLabel
                        value="Torrents"
                        control={<Radio />}
                        label="Torrents" />

                    <FormControlLabel
                        value="Streams"
                        control={<Radio />}
                        label="Streams" />

                    <FormControlLabel
                        value="Games"
                        control={<Radio />}
                        label="Games" />

                    <FormControlLabel
                        value="Custom"
                        control={<Radio />}
                        label="Custom" />

                </RadioGroup>

                <div className={`custom-options ${expanded} border-gray-700 ${expanded!='h-0' && 'border'} rounded-xl overflow-y-auto transition-all flex flex-wrap justify-around overflow-hidden `}>
                    {categories.map((category, i) => {
                        return (
                            <div key={category.name} className='m-4'>
                                <FormControlLabel
                                    
                                    label={<div className='flex text-blue-300'>{category.name}</div>}
                                    control={
                                        <Checkbox
                                            checked={isAllTrue(customOptionsStateArray[i][0])}
                                            indeterminate={!isAllFalse(customOptionsStateArray[i][0]) && !isAllTrue(customOptionsStateArray[i][0])}
                                            onChange={(e) => { handleAll(e, i, customOptionsStateArray[i][1]) }}
                                        />
                                    }
                                />
                                {children(category['domains'], i)}
                            </div>
                        )
                    })}
                </div>

            </form>
        </div>
    )
}