
import '../component/habitCard.tsx'
import ConstellationTracker from '../component/habitCard.tsx';
import '../component/star-node.tsx'
import StarNode from '../component/star-node.tsx'
import './index.css'
function App() {


  return (
     
     <div style={{
      height: '100vh',
      backgroundColor: 'midnightblue',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '80vw',
        height: '80vh',
        borderColor: 'white',
        borderWidth: '10px',
        backgroundColor: 'black',
        // border: '1px dashed white', // Uncomment if you want to see it
      }}>
        
        <ConstellationTracker days={30}/>
      </div>
    </div>
  );
   
  
}

export default App
