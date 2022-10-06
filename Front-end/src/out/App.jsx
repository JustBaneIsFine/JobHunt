import React from 'react';
import './App.css';
function App() {
    return (<div className='App'>
			<header className='App-header'>
				<img src={'./desktop.jpeg'} className='App-logo' alt='logo'/>
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
		</div>);
}
function sendRequest() {
    const xhr = new XMLHttpRequest();
    const url = '/intro';
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
    };
    xhr.send('hloi');
}
sendRequest();
export default App;
