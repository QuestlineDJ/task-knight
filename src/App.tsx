import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="levelup">
          <img
            src={"src/assets/Task Knight Assets/Corner UI/emptyLevelBadge.png"}
            alt="Player level number"
          />
        </div>
        <div className="gold">
          <img
            src={"src/assets/Task Knight Assets/Corner UI/goldBag.png"}
            alt="Player gold amount"
          />
        </div>
        <div className="player">
          <img
            src={
              "src/assets/Task Knight Assets/Character UI & Sprites/playerCharacter_default.png"
            }
            alt="The player character, a small knight"
          />
        </div>
        <div className="boss">
          <img
            src={
              "src/assets/Task Knight Assets/Character UI & Sprites/boss_dragon.png"
            }
            alt="The boss the player is fighting"
          />
        </div>
        <div className="main">
          <img
            src={
              "src/assets/Task Knight Assets/Main Panel/Task Panel/panel_tasks.png"
            }
            alt="The main panel containing the player's tasks"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
