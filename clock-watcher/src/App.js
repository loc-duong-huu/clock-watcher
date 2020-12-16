import logo from './logo.svg';
import './App.css';
import ClockWatcher from './components/clock-watcher.js'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

<ClockWatcher utc={'Asia/Singapore'} id={'1'} />
<br />
<ClockWatcher utc={'America/Bahia'} id={'2'} />
<br />
<ClockWatcher utc={'Indian/Maldives'} id={'3'} />
    </div>
  );
}

export default App;
