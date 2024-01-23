// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // import * as serviceWorker from './serviceWorker';
// import './index.css';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import App from './App';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
//
// const root = document.getElementById('root');
// //ReactDOM.createRoot(root).render(<App />);
// ReactDOM.createRoot(root).render(
//     <React.StrictMode>
//         <Router>
//             <Routes>
//                 <Route path="/" element={<App/>}/>
//             </Routes>
//         </Router>
//     </React.StrictMode>
// );
//
// // const routing = (
// //         <React.StrictMode>
// //             {/*<Header />*/}
// //             <Router>
// //                 <Routes>
// //                 <Route exact path="/" element={<App />} />
// //             </Routes>
// //             </Router>
// //             {/*<Footer />*/}
// //         </React.StrictMode>
// // );
//
// //ReactDOM.render(routing, document.getElementById('root'));
//
// // serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
