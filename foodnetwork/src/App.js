import logo from './Food_Network_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-welcome">
          <b>Welcome to the Food Network!</b>
        </p>
        <p>
          Separate inputs with commas.
        </p>
        {/* Ingredient input box */}
        <p>Enter ingredients</p>
        <input type="text" placeholder="i.e. Eggs, flour, sugar, etc." />
        {/* Dietary Restriction input box */}
        <p>Enter dietary restrictions</p>
        <input type="text" placeholder="i.e. Keto, vegetarian, etc." />
        {/* Search button with padding*/}
        <br />
        <button>Find recipes</button>
      </header>
    </div>
  );
}

export default App;
