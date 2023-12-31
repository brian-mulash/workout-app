/* eslint-disable react/prop-types */
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {BiTrash} from 'react-icons/bi'
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({workout}) => {

    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch(`http://localhost:4500/api/workouts/${workout._id}`, {
            method: 'DELETE',
        });

        const json = await response.json();
        
        if (response.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: json
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>

            <p>
                <strong>Load (kg): </strong>
                {workout.loads}
            </p>

            <p>
                <strong>Reps: </strong>
                {workout.reps}
            </p>

            <p>
                {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}
            </p>

            <span onClick={handleClick}>
                <BiTrash />
            </span>
        </div>
    )
}

export default WorkoutDetails