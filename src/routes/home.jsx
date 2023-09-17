import { useState } from 'react';
import SearchBar from '../components/HomePageComponents/SearchBar.component';
import SearchTabs from '../components/HomePageComponents/SearchTabs';


export default function Homepage() {

    const [searchData, setSearchData] = useState({searchString:'',searchArray:[]})
	
	return (
		<div className='flex flex-col items-center justify-center !w-[90%] max-w-[1742px]'>
			<SearchBar setSearchData={setSearchData}/>

			<SearchTabs searchData={searchData}/>

		</div>

	);
}

