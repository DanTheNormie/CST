import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Divider } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';

const CodeEditor = ({heading, data, editorRef, readOnly}) => {
    const [editorData, setEditorData] = useState('')


    function handleEditorDidMount(editor, monaco){
        editorRef.current = editor
    }
    const options = {
        readOnly: readOnly,
        minimap:  {enabled : false} 
    };

    const onFormatClick = async ()=>{
        editorRef.current.getAction('editor.action.formatDocument').run();
    }

    const onResetClick = ()=>{
        editorRef.current.setValue(data)
    }

    return (
      <div className='bg-[#1e1e1e] p-4 rounded-lg m-4'>
        <Divider>{heading}</Divider>
        
        
        <Editor 
            theme='vs-dark'
            height={'50vh'}
            defaultLanguage='json'
            defaultValue={data}
            value={editorData}
            onMount={handleEditorDidMount}
            className='m-4 !rounded-xl'
            options={options}
        />
        <div className=''>
            <Divider textAlign='right'>
                <div className='flex !w-full'>
                    <Button startIcon={<AutoAwesomeIcon/>} variant='outlined' color='secondary' onClick={onFormatClick} className='!mx-4'>Format</Button>
                    <Divider orientation='vertical' flexItem variant='middle'/>
                    <Button startIcon={<HistoryIcon/>} variant='outlined' color='success' onClick={onResetClick} className='!mx-4'>Reset</Button>
                </div> 
            </Divider>
        </div>
      </div>
      
    );
  };
  
  export default CodeEditor;