







import { Swiper, SwiperSlide } from 'swiper/react';
//import { Controller } from 'swiper/modules';
import { Thumbs } from 'swiper/modules';
import { useState } from 'react';
import './experiment.styles.css'
const tabs =[]
for(let i=1; i<=20; i++){
    tabs.push(`Slide ${i}`)
}

export default () => {
    const [pageSwiper, setPageSwiper] = useState(null);
    const [thumbSwiper, setThumbSwiper] = useState(null);
    return (
        <>
            {console.log(pageSwiper)}
            <Swiper
                modules={[Thumbs]} 
                spaceBetween={10}
                onSwiper={setThumbSwiper}
                slidesPerView={'auto'}
                centeredSlides
                simulateTouch
                freeMode
                //slideToClickedSlide
                //controller={{ control: pageSwiper }}
                watchSlidesProgress
                style={{ width: "80%", margin:"24px"}}
                onSlideChange={() => console.log('slide change')}
                
            >
                {tabs.map((e)=><SwiperSlide className='!w-auto cursor-pointer' zoom>
                        {({ isActive }) => (
                            <div>Current slide is {isActive ? 'active' : {e}}</div>
                        )}
                    <div className='border rounded-xl p-4'>
                        
                        
                    </div>
                    
                    </SwiperSlide>)}
            </Swiper>

            <Swiper
                modules={[Thumbs]} 
                spaceBetween={50}
                slidesPerView={1}
                //slideToClickedSlide
                thumbs={{ swiper: thumbSwiper}}
                style={{ width: "80%", height: "80vh" }}
                onSlideChange={() => console.log('slide change in here')}
                //onSwiper={setPageSwiper}
            >
                {tabs.map((e)=><SwiperSlide className='text-center'>{e}</SwiperSlide>)}
            </Swiper>
        </>
    )
}
