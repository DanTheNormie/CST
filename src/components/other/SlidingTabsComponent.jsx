import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ShowResultsPiratebay from '../HomePageComponents/ShowResultComponents/ShowResultsPiratebay.component';


const search_text = "spider-man"

const domains = [
    {
        "name":"PirateBay"
    },
    {
        "name":"1337x"
    },
    {
        "name":"BingeWatch"
    },
    {
        "name":"SoaperTv"
    },
    {
        "name":"Cataz"
    },
    {
        "name":"FlixHQ"
    },
    {
        "name":"Fitgirl"
    },
    {
        "name":"Seven Gamers"
    }
]



const SlidingTabs = () => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    domains.forEach((domain)=>{
        const [isLoading, setLoading] = useState(true)
        domain.isLoading = isLoading
        domain.setLoading = setLoading
    })

    return (
        <div className='max-w-7xl w-[90%] relative bg-white'>
            <Box display={'flex'} justifyContent={'center'} width={'100%'} position={"sticky"}>
                <Tabs
                    style={{overflowX:"scroll"}}
                    value={value}
                    onChange={handleTabChange}
                    variant='scrollable'
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    centered>

                    {domains.map((domain, i)=>{
                        return <Tab label={<LoadingButton loading={domain.isLoading} variant='outlined'>{domain.name}</LoadingButton>}></Tab>
                    })}
                </Tabs>
            </Box>
            <div>
                <div className="w-full flex overflow-hidden relative">
                    {domains.map((domain,i)=>{
                        return (
                            <div className="tab-content w-full h-fit transition-all duration-200 ease-in-out absolute top-0 left-0 right-0 bottom-0" style={{ transform: `translateX(${(((i+1) -1) - value) * 100}%)` }}>
                                
                                
                                <Box className="tab w-full border border-blue-300 rounded-xl text-center p-4 mt-4">
                                    {domain.name === 'PirateBay' && <ShowResultsPiratebay setLoading={domain.setLoading}/>}
                                    {domain.name === '1337x' && <div>1337x</div>}
                                    {domain.name === 'BingeWatch' && <div>BingeWatch</div>}
                                    {domain.name === 'SoaperTv' && <div>SoaperTv</div>}
                                    {domain.name === 'Cataz' && <div>Cataz</div>}
                                    {domain.name === 'flixhq' && <div>flixhq</div>}
                                    {domain.name === 'Fitgirl' && <div>Fitgirl</div>}
                                    {domain.name === 'Seven Gamers' && <div>Seven Gamers</div>}
                                </Box>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default SlidingTabs;