import logo from './Food_Network_logo.png';
import './App.css';

function App() {
  const buttonStyle = {
    width: '200px',
    height: '50px',
    fontSize: '20px',
    backgroundColor: 'white',
  };

  function handleClick() {
    window.location.href = 'recipe-list.html';
  }
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
        <a href='recipe.html'><button onClick={handleClick} style={buttonStyle}>Find Recipes</button></a>
      </header>
    </div>
  );
}

export default App;
