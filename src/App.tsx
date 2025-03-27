import Message from "./Message";
import BackgroundGrid from "./ReactComponents/BackgroundGrid";
import Background from "./assets/Task Knight Assets/Background Assets/background_plains.png";

function App() {
  return (
    <section
      className="backgournd"
      style={{ backgroundImage: `url(${Background} )` }}
    >
      <div>
        <Message></Message>
      </div>
    </section>
  );
}

export default App;
