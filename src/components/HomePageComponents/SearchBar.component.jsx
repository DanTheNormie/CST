import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import { Divider } from '@mui/material';
import './SearchBar.styles.css'
import { Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function SearchBar({setSearch}) {

    const handleSearchOnClick = (e) => {
        e.preventDefault()
        const input_value = document.getElementById('input').value
        setSearch(input_value)
    }

    return (
        <div className="text-field !w-[80%] !mt-[5vh]">
            <form className='flex items-center' onSubmit={handleSearchOnClick}>
                <input type="text" id="input" className="input" required placeholder='Search...' />
                <div className="underline" />
                <div className='default-underline'></div>
                <IconButton className='search-btn' type='submit'><Search /></IconButton>
            </form>
        </div>
    )
}