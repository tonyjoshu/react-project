import * as React from 'react'
import './loader.css'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader() {
  return (
    <div className="loading-wrapper" >
        <div className="loading-div" style={{marginTop:'20%'}}>
            <CircularProgress  sx={{
                  animationDuration: '1000ms',
            }}/>
        </div>
    </div>    
  );
}