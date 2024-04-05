import { useState } from 'react'
import './App.css'
import { Digit0Button } from './gecko_generated/components/Digit0'
import { Digit1Button } from './gecko_generated/components/Digit1'
import { Digit2Button } from './gecko_generated/components/Digit2'
import { Digit3Button } from './gecko_generated/components/Digit3'
import { Digit4Button } from './gecko_generated/components/Digit4'
import { Digit5Button } from './gecko_generated/components/Digit5'
import { Digit6Button } from './gecko_generated/components/Digit6'
import { Digit7Button } from './gecko_generated/components/Digit7'
import { Digit8Button } from './gecko_generated/components/Digit8'
import { Digit9Button } from './gecko_generated/components/Digit9'

function App() {
  const [display, setDisplay] = useState(0)

  return (
    <>
      <input
        value={display}
        style={{ width: '120px', fontSize: '20px' }}
      />
      <div>
        <Digit7Button
          onClick={() => setDisplay(display * 10 + 7)}
        />
        <Digit8Button
          onClick={() => setDisplay(display * 10 + 8)}
        />
        <Digit9Button
          onClick={() => setDisplay(display * 10 + 9)}
        />
      </div>
      <div>
        <Digit4Button
          onClick={() => setDisplay(display * 10 + 4)}
        />
        <Digit5Button
          onClick={() => setDisplay(display * 10 + 5)}
        />
        <Digit6Button
          onClick={() => setDisplay(display * 10 + 6)}
        />
      </div>
      <div>
        <Digit1Button
          onClick={() => setDisplay(display * 10 + 1)}
        />
        <Digit2Button
          onClick={() => setDisplay(display * 10 + 2)}
        />
        <Digit3Button
          onClick={() => setDisplay(display * 10 + 3)}
        />
      </div>
      <div>
        <button onClick={() => setDisplay(0)}>C</button>
        <Digit0Button
          onClick={() => setDisplay(display * 10 + 0)}
        />
        <button
          onClick={() =>
            setDisplay(Math.floor(display / 10))
          }
        >
          ◀
        </button>
      </div>
    </>
  )
}

export default App
