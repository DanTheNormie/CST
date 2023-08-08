import { useState } from "react"
import { LOCAL_BASE_URL } from "../config/config"
import { useQuery } from "react-query"
import DomainComponent from "../components/StatusPageComponents/Domain.component"

const fetch_domains = async ()=>{
    const res = await fetch(`${LOCAL_BASE_URL}/api/getdomains`)
    if(!res.ok) throw new Error('Something Went Wrong')
    return res.json()
}

export default function Status(){
    const {isLoading, isError, data, error, isSuccess} = useQuery('domains', fetch_domains)
    const [expanded, setExpanded] = useState(false);

    if(isError) return <span className="flex h-[100vh] justify-center items-center">Error: {error.message}</span>

    
    return (
    <div className=" flex flex-col items-center">
        <h1 className="text-center text-3xl m-8">All Routes</h1>

        {!isLoading && <ul className="max-w-4xl w-full">
            {data.data.map((e)=>{
                if(e && e.domain_name && e.urls){
                    return <DomainComponent 
                    key={e.domain_name} 
                    domain_name={e.domain_name} 
                    urls={e.urls} 
                    setExpanded={setExpanded}
                    expanded={expanded}
                    />
                }
            })}
        </ul>}
    
    </div>
        
    )
}