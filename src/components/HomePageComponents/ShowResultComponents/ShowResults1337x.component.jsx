import * as React from 'react';
import { useQuery } from "react-query";
import { LOCAL_BASE_URL } from "../../../config/config";
import _ from 'lodash'
import { IconButton } from "@mui/material";
import {BsMagnetFill} from 'react-icons/bs'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material';
import { styled, darken } from '@mui/material/styles';
import { useEffect } from 'react';

const fetch_data = async (searchText) => {
	const baseUrl = `${LOCAL_BASE_URL}/api/getDataFrom1337x`;
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

const preventDrag = (e) => {
	console.log('dragging...', e.type);
	e.stopPropagation()
	e.nativeEvent.stopImmediatePropagation();
}

export default function ShowResults1337x({ searchText, setLoading, loadingIndex, isLoadingIndicatorOn }) {

	const { isLoading, isError, data, error, isSuccess,  } = useQuery(
		['search 1337x',searchText], 
		()=>fetch_data(searchText),
		{
			enabled: true,
			refetchOnWindowFocus: false,
			retry: false,
			staleTime:1000,
			cacheTime:1000
		}
	)
	
	if(isLoading) {
		if(!isLoadingIndicatorOn)setLoading(loadingIndex, true)
		return <div className="flex justify-center items-center">Loading...</div>
	}

	if(isError) {
		if(isLoadingIndicatorOn)setLoading(loadingIndex, false)
		return <div className="flex justify-center items-center">Something went wrong</div>
	}
	
	if(isLoadingIndicatorOn)setLoading(loadingIndex, false)
	if(!data) return <div>No Data</div>
	if(!data.success) return <div>{data.message}</div>
	
	return <CreateMuiTable data={data} />
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => `
  	color: ${theme.palette.primary.main};
  	text-align:center;
  	cursor:pointer;
  	:hover {
    	color: ${darken(theme.palette.primary.main, 0.2)} !important;
  	}
`)

const StyledTableCell = styled(TableCell)(({ theme }) => `
  	
	:not(:first-of-type) {
		text-align:center;
	}
	:first-of-type{
		padding:0px 10px;
	}

	padding:15px 0px;
`)


const CreateMuiTable = ({ data }) => {
	if (!data || !data.data || data.length === 0) {
		return null; // Handle empty data or invalid input
	}

	data = data.data.map(obj => {
		console.log(obj);
		/* if(obj.status === 'fulfilled'){ */
			/* obj = obj.value; */
			const newObj = _.cloneDeep(obj);

			newObj['title'] = <a href={`https://1337x.unblockit.rsvp${obj['torrent_details_page_link']}`} target="_blank">{obj['title']}</a>
			delete newObj['torrent_details_page_link'];
			
			newObj['magnet_link'] = <IconButton href={obj['magnet_link']}><BsMagnetFill/></IconButton>
			
			return newObj;
		/* } */
		/* return null */
	});
	console.log('logging, ',data[0])
	const headers = Object.keys(data[0]);

	return (	
		<Paper sx={{ width: '100%', overflow: 'hidden' , display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
						{headers.map((header) => { 
							if (header) return <StyledTableHeadCell className='' key={header}>{header.toLocaleUpperCase()}</StyledTableHeadCell> }
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item, i) => {if(item !== null){
						return (
							<StyledTableRow >
								{headers.map((header) => (
									<StyledTableCell key={header}>{item[header]}</StyledTableCell>
								))}
							</StyledTableRow>
						)
					}})}
				</TableBody>
				</Table>
			</TableContainer>
    	</Paper>
		
	);
};