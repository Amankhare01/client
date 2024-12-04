import React from 'react'

const Categoryform = ({handleonsubmit,value,setValue}) => {
  return (
    <form action="">
        <div>
            <input type="text" className='form-control' placeholder='Enter new category' value={value} onChange={(e)=> setValue(e.target.value)}/>
        </div>
        <button type='submit' className='btn btn-primary m-2' onClick={handleonsubmit}>Submit</button>
    </form>
  )
}

export default Categoryform
