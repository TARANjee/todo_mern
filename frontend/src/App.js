import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box,FormControl} from '@mui/material';
import './App.css';
import Todo from './Components/Todo';

export default function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('')
 
  async function fetchTodos() {
    let res = await fetch('/todos')
    let data = await res.json()
    setTodo(data)
  }
  useEffect(() => {

    fetchTodos()
  }, [editing])


  const handleUpdate = (todo) => {
    setInput(todo.todo)
    setId(todo._id)
    setEditing(true)
  }



  const handleDelete = async (id) => {
    console.log(id)
    try {
      let res = await fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error.message)
    }

    const newTodo = todo.filter((todo) => todo._id !== id);
    setTodo(newTodo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing === false) {
      setTodo((prev) => [...prev, { todo: input }])
      let res = await fetch('/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: input })
      })
    }
    else {
      let res = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: input })
      })

      setEditing(false)
    }


    setInput('')
  }

  return (

    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height='100vh'
      width='100%'
      sx={{ background: 'linear-gradient(to bottom, #430089, #82ffa1)' }}>
      <Card sx={{ minWidth: 500, minheight: 500, borderRadius: 5 }} >
        <CardContent>

          <Typography sx={{ fontStyle: 'italic', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
            To-Do List
          </Typography>
          <form onSubmit={handleSubmit}>
            {editing ? (
              <FormControl sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }} >
                <TextField type='text' value={input} onChange={(e) => setInput(e.target.value)} variant="outlined" placeholder="Add Your Task" sx={{ backgroundColor: "#efefef", width: "85%" }} />
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#ef5350", ":hover": { backgroundColor: '#d32f2f' }, }} >
                  Update
                </Button>
              </FormControl>
            ) : (
              <FormControl sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }} >
                <TextField type='text' value={input} onChange={(e) => setInput(e.target.value)} variant="outlined" placeholder="Add Your Task" sx={{ backgroundColor: "#efefef", width: "85%" }} />
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#ef5350", ":hover": { backgroundColor: '#d32f2f' }, }} >
                  Add
                </Button>
              </FormControl>
            )}
          </form>
          <Box marginTop={2}>
            {todo.map((value, index) => (
              <Todo key={index} value={value} handleDelete={handleDelete} handleUpdate={{ handleUpdate }} />
            ))}
          </Box>


        </CardContent>

      </Card>

    </Box >
  );
}


