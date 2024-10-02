import './App.css'
import BoardView from './Board'

function App() {
  return <BoardView />

  // return <>
  //   <div className="container">
  //     <div className="row">
  //       <div className="col-12">
  //         <div class="input-group mb-3">
  //           <span class="input-group-text">
  //             <i className="fas fa-circle-arrow-right"></i>
  //           </span>
  //           <div class="form-floating">
  //             <input type="text" className="form-control form-control-sm" name="invoiceFrom" placeholder='Invoice From' />
  //             <label htmlFor="floatingInput">From Invoice No</label>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-12">
  //         <div class="input-group mb-3">
  //           <span class="input-group-text">
  //             <i className="fas fa-circle-arrow-right"></i>
  //           </span>
  //           <div class="form-floating">
  //             <input type="text" className="form-control form-control-sm" name="invoiceTo" placeholder='Invoice To' />
  //             <label htmlFor="floatingInput">To Invoice No</label>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </>

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
