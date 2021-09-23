import React from 'react';
import AppNavigation from './app/navigation/AppNavigation';

// const App = () => {
//   function traer() {
//     fetch('http://192.168.0.16:8080/genre/')
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//       })
//   }

//   traer()
// };

function App(){
  return <AppNavigation/>
}

export default App;
