import Background from "../assets/Task Knight Assets/Background Assets/background_plains.png";
import Curtain from "../assets/Task Knight Assets/Background Assets/border_curtains.png";

function BackgroundGrid() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <img
        src={Background}
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      ></img>
      <img
        src={Curtain}
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      ></img>
    </div>
  );
}

export default BackgroundGrid;
