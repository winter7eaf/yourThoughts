import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Select from 'react-select'

// import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'

function SurveyList() {
  const [surveyList, setSurvey] = useState([])
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleResults, setModuleResults] = useState(null);

  useEffect(() => {
    // async function fetchSurvey(){
    //   const response = await fetch('http://127.0.0.1:8000/api/');
    //   response.json()
    //       .then(response => setSurvey(response.response))
    //       .catch(err => setErrors(err));
    // }
    // fetchSurvey();
    setSurvey([
      {
        // "id": 1,
        "module": "Module 1",
        "questions": [
          {
            "question": "Question 1",
            "answers": ["Answer 1", "Answer 2", "Answer 3"]
          },
          {
            "question": "Question 2",
            "answers": ["Answer 1", "Answer 2", "Answer 3"]
          }
        ]
      },
      {
        "module": "Team Project",
        "questions": [
          {
            "question": "Question 1",
            "answers": ["Answer 1", "Answer 2", "Answer 3"]
          },
          {
            "question": "Question 2",
            "answers": ["Answer 1", "Answer 2", "Answer 3"]
          }
        ]
      }
    ])
  }, [])

  const options = surveyList.map(survey => ({value: survey.module, label: survey.module}));

  const handleChange = async selectedOption => {
  setSelectedModule(selectedOption);
  const response = await axios.get(`http://127.0.0.1:8000/api/results/${selectedOption.value}`);
  setModuleResults(response.data);
};

  return (
    <div>
      <h2>survey:</h2>
      <Select options={options} onChange={handleChange}/>
      <p>Selected Module: {selectedModule ? selectedModule.label : 'None'}</p>
      {moduleResults && (
        <div>
          <h3>Results for {selectedModule.label}:</h3>
          {/* Display the results here */}
        </div>
      )}
    </div>
  );

  // const getSurvey = async () => {
  //   const response = await fetch('http://127.0.0.1:8000/api/')
  //   const data = response.json()
  // }
  //
  // return (
  //       <div>
  //           <h2>feedback:</h2>
  //           {surveyList.map((feedback, index) => {
  //               return (
  //                   <div className="feedback-item" key={index}>
  //                     <Select options={[{ value: feedback.module, label: feedback.module }]} />
  //                       <p>{feedback.module}</p>
  //                   </div>
  //               );
  //           })}
  //       </div>
  //   );
}

export default SurveyList;
// const SurveyList = ({ surveys, isLoading, setSurvey }) => {
//
//   const [editText, setEditText] = useState({
//     'module': ''
//   })
//
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
//       const newList = todos.filter(todo => todo.id !== id)
//       setTodos(newList)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   const handleEdit = async (id, value) => {
//     try {
//       const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
//       console.log(response.data);
//       const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
//       setTodos(newTodos)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   const handleChange = (e) => {
//     console.log(e.target.value);
//     setEditText(prev => ({
//       ...prev,
//       'module': e.target.value
//     }))
//     console.log(editText);
//   }
//
//   const handleClick = () => {
//     handleEdit(editText.id, editText)
//     setEditText({
//       'module': ""
//     })
//   }
//
//   const handleCheckbox = (id, value) => {
//     console.log(value.completed);
//     handleEdit(id, {
//       'completed': !value
//     })
//   }
//
//
//   return (
//     <div>
//       <table className='w-11/12 max-w-4xl'>
//         <thead className='border-b-2 border-black'>
//           <tr>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Created</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? <div>Is Loading </div> :
//             <> {todos.map((todoItem, index) =>
//             (
//               <tr key={todoItem.id} className='border-b border-black'>
//                 <td className='p-3'>
//                   <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
//                     className='inline-block cursor-pointer'>{todoItem.completed === true ? <MdOutlineCheckBox /> :
//                       <MdOutlineCheckBoxOutlineBlank />}
//                   </span>
//                 </td>
//                 <td className='p-3 text-sm ' title={todoItem.id}>{todoItem.body}</td>
//                 <td className='p-3 text-sm text-center'>
//                   <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-300' : 'bg-red-300'}`}>
//                     {todoItem.completed ? 'Done' : 'Incomplete'}
//                   </span>
//                 </td>
//                 <td className='p-3 text-sm font-medium'>{new Date(todoItem.created).toLocaleString()}</td>
//                 <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5 '>
//                   <span><label htmlFor="my-modal" ><MdEditNote onClick={() => setEditText(todoItem)} className=' text-xl cursor-pointer' /></label></span>
//                   <span className=' text-xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>
//
//                 </td>
//               </tr>
//             )
//             )}</>}
//         </tbody>
//       </table>
//
//       {/* Modal */}
//       <input type="checkbox" id="my-modal" className="modal-toggle" />
//       <div className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Edit Todo</h3>
//           <input type="text" value={editText.body} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full mt-8" />
//           <div className="modal-action">
//             <label htmlFor="my-modal" onClick={handleClick} className="btn btn-primary">Edit</label>
//             <label htmlFor="my-modal" className="btn">Close</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default SurveyList;