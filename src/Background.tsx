import scenery from "./assets/Task Knight Assets/Background Assets/background_plains.png";
import curtain from "./assets/Task Knight Assets/Background Assets/border_curtains.png";
import taskpanel from "./assets/Task Knight Assets/Main Panel/Task Panel/panel_tasks.png";
function Background() {
  return (
    <div
      className="fullBackground"
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <img
        src={scenery}
        alt="scenery"
        style={{
          position: "absolute",
          top: "50%",
          left: "47%",
          transform: "translate(-50%, -50%)",
          width: "93%",
          height: "100%",
          objectFit: "cover",
        }}
      ></img>
      <img
        src={curtain}
        alt="curtain"
        style={{
          position: "absolute",
          top: "50%",
          left: "47%",
          transform: "translate(-50%, -50%)",
          width: "93%",
          height: "100%",
          objectFit: "cover",
        }}
      ></img>
      <img
        src={taskpanel}
        alt="taskpanel"
        style={{
          position: "absolute",
          top: "68%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "68%",
          height: "60%",
        }}
      ></img>
    </div>
  );
}

export default Background;
