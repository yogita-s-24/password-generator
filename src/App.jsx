import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useCallback - useCallback is a React Hook that lets you cache a function definition between re-renders.
  // Syntax -   const cachedFn = useCallback(fn, dependencies)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*[]{}~'"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  //useref hook
  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select(); // Select the text inside the input element
    passwordRef.current?.setSelectionRange(0, 99); // set the selection range for copying to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-3 my-10 bg-gray-900 text-green-100'>
        <h1 className='text-4xl text-white text-center font-bold mt-8'>React-Locker-App</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4">
          <input type="text"
            placeholder='Passoword'
            value={password}
            className='outline-none w-full py-1 px-3 text-orange-500'
            readOnly
            ref={passwordRef}
          />

          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>Copy</button>

        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

            <label htmlFor='numberInput'>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='charInput'>Characters</label>


          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default App
