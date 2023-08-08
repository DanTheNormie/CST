import { Swiper, SwiperSlide } from 'swiper/react';
import { 
    Controller, 
    Thumbs, 
    FreeMode, 
    Virtual, 
    EffectCards,
    Keyboard,
    Navigation
} from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css/effect-cards'
import {LOCAL_BASE_URL} from '../../config/config'
import { useQuery } from 'react-query';
import { LoadingButton } from '@mui/lab';
import ShowResults1337x from './ShowResultComponents/ShowResults1337x.component';
import ShowResultsPiratebay from './ShowResultComponents/ShowResultsPiratebay.component'
import './ResultTabs.styles.css'
const tabs = [
    {
        domain_name:'PirateBay',
        search_url:`${LOCAL_BASE_URL}/api/getDataFromPirateBay`
    },
    {
        domain_name:'1337x',
        search_url:`${LOCAL_BASE_URL}/api/getDataFrom1337x`
    }
]

function ConditionalComponent({domain, searchText, setLoading}){
    console.log(searchText);
    switch(domain){
        case '1337x': {console.log('1337x rendered'); return <ShowResults1337x searchText={searchText} setLoading={setLoading} />}
        case 'PirateBay': {console.log('PirateBay rendered'); return <ShowResultsPiratebay searchText={searchText} setLoading={setLoading}/>}
        default: return <div>?</div>
    }
}


export default ({searchText, setSearch}) => {
    const [pageSwiper, setPageSwiper] = useState(null);
    const [thumbSwiper, setThumbSwiper] = useState(null);
    tabs.forEach((e)=>{
        const [isLoading,setLoading] = useState(false)
        e.loadStatus = {isLoading, setLoading}
    })
    console.log(tabs);

    return (
        <div className='flex flex-col items-center w-full p-4 h-fit' >
            {console.log(pageSwiper)}
            <Swiper
                modules={[Controller, Thumbs, FreeMode, Navigation]}
                //onSwiper={setThumbSwiper}
                navigation
                slidesPerView={'auto'}
                centeredSlides
                simulateTouch
                spaceBetween={42}
                freeMode={{
                    enabled: true,
                    momentumBounce: false,
                    sticky: true
                }}
                slideToClickedSlide={true}
                controller={{ control: pageSwiper}}
                watchSlidesProgress
                style={{
                    backgroundColor:'#121212',
                    width: "100%",
                    zIndex:"100",
                    padding:"18px",
                    position: "sticky",
                    top:"0",
                    left:"0",
                    right:"0",
                    display: "flex",
                    justifyContent: "space-between",
                    boxSizing:"border-box",

                }}
                //onSlideChange={() => console.log('slide change')}
                >

                {tabs.map((e) => {
                    return (
                        <SwiperSlide className='text-center !w-auto cursor-pointer' key={e.domain_name}>
                            <LoadingButton loading={e.loadStatus.isLoading} className='!p-4' variant='outlined'>
                                {e.domain_name}
                            </LoadingButton>
                        </SwiperSlide>
                    )
                })}
                
            </Swiper>

            <Swiper
                modules={[Controller, Thumbs, Virtual, EffectCards,Keyboard]}
                /* virtual={{
                    enabled:true
                }} */
                keyboard
                centeredSlides
                allowTouchMove={false}
                slidesPerView={1}
                //thumbs={{ swiper: thumbSwiper }}
                style={{ width: "100%", margin:"42px 0"}}
                //preventInteractionOnTransition= {true}
                //controller={{ control: thumbSwiper}}
                //onSlideChange={() => {console.log('slide change in here')}}
                onSwiper={setPageSwiper}
            >
                {tabs.map((e,index) => {
                    return <SwiperSlide className='text-center overflow-auto flex' virtualIndex={index} key={e.domain_name}>
                        <div className='border rounded-xl h-[80%] p-4'>
                            {(searchText !== 'no-string') && (e.domain_name === 'PirateBay') &&
                                <ShowResultsPiratebay searchText={searchText} setLoading={e.loadStatus.setLoading} />
                            }
                            {(searchText !== 'no-string') && (e.domain_name === '1337x') &&
                                <ShowResults1337x searchText={searchText} setLoading={e.loadStatus.setLoading} />
                            }
                            {(searchText === 'no-string') && <div className='!h-[50vh] flex justify-center items-center text-2xl'>Search for something above to show results here</div>}
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    );
};
