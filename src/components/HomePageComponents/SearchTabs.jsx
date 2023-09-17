import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ShowResultsPiratebay from './ShowResultComponents/ShowResultsPiratebay.component';
import ShowResults1337x from './ShowResultComponents/ShowResults1337x.component'
import ShowResultsBingeWatch from './ShowResultComponents/ShowResultsBingeWatch.component';
import ShowResultsSoaper from './ShowResultComponents/ShowResultsSoaper.component';
import ShowResultsFlixHQ from './ShowResultComponents/ShowResultsFlixHQ.component';
import ShowResultsFitgirl from './ShowResultComponents/ShowResultsFitgirl.component';

const search_text = "spider-man"

const domains = [
    {
        "name": "PirateBay"
    },
    {
        "name": "1337x"
    },
    {
        "name": "BingeWatch"
    },
    {
        "name": "SoaperTv"
    },
    {
        "name": "Cataz"
    },
    {
        "name": "FlixHQ"
    },
    {
        "name": "Fitgirl"
    },
    {
        "name": "Seven Gamers"
    }
]


export default function SearchTabs({searchData}) {

    const { searchString, searchArray } = searchData

    if (searchString === '' || searchArray === undefined || searchArray.length === 0) return <div></div>

    const [value, setValue] = useState(0);
    const containerRef = useRef(null)
    const contentRef = useRef(searchArray.map(() => null))
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    const [loadingArray, setLoadingArray] = useState(searchArray.map((e) => false))

    const updateLoadingArray = (i, b) => {
        const updatedLoadingArray = [...loadingArray]
        updatedLoadingArray[i] = b
        setLoadingArray(updatedLoadingArray)
    }

    useEffect(() => {
        if (!contentRef.current[value]) return;
        const resizeObserver = new ResizeObserver((entries) => {
            containerRef.current.style.height = entries[0].contentRect.height + 'px'
        });
        resizeObserver.observe(contentRef.current[value]);
        return () => resizeObserver.disconnect();
    }, [value, contentRef.current[value]]);

    return (
        <div className='max-w-7xl w-[90%] '>
            <Box display={'flex'} justifyContent={'center'} width={'100%'} position='sticky'>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    variant='scrollable'
                    scrollButtons={true}
                    allowScrollButtonsMobile>

                    {searchArray.map((domain, i) => {
                        return <Tab key={`Tab ${domain.name}`} label={<div><LoadingButton loading={loadingArray[i]}  variant='outlined'>{domain.name}</LoadingButton></div>}></Tab>
                    })}

                </Tabs>
            </Box>

            <div className={`w-full flex overflow-hidden relative transition-all border border-blue-300 rounded-xl duration-500 `} ref={containerRef} /* style={{height:{containerHeight}}} */>
                {searchArray.map((domain, i) => {
                    return (
                        <div
                            key={domain.name}
                            ref={el => contentRef.current[i] = el}
                            className="tab-content w-full h-fit transition-all duration-200 ease-in-out absolute top-0 left-0 right-0 bottom-0"
                            style={{ transform: `translateX(${(((i + 1) - 1) - value) * 100}%)` }}>

                            <Box className="tab w-full  text-center p-4">

                                {domain.name === 'PirateBay' && <ShowResultsPiratebay 
                                                                    isLoadingIndicatorOn = {loadingArray[i]}
                                                                    loadingIndex={i} 
                                                                    setLoading={updateLoadingArray} 
                                                                    searchText={searchString} 
                                                                />}
                                {domain.name === '1337x' && <ShowResults1337x 
                                                                    isLoadingIndicatorOn = {loadingArray[i]}
                                                                    loadingIndex={i} 
                                                                    setLoading={updateLoadingArray} 
                                                                    searchText={searchString} 
                                                                />}
                                                                
                                {domain.name === 'BingeWatch' && <ShowResultsBingeWatch
                                                                    isLoadingIndicatorOn = {loadingArray[i]}
                                                                    loadingIndex={i} 
                                                                    setLoading={updateLoadingArray} 
                                                                    searchText={searchString} 
                                                                />}
                                {domain.name === 'SoaperTv' && <ShowResultsSoaper
                                                                    isLoadingIndicatorOn = {loadingArray[i]}
                                                                    loadingIndex={i} 
                                                                    setLoading={updateLoadingArray} 
                                                                    searchText={searchString} 
                                                                />}
                                {domain.name === 'FlixHQ' && <ShowResultsFlixHQ
                                                                    isLoadingIndicatorOn = {loadingArray[i]}
                                                                    loadingIndex={i} 
                                                                    setLoading={updateLoadingArray} 
                                                                    searchText={searchString} 
                                                                />}
                                {domain.name === 'Fitgirl' && <ShowResultsFitgirl
                                                                    isLoadingIndicatorOn = {loadingArray[i]}
                                                                    loadingIndex={i} 
                                                                    setLoading={updateLoadingArray} 
                                                                    searchText={searchString} 
                                                                />}
                                {domain.name === 'Seven Gamers' && <div>Seven Gamers ( Coming soon... )</div>}

                            </Box>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};