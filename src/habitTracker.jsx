import "../component/habitCard.tsx";
import ConstellationTracker from "../component/habitCard.tsx";
import "../component/star-node.tsx";
import HabitDetails from "../component/habitDetails.tsx";
("../component/HabitDetails.tsx");
import "./index.css";

function habitTracker() {
  return (
    //Out Div is the webpage itsel
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0f172a",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <div>
        {Array.from({ length: 800 }).map((_, i) => (
          <div
            key={`bg-star-${i}`}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: 0.7,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${
                1 + Math.random() * 1
              }s ease-in-out infinite ${Math.random() * 3}s`,
            }}
          />
       ))}
         <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
      </div>

      <div
        style={{
          flex: 1,
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <HabitDetails />
      </div>

      {/*Container For Constailation*/}
      <div
        style={{
          flex: 2,
          margin: 1,
          //border: '3px solid green'
          // border: '1px dashed white', // Uncomment if you want to see it

        }}>
          <ConstellationTracker days={6} />
      </div>
      
      <div style={{
        flex: 1,
        paddingLeft: '1rem', 
        paddingRight: '1rem',
      }}>
          <HabitDetails/>
      </div>
       
      </div>
    
       
      
   

  );
}
export default habitTracker;
