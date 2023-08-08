import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQuery, useQueryClient } from 'react-query';
import { LOCAL_BASE_URL } from '../../config/config';
import CodeBlock from './CodeBlock.component';
import SendIcon from '@mui/icons-material/Send';
import BugReportIcon from '@mui/icons-material/BugReport';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

import { useRef } from 'react';
import CodeEditor from './CodeEditor';
import { Button } from '@mui/material';


function QueryIndicatorIcon(props) {
    if (props.isError) return <CancelIcon color='error' />
    if (props.isSuccess) return <CheckCircleIcon color='success' />
    return <BugReportIcon />
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({

    justifyContent: "space-between",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',

    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        justifyContent: "space-between",
        alignItems: "center"
    },
}));



export default function ScrapeRouteComponent(props) {
    const queryClient = useQueryClient()
    
    const handleChange = (panel) => (event, isExpanded) => {
        
        props.setExpanded(isExpanded ? panel : false);
    };

    const editorRef = useRef(JSON.stringify(props.task))

    async function fetchData(task) {
        const options = {
            method: "POST",
            body: JSON.stringify({ task: JSON.parse(editorRef.current.getValue().replace(/[\t\n]/g,''))}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
        const res = await fetch(`${LOCAL_BASE_URL}/api/customscrape`, options)
        /* if(!res.ok) throw new Error('Request Failed') */
        return res.json()
    }

    const {
        isLoading,
        isError,
        isSuccess,
        data, error,
        isFetching,
        refetch
    } = useQuery(
        props.task.url,
        () => { return fetchData(editorRef) },
        {
            enabled: false,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 0,
            cacheTime: 0
        })

    
    const handleClick = ()=>{console.log(JSON.stringify({ task: JSON.parse(editorRef.current.getValue())}));}

    return (
        <Accordion 
            className="border border-gray-400 m-4 p-2 !rounded-xl"
            expanded={props.expanded === props.name}
            onChange={handleChange(props.name)}
        >

            <AccordionSummary
                sx={{ justifyContent: "space-between" }}
                expandIcon={<ExpandMoreIcon />}
            >

                    <div className='text-xl'>{props.name}</div>
                    <LoadingButton
                        className='p-0 m-0 h-fit'
                        loading={isFetching}
                        loadingPosition='end'
                        endIcon={<QueryIndicatorIcon isError={isError || (data && data.success === false)} isSuccess={isSuccess} />}
                        variant='outlined'
                        onClick={(e) => {
                            e.stopPropagation()
                            props.setExpanded(props.name)
                            refetch();
                            queryClient.invalidateQueries({ queryKey: props.task.url })
                        }}>
                            test

                    </LoadingButton>

            </AccordionSummary>
            <CodeBlock data={{ URL: props.task.url }} initialExpandLevel={1} heading="URL" />
            {/* <Editor 
                theme='vs-dark'
                height={'50vh'}
                defaultLanguage='json'
                defaultValue={JSON.stringify(props.task, null, '\t')}
                onMount={handleEditorDidMount}
                className='m-4 !rounded-xl'
            /> */}
            <CodeEditor data={JSON.stringify(props.task, null, '\t')} editorRef={editorRef} heading={'Body'} readOnly={isFetching}/>
            {/* <Button onClick={handleClick}>Show Data</Button>
            <CodeBlock data={{ task: props.task }} initialExpandLevel={2} heading="Body" /> */}
            <CodeBlock data={data || error} initialExpandLevel={1} heading="Result" />
        </Accordion>
    )
}