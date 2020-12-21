import React, { useContext } from 'react'
import { Context } from '../context/context'

const Alert = () => {

    const { alertMessage, setAlertMessage } = useContext(Context);

    const onAlertClose = () => {
        setAlertMessage('')
    }

    return (
        <div className='alert'>
            <span>{alertMessage}</span>
            <button className='button' onClick={onAlertClose}>&times;</button>
        </div>
    )
}

export default Alert
