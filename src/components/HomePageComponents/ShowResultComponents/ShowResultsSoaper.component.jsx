import { useQuery } from "react-query";
import { LOCAL_BASE_URL } from "../../../config/config";
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';

const fetch_data = async (searchText) => {
    const baseUrl = `${LOCAL_BASE_URL}/api/getDataFromSoaperTv`;
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

export default function ShowResultsSoaper({ searchText, setLoading, loadingIndex, isLoadingIndicatorOn }) {

    const { isLoading, isError, data, error, isSuccess, } = useQuery(
        ['search SoaperTv', searchText],
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
    if (!data) return <div>No Data</div>
    if (!data.success) return <div>{data.message}</div>
    return <Visualizer data={data.data} />
}


const Visualizer = ({ data }) => {
    return <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min-content,250px))] justify-center">
        {data.map((e) => {
            const released_on = <span className="bg-black opacity-80 px-2 rounded-lg flex justify-center items-center">{e.released_on}</span>

            return <a href={`https://soaper.tv${e.details_page_link}`} target="_blank">
                    <Card className=" !rounded-xl relative flex flex-col">
                        <img src={e.img_url} alt={`poster for ${e.title}`}/>

                        <div className="flex justify-center py-2 m-0 ">{e.title}</div>
                        
                        <div className="absolute top-5 left-5 right-5 text-sm">
                            <div className="flex justify-between">{released_on}</div>
                        </div>
                    </Card>
                </a>
            })            
        }
    </div>

}