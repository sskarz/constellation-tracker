import '../component/habitCard.tsx'
import ConstellationTracker from '../component/habitCard.tsx';
import '../component/star-node.tsx'
import StarNode from '../component/star-node.tsx'
import './index.css'

function habitTracker() {

  return (
    //Out Div is the webpage itsel
    <div style={{
      
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0f172a', 
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      
    }}>
      {Array.from({ length: 800 }).map((_, i) => (
          <div
            key={`bg-star-${i}`}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              backgroundColor: 'white',
              borderRadius: '50%',
              opacity: 0.7,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      
      <h1
        style={{
          border: '3px solid white'
        }}
      >
        Habit Page
      </h1> 

      {/*Container For Constailation*/}
      <div style={{
        width: '30%',
        height: '30%',
        //border: '3px solid white'
        // border: '1px dashed white', // Uncomment if you want to see it
      }}>
        <ConstellationTracker days={6}/>
      </div>
      

    </div>
  );
}
export default habitTracker;