import './App.css'
import Donkey from './pages/Donkey'
import HomePage from './pages/HomePage'

function App() {
  console.log('App')
  return (
    <>
      <div className='bg-blue-400 flex max-w-2xl'>
          <h2 className='bg-yellow-400 '> Amazon kodddk </h2>         
          <Donkey/>
          <HomePage/>
      </div>
    </>
  )
}

export default App
