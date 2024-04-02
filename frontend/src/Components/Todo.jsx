import { useState } from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";


export default function Todo({ value, handleDelete, handleUpdate }) {
    console.log(value)
    const [isChecked, setIsChecked] = useState(value.status)
    const handleStatus = async () => {
        setIsChecked(!isChecked)
        await fetch(`/todos/${value._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: !isChecked })
        })
    }

    return (
        <Box key={value._id} width='100%' display='flex' justifyContent='space-between'>

            <Box display={'flex'} alignItems={'center'}>
                <Checkbox checked={isChecked} onChange={handleStatus} sx={{
                    color: '#d32f2f',
                    '&.Mui-checked': {
                        color: '#d32f2f',
                    },
                }} />
                <div className={isChecked ? "line" : ""} >{value.todo}</div>
            </Box>
            <Box>
                <IconButton size="large" onClick={() => handleUpdate(value)}  >
                    <FaEdit size={25} />
                </IconButton>

                <IconButton size="large" onClick={() => handleDelete(value._id)}  >
                    <IoClose size={25} />
                </IconButton>
            </Box>
        </Box>
    )
}

