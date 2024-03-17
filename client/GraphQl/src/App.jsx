
import './App.css'
import { useQuery,gql} from '@apollo/client'

const query = gql`
  query{
    getodos{
     title
      completed
      user{
        name
        email
      }
    }
  }`

function App() {
  const {data,loading} = useQuery(query);

  if(loading){
    return <h1>Loading...</h1>
  }

 console.log(data)

  

  return(<div>
    <h1>GraphQl</h1>
    <div>
      {data.getodos.map((todo,index) => {
        return(
          <div key={index} className="card">
            <h2> Title:- {todo.title}</h2>
            <p>Completed:- {todo.completed ? "Completed" : "Not Completed"}</p>
            <p>Author:- {todo.user.name}</p>
            <p>Email:- {todo.user.email}</p>
          </div>
        )
      })}
    </div>
  </div>)
}

export default App
