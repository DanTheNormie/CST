import { useState } from 'react';
import SearchBar from '../components/HomePageComponents/SearchBar.component';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';
import Tabs from '../components/HomePageComponents/ResultTabs.component'

/* // import required modules
import { Keyboard, Pagination, Navigation, FreeMode, Controller } from 'swiper/modules';
import { Thumbs } from 'swiper/modules';
const catalog = {
    "success": true,
    "data": [
        {
            "domain_name": "1337x",
            "urls": [
                {
                    "name": "Search",
                    "task": {
                        "url": "https://1337x.unblockit.rsvp/search/{{search_text}}/1/",
                        "params": {
                            "search_text": {
                                "default": "Avengers",
                                "required": true
                            },
                            "page_number": {
                                "default": 1,
                                "required": true
                            }
                        },
                        "selectors": [
                            {
                                "name": "title",
                                "format": "array",
                                "target": "innerText",
                                "selector": "tbody tr .coll-1.name a:nth-child(2)"
                            },
                            {
                                "name": "seeders",
                                "format": "array",
                                "target": "innerText",
                                "selector": "tbody tr .coll-2.seeds"
                            },
                            {
                                "name": "leechers",
                                "format": "array",
                                "target": "innerText",
                                "selector": "tbody tr .coll-3.leeches"
                            },
                            {
                                "name": "size",
                                "format": "array",
                                "target": "innerText",
                                "selector": "tbody tr .coll-4.size"
                            },
                            {
                                "name": "uploaded_on",
                                "format": "array",
                                "target": "innerText",
                                "selector": "tbody tr .coll-date"
                            },
                            {
                                "name": "torrent_details_page_link",
                                "format": "array",
                                "target": "href",
                                "selector": ".coll-1.name > a:nth-child(2)"
                            }
                        ],
                        "result": {
                            "format": "array",
                            "parentElementSelector": "tbody > tr",
                            "data": [
                                "title",
                                "seeders",
                                "leechers",
                                "size",
                                "uploaded_on",
                                "torrent_details_page_link"
                            ]
                        }
                    }
                },
                {
                    "name": "Details",
                    "task": {
                        "url": "{{torent_details_url}}",
                        "params": {
                            "torent_details_url": {
                                "default": "https://1337x.unblockit.rsvp/torrent/3911065/Avengers-Endgame-2019-WEBRip-1080p-YTS-YIFY/",
                                "required": true
                            }
                        },
                        "selectors": [
                            {
                                "name": "magnet_link",
                                "format": "single",
                                "target": "href",
                                "selector": ".dropdown-menu li:last-child > a"
                            }
                        ],
                        "result": {
                            "format": "single",
                            "data": [
                                "magnet_link"
                            ]
                        }
                    }
                }
            ]
        },
        {
            "domain_name": "Pirate-Bay",
            "urls": [
                {
                    "name": "Search",
                    "task": {
                        "url": "https://pirate-proxy.mov/search.php?q={{search_text}}",
                        "params": {
                            "search_text": {
                                "default": "spidermanssxxxs",
                                "required": true
                            }
                        },
                        "selectors": [
                            {
                                "name": "title",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".list-entry .list-item.item-name.item-title a"
                            },
                            {
                                "name": "seeders",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".list-entry .list-item.item-seed"
                            },
                            {
                                "name": "leechers",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".list-entry .list-item.item-leech"
                            },
                            {
                                "name": "size",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".list-entry .list-item.item-size"
                            },
                            {
                                "name": "uploaded_by",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".list-entry .list-item.item-user a"
                            },
                            {
                                "name": "uploaded_on",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".list-entry .list-item.item-uploaded label"
                            },
                            {
                                "name": "magnet_link",
                                "format": "array",
                                "target": "href",
                                "selector": ".list-entry .item-icons a"
                            },
                            {
                                "name": "torrent_details_page_link",
                                "format": "array",
                                "target": "href",
                                "selector": ".list-entry > .list-item.item-title > a"
                            }
                        ],
                        "result": {
                            "format": "array",
                            "parentElementSelector": ".list-entry",
                            "data": [
                                "title",
                                "seeders",
                                "leechers",
                                "size",
                                "uploaded_by",
                                "uploaded_on",
                                "magnet_link",
                                "torrent_details_page_link"
                            ]
                        }
                    }
                }
            ]
        },
        {
            "domain_name": "Binge-Watch",
            "urls": [
                {
                    "name": "Search",
                    "task": {
                        "url": "https://bingewatch.to/search?keyword={{search_text}}",
                        "params": {
                            "search_text": {
                                "default": "spidermanasdasxc",
                                "required": true
                            }
                        },
                        "selectors": [
                            {
                                "name": "title",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".movie-name"
                            },
                            {
                                "name": "img_url",
                                "format": "array",
                                "target": "src",
                                "selector": ".movie-thumbnail > a > img"
                            },
                            {
                                "name": "details_link",
                                "format": "array",
                                "target": "href",
                                "selector": ".movie-link"
                            },
                            {
                                "name": "info",
                                "format": "array",
                                "target": "innerText",
                                "selector": ".info-split"
                            }
                        ],
                        "result": {
                            "format": "array",
                            "parentElementSelector": ".section-items.section-items-default > .item",
                            "data": [
                                "title",
                                "img_url",
                                "info",
                                "details_link"
                            ]
                        }
                    }
                }
            ]
        }
    ],
    "message": "Data fetched successfully"
} */



export default function VerticalTabs() {
    const [search_text, setSearch_text] = useState('no-string')
	
	return (
		<div className='flex flex-col items-center justify-center !w-[90%] max-w-[1742px]'>
			<SearchBar setSearch={setSearch_text}/>

			<br /><br />

			<Tabs searchText={search_text} setSearch={setSearch_text}/>
		</div>

	);
}

