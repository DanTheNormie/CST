import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import ScrapeRouteComponent from './scrape_route.component';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function DomainComponent(props){
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        props.setExpanded(isExpanded ? panel : false);
    };

    return(
    <Accordion 
        className="border border-blue-300 p-4 !rounded-xl m-4"
        expanded={props.expanded===props.domain_name}
        onChange={handleChange(props.domain_name)}
    >
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>

            <p className='text-3xl mx-4'>{props.domain_name || ''}</p>

        </AccordionSummary>

        <AccordionDetails>

            <Divider><Chip label="Scrape Routes" /></Divider>

            {props.urls.map((route)=>{
                return (
                    <ScrapeRouteComponent 
                        key={`${route.name} ${route.url}`} 
                        name={route.name} route={route.url} 
                        task={route.task}
                        expanded={expanded}
                        setExpanded={setExpanded}
                    />
                )
            })}

        </AccordionDetails>
        
    </Accordion>
    )
}