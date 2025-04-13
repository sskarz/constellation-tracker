
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
        width: '70vw',
        height: '70vh',
        borderColor: 'white',
        borderWidth: '10px',
        
        // border: '1px dashed white', // Uncomment if you want to see it
      }}>
        
        <ConstellationTracker days={6}/>
      </div>
    </div>
  );
   
  
}

export default App
