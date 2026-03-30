import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Register from './register';
import Product from './Product';
function App() {
  return (
    <div className="App">
      {/* <ol>
        <li>Gerbera</li>
        <li>rose</li>
        <li>jasmine</li>
        <li>Lotus</li>
        <li>marigold</li>
        <li>Orchid</li>
        <li>Carnation</li>
      </ol> */}
       <About></About>
       <Register></Register>

       <Product></Product>
      {/* <Login></Login> */}
      {/* <Hello></Hello>
     
      <Contact></Contact> */}
    </div>
  );
}
function Hello() {
  return (
    <div><h2>Hello Component</h2>
      <h3>Welcome to child component</h3>
    </div>

  )
}

function About(){
  return(
    <div>
      <h2>About us</h2>
      <h3>Transflower Agro services</h3>
    </div>
  )
}

function Contact(){
  return(
  <div>
    <h2>Contact Us</h2>
  <h3>Transflower Farms</h3>
  <p>Tambademala</p>
  <p>manchar tal.ambegaon</p>
  </div>
  ) 
}

export default App;
