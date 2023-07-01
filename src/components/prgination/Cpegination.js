
import { Pagination} from '@mui/material'
import React from 'react'



const Cpegination = ({setpage,numOfPage=10}) => {

    const handelclick =(page)=>{
            setpage(page)
            window.scroll(0,0)
    }
  return (
    <div 
    style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        marginTop:10

    }}
    >
      <Pagination onClick={(e)=>handelclick(e.target.textContent)} color="primary" count={numOfPage}/>
      
    </div>
  )
}

export default Cpegination
