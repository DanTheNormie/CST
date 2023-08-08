import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material';
import { styled, darken } from '@mui/material/styles';

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
  	
	:not(:first-child) {
		text-align:center;
	}
`)

const preventDrag = (e)=>{
    console.log('dragging...',e.type);
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
  }

const CreateMuiTable = ({ data }) => {
	if (!data || data.length === 0) {
		return null; // Handle empty data or invalid input
	}

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
						{data.map((item) => (
							<StyledTableRow key={item.id}>
								{headers.map((header) => (
									<StyledTableCell key={header}>{item[header]}</StyledTableCell>
								))}
							</StyledTableRow>
						))}
					</TableBody>
					</Table>
				</TableContainer>
      
    		</Paper>
		
	);
};

export default CreateMuiTable;