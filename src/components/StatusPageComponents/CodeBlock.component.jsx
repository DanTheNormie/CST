import { Divider } from '@mui/material';
import { useState } from 'react';
import { ObjectView } from 'react-object-view'

export default function CodeBlock({data, hidden, initialExpandLevel, heading}) {
    const [collapse, setCollapse] = useState(1)
    const theme = {
        scheme: "Material Darker",
        author: "Nate Peterson",
        base00: "#212121",
        base01: "#303030",
        base02: "#353535",
        base03: "#4A4A4A",
        base04: "#B2CCD6",
        base05: "#EEFFFF",
        base06: "#EEFFFF",
        base07: "#FFFFFF",
        base08: "#F07178",
        base09: "#F78C6C",
        base0A: "#FFCB6B",
        base0B: "#C3E88D",
        base0C: "#89DDFF",
        base0D: "#82AAFF",
        base0E: "#C792EA",
        base0F: "#FF5370",
    };

    const json = [
        {
            "domain_name":"1337x",
            "urls":[
                {
                    "name": "Search",
                    "task":{
                        "url":"https://1337x.unblockit.rsvp/search/{{search_text}}/{{page_number}}/",
                        "params":{
                            "search_text":{
                                "value":"spiderman",
                                "default":"Avengers",
                                "required":true
                            },
                            "page_number":{
                                "default":1,
                                "required":true
                            }
                        },
                        "selectors":[
                            {
                                "name":"title",
                                "format":"array",
                                "target":"innerText",
                                "selector":"tbody tr .coll-1.name a:nth-child(2)"
                            },
                            {
                                "name":"seeders",
                                "format":"array",
                                "target":"innerText",
                                "selector":"tbody tr .coll-2.seeds"
                            },
                            {
                                "name":"leechers",
                                "format":"array",
                                "target":"innerText",
                                "selector":"tbody tr .coll-3.leeches"
                            },
                            {
                                "name":"size",
                                "format":"array",
                                "target":"innerText",
                                "selector":"tbody tr .coll-4.size"
                            }
                        ],
                        "result":{
                            "format":"array",
                            "data":["title","seeders","leechers","size"]
                        }
                    }
                }
            ]
        },
        {
            "domain_name":"Pirate-Bay",
            "urls":[
                {
                    "name":"Search",
                    "task": {
                        "url": "https://pirate-proxy.mov/search.php?q={{search_text}}",
                        "params": {
                            "search_text": {
                                "default": "spiderman",
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
                            }
                        ],
                        "result": {
                            "format": "array",
                            "data": [
                                "title",
                                "seeders",
                                "leechers",
                                "size",
                                "uploaded_by",
                                "uploaded_on",
                                "magnet_link"
                            ]
                        }
                    }
                }
            ]
        },
        {
            "domain_name":"Binge-Watch",
            "urls":[
                {
                    "name": "Search",
                    "task":{
                        "url": "https://bingewatch.to/search?keyword={{search_text}}",
                        "params": {
                            "search_text": {
                                "default": "spiderman",
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
    ]

    const options={
        expandLevel: initialExpandLevel ,
        displayEntriesMaxCount: 4
    }
    return (
    <div className='bg-[rgb(33,33,33)] p-4 rounded-lg m-4'>
        <Divider>{heading}</Divider>
        <div className={` ${hidden} overflow-hidden my-4`}>
        <ObjectView
            data={data}
            options={options}
            palette={theme}/>
        </div>
    </div>
    )
}