import { useQuery } from "react-query";
import { LOCAL_BASE_URL } from "../../../config/config";
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';

const fetch_data = async (searchText) => {
    const baseUrl = `${LOCAL_BASE_URL}/api/getDataFromFitgirl`;
    const queryParams = {
        keyword: searchText,
    };

    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    const urlWithParams = `${baseUrl}?${queryString}`;
    try {
        const res = await fetch(urlWithParams)
        if (!res.ok) throw new Error('Something Went Wrong')
        return res.json()
    } catch (err) {
        throw new Error('Something Went Wrong')
    }
}

export default function ShowResultsFitgirl({ searchText, setLoading, loadingIndex, isLoadingIndicatorOn }) {

    const { isLoading, isError, data, error, isSuccess, } = useQuery(
        ['search Fitgirl', searchText],
        () => fetch_data(searchText),
        {
            enabled: true,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000,
            cacheTime: 1000
        }
    )

    if (isLoading) {
        if (!isLoadingIndicatorOn) setLoading(loadingIndex, true)
        return <div className="flex justify-center items-center">Loading...</div>
    }

    if (isError) {
        if (isLoadingIndicatorOn) setLoading(loadingIndex, false)
        return <div className="flex justify-center items-center">Something went wrong</div>
    }

    if (isLoadingIndicatorOn) setLoading(loadingIndex, false)
    if (!data.success) return <div>{data.message}</div>
    return <Visualizer data={data.data} />
}


const Visualizer = ({ data }) => {
    return <div className="flex flex-col">
        {data.map((e)=>{
            
            if(e.status === 'fulfilled') {
                let item = e.value
                return <a href={item.details_page_link} target="_blank">
                    <div className="my-4 rounded-xl bg-neutral-800 p-4">
                        <div className="flex p-4">
                            
                            <img src={item.img_url} onError={(e)=>{e.target.src = "https://i.imgur.com/hfM1J8s.png"}} alt={`poster for ${item.title.replace(/(.{17})..+/, "$1…")}`} className="rounded-xl bg-black" width="220" pla/>
                            
                            <div className="pl-4 flex flex-col justify-around">
                                <div>
                                    <p className="text-left">{item.title}</p>
                                    <p className="text-left text-sm text-gray-400">{item.uploaded_on}</p>
                                    
                                </div>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                        
                    </div>
                </a>
            }
            
        })}
    </div>

}