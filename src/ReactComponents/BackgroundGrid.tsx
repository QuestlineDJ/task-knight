import Background from "../assets/Task Knight Assets/Background Assets/background_plains.png";

function BackgroundGrid() {
  return (
    <section
      className="backgournd"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div></div>
    </section>
  );
}

export default BackgroundGrid;
