
import '../component/habitCard.tsx'
import ConstellationTracker from '../component/habitCard.tsx';
import '../component/star-node.tsx'
import StarNode from '../component/star-node.tsx'
import './index.css'

//sad significatn change
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
      {Array.from({ length: 1000 }).map((_, i) => (
          <div
            key={`bg-star-${i}`}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              backgroundColor: 'white',
              borderRadius: '50%',
              opacity: 0.7,
              top: `${Math.random() * 110}%`,
              
              left: `${Math.random() * 110}%`,
              animation: `twinkle ${1+ Math.random() * 1}s ease-in-out infinite ${Math.random() * 5}s`,
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
        //border: '3px solid red'
        // border: '1px dashed white', // Uncomment if you want to see it
      }}>
        <ConstellationTracker days={6}/>
      </div>
      

    </div>
  );
   
  
}

export default habitTracker
