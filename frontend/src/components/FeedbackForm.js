import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FeedbackForm = () => {
    const [materialRating, setMaterialRating] = useState(0);
    const [materialReview, setMaterialReview] = useState('');
    const [lecturerRating, setLecturerRating] = useState(0);
    const [lecturerReview, setLecturerReview] = useState('');
    const [module, setModule] = useState('');
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [materialRatingError, setMaterialRatingError] = useState('');
    const [lecturerRatingError, setLecturerRatingError] = useState('');
    const [moduleError, setModuleError] = useState('');

    useEffect(() => {
        const fetchModules = async () => {
            const response = await axios.get('http://localhost:8000/api/modules/');
            setModules(response.data);
        };

        fetchModules();
    }, []);

    const moduleOptions = modules.map(mod => ({value: mod.id, label: mod.title}));

    const handleModuleChange = selectedOption => {
        setSelectedModule(selectedOption);
        setModule(selectedOption.value);
        setModuleError('');
    };

    const validateRating = (rating) => {
        const numRating = Number(rating);
        return numRating >= 0 && numRating <= 5;
    };

    const handleMaterialRatingChange = (e) => {
        const rating = e.target.value;
        setMaterialRating(rating);
        setMaterialRatingError(validateRating(rating) ? '' : 'Rating must be between 0 and 5');
    };

    const handleLecturerRatingChange = (e) => {
        const rating = e.target.value;
        setLecturerRating(rating);
        setLecturerRatingError(validateRating(rating) ? '' : 'Rating must be between 0 and 5');
    };

    const isSubmitDisabled =
        !validateRating(materialRating) || !validateRating(lecturerRating) || !selectedModule;

    const handleSubmit = async () => {
        if (!selectedModule) {
            setModuleError('Please select a module');
            return;
        }
        const feedback = {
            student: 2,
            academicYear: 1,
            module: module,
            materialQuestion: 'material_question',
            lecturerQuestion: 'lecturer_question',
            materialRating,
            materialFeedback: materialReview,
            lecturerRating,
            lecturerFeedback: lecturerReview,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/newfeedback/', feedback);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form>
            <h1>Feedback Form</h1>
            <Form.Group className="mb-3">
                <Form.Label>Module</Form.Label>
                <Select
                    value={selectedModule}
                    onChange={handleModuleChange}
                    options={moduleOptions}
                />
                {moduleError && <div style={{color: 'red'}}>{moduleError}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Material Rating:</Form.Label>
                <Form.Control type="number" min="0" max="5" value={materialRating}
                              onChange={handleMaterialRatingChange}/>
                {materialRatingError && <div style={{color: 'red'}}>{materialRatingError}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Material Review:</Form.Label>
                <Form.Control as="textarea" rows={3} value={materialReview}
                              onChange={e => setMaterialReview(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Lecturer Rating:</Form.Label>
                <Form.Control type="number" min="0" max="5" value={lecturerRating}
                              onChange={handleLecturerRatingChange}/>
                {lecturerRatingError && <div style={{color: 'red'}}>{lecturerRatingError}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Lecturer Review:</Form.Label>
                <Form.Control as="textarea" rows={3} value={lecturerReview}
                              onChange={e => setLecturerReview(e.target.value)}/>
            </Form.Group>
            <Button variant="info" disabled={isSubmitDisabled} onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
};

export default FeedbackForm;

    // const [academicYear, setAcademicYear] = useState('2023-24');

    // const validateRating = (rating) => {
    //     if (rating < 0 || rating > 5) {
    //         return 'Rating must be between 0 and 5';
    //     }
    //     return '';
    // };
    //
    // const handleMaterialRatingChange = (e) => {
    //     const rating = e.target.value;
    //     setMaterialRatingError(validateRating(rating));
    //     if (!materialRatingError) {
    //         setMaterialRating(rating);
    //     }
    // };
    //
    // const handleLecturerRatingChange = (e) => {
    //     const rating = e.target.value;
    //     setLecturerRatingError(validateRating(rating));
    //     if (!lecturerRatingError) {
    //         setLecturerRating(rating);
    //     }
    // };
    //
    // const isSubmitDisabled =
    //     !validateRating(materialRating) || !validateRating(lecturerRating);

// import React, {useEffect, useState, useCallback} from 'react';
// import axios from 'axios';
// import 'survey-core/defaultV2.min.css';
// import * as Survey from 'survey-react-ui';
// import {Model} from "survey-core";
//
// const FeedbackForm = () => {
//     const [materialRating, setMaterialRating] = useState(0);
//     const [materialReview, setMaterialReview] = useState('');
//     const [lecturerRating, setLecturerRating] = useState(0);
//     const [lecturerReview, setLecturerReview] = useState('');
//     const [academicYear, setAcademicYear] = useState('2023-24');
//     const [module, setModule] = useState('');
//
//     const handleSubmit = async () => {
//         const feedback = {
//             materialRating,
//             materialReview,
//             lecturerRating,
//             lecturerReview,
//             academicYear,
//             module,
//         };
//
//         try {
//             const response = await axios.post('http://localhost:8000/api/newfeedback/', feedback);
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Feedback Form</h1>
//             <label>
//                 Module:
//                 <select value={module} onChange={e => setModule(e.target.value)}>
//                     {modules.map((mod, index) => (
//                         <option key={index} value={mod}>
//                             {mod}
//                         </option>
//                     ))}
//                 </select>
//             </label>
//             <label>
//                 Material Rating:
//                 <input type="number" value={materialRating} onChange={e => setMaterialRating(e.target.value)}/>
//             </label>
//             <label>
//                 Material Review:
//                 <textarea value={materialReview} onChange={e => setMaterialReview(e.target.value)}/>
//             </label>
//             <label>
//                 Lecturer Rating:
//                 <input type="number" value={lecturerRating} onChange={e => setLecturerRating(e.target.value)}/>
//             </label>
//             <label>
//                 Lecturer Review:
//                 <textarea value={lecturerReview} onChange={e => setLecturerReview(e.target.value)}/>
//             </label>
//             <button onClick={handleSubmit}>Complete</button>
//         </div>
//     );
// };
//
// export default FeedbackForm;

// const FeedbackForm = ({setForm, fetchData}) => {
//     const [newForm, setNewForm] = useState({
//         'academicYear': '2023-24',
//         'moduleName': '',
//         'materialQuestion': '',
//         'lecturerQuestion': '',
//         'materialRating': 0.0,
//         'materialFeedback': '',
//         'lecturerRating': 0.0,
//         'lecturerFeedback': ''
//     });
//
//     const surveyJson = {
//         "pages": [
//             {
//                 "name": "page1",
//                 "elements": [
//                     {
//                         "type": "rating",
//                         "name": "question1",
//                         "title": "Material Rating:",
//                         "isRequired": true,
//                         "rateType": "stars"
//                     },
//                     {
//                         "type": "comment",
//                         "name": "question2",
//                         "title": "Material Review"
//                     },
//                     {
//                         "type": "rating",
//                         "name": "question3",
//                         "title": "Lecturer Rating",
//                         "rateType": "stars"
//                     },
//                     {
//                         "type": "comment",
//                         "name": "question4",
//                         "title": "Lecturer Review"
//                     }
//                 ]
//             }
//         ]
//     };
//
//     const survey = new Model(surveyJson);
// survey.onComplete.add(function (sender, options) {
//   // Display the "Saving..." message (pass a string value to display a custom message)
//   options.showSaveInProgress();
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "http://127.0.0.1:8000/api/newfeedback/");
//   xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//   xhr.onload = xhr.onerror = function () {
//     if (xhr.status == 200) {
//       // Display the "Success" message (pass a string value to display a custom message)
//       options.showSaveSuccess();
//       // Alternatively, you can clear all messages:
//       // options.clearSaveMessages();
//     } else {
//       // Display the "Error" message (pass a string value to display a custom message)
//       options.showSaveError();
//     }
//   };
//   xhr.send(JSON.stringify(sender.data));
// });
//
//     return (
//         <div>
//             <Survey.Survey model={survey}/>
//         </div>
//     );
// };
//
// export default FeedbackForm;

// const handleChange = (e) => {
//     const value = e.target.value;
//     setNewForm(prev => ({
//         ...prev,
//         [e.target.name]: e.target.name === 'materialRating' || e.target.name === 'lecturerRating' ? parseFloat(value) : value
//     }));
// };
//
// const postSurvey = async () => {
//     try {
//         const response = await axios.post('http://127.0.0.1:8000/api/newfeedback/', newForm);
//         console.log(response.data);
//         setNewForm({'moduleName': 'new module'}, {'materialQuestion': 'test question'}, {'lecturerQuestion': 'test question 2'});
//         setForm(prevSurvey => [...prevSurvey, newForm]);
//         fetchData();
//     } catch (error) {
//         console.log(error);
//     }
// };


// const survey = new Survey.Model(surveyJson);
//
// const alertResults = useCallback((sender) => {
//     const results = sender.data;
//     const mappedResults = {
//         'academicYear': results.academicYear,
//         'moduleName': results.moduleName,
//         'materialQuestion': results.question2,
//         'lecturerQuestion': results.question4,
//         'materialRating': parseFloat(results.materialRating),
//         'materialFeedback': results.materialFeedback,
//         'lecturerRating': parseFloat(results.lecturerRating),
//         'lecturerFeedback': results.lecturerFeedback
//     };
//
//     setNewForm(mappedResults);
//     postSurvey();
//     // const results = JSON.stringify(sender.data);
//     // alert(results);
//     // Here you can send the results to your server
// }, []);

// survey.onComplete.add(alertResults);

{/*<input type="text" placeholder="Add FeedbackForm" value={newForm.module}*/
}
{/*    className="input input-bordered input-info w-full max-w-xs"*/
}
{/*    onChange={handleChange}*/
}
{/*    onKeyDown={(e) => {*/
}
{/*        if (e.key === 'Enter') {*/
}
{/*            postSurvey();*/
}
{/*        }*/
}
{/*    }} />*/
}
{/*<button onClick={postSurvey} className="btn btn-primary ml-2">Add FeedbackForm</button>*/
}

// const handleChange = (e) => {
//     const value = e.target.value;
//     setNewForm(prev => ({
//         ...prev,
//         [e.target.name]: e.target.name === 'questions' ? value.split(',') : e.target.name === 'materialRating' ? parseFloat(value) : value
//     }));
// };

// const FeedbackForm = ({ setForm, fetchData }) => {
//
//     const [newForm, setNewForm] = useState({
//         'module': '',
//       'question': [],
//       'materialRating': 0.0
//     })
//
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setNewForm(prev => ({
//         ...prev,
//         [e.target.name]: e.target.name === 'questions' ? value.split(',') : e.target.name === 'materialRating' ? parseFloat(value) : value
//     }));
// }
//
//     // const handleChange = (e) => {
//     //     setNewForm(prev => ({
//     //         ...prev,
//     //         'module': e.target.value
//     //       [e.target.name]: e.target.name === 'questions' ? value.split(',') : e.target.name === 'materialRating' ? parseFloat(value) : value
//     //     }))
//     // }
//
//     const postSurvey = async () => {
//         try {
//             await axios.post(`http://127.0.0.1:8000`, newForm)
//             setNewForm({ 'module': '' })
//             setForm(prevSurvey => [...prevSurvey, newForm])
//             fetchData()
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     // const handleKeyDown = (e) => {
//     //     if (e.key === 'Enter') {
//     //         postTodo();
//     //     }
//     // }
//
//   const surveyJson = {
//         "pages": [
//   {
//    "name": "page1",
//    "elements": [
//     {
//      "type": "rating",
//      "name": "question1",
//      "title": "Material Rating:",
//      "isRequired": true
//     }
//    ]
//   }
//  ]
//     };
//
//   const feedback = new Survey.Model(surveyJson);
//   feedback.onComplete.add((sender, options) => {
//         console.log(JSON.stringify(sender.data, null, 3));
//     });
//   // const alertResults = useCallback((sender) => {
//   //   const results = JSON.stringify(sender.data);
//   //   alert(results);
//   //   // saveSurveyResults(
//   //   //   "https://your-web-service.com/" + SURVEY_ID,
//   //   //   sender.data
//   //   // )
//   // }, []);
//   //
//   // feedback.onComplete.add(alertResults);
//
//   return <Survey model={feedback} />;
//
//
//
//     // return (
//     //     <>
//     //         <input type="text" placeholder="Add FeedbackForm" value={newForm.module}
//     //             className="input input-bordered input-info w-full max-w-xs"
//     //             onChange={handleChange}
//     //             onKeyDown={(e) => {
//     //                 if (e.key === 'Enter') {
//     //                     postSurvey();
//     //                 }
//     //             }} />
//     //         <button onClick={postSurvey} className="btn btn-primary ml-2">Add FeedbackForm</button>
//     //     </>
//     // )
// }
//
// export default FeedbackForm;

// function FeedbackForm() {
// 	const [appState, setAppState] = useState("");
//
// 	const fetchData = async () => {
// 		try {
// 			const response = await axios.get('http://127.0.0.1:8000');
// 			setForm(response.data)
// 		} catch (error){
// 			console.log(error);
// 		}
// 	}
// 	return (
// 		<div className="App">
// 			<h1>Latest Posts</h1>
//
// 		</div>
// 	);
// }
