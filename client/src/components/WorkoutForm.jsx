import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [loads, setLoads] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, loads, reps}
        
        const response = await fetch('http://localhost:4500/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoads('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout is added', json)
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />


            <label>load (kg)</label>
            <input type="number" onChange={(e) => setLoads(e.target.value)} value={loads}
                className={emptyFields.includes('loads') ? 'error' : ''}
            />

            <label>reps</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>

            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm