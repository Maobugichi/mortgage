import { useState,useRef } from "react";
import Form from "./Form";
import Result from "./Results";

export default function Main() {
  const [isMortgage, setMortgage] = useState({
    amount:"",
    term:"",
    interest:""
  })
  const [isShow,setShow] = useState(null)
  const [result, setResult] = useState({})
  const [isRepaid, setIsRepaid] = useState()
  const refi = useRef(null)

  function clear() {
    setMortgage(
      {amount:"",
      term:"",
      interest:"",
      repaid:""}
    )

    setIsRepaid(null)
    setResult({})
    setShow("hidden")
   refi.current.querySelectorAll('input').forEach(item => {
    if (item.type !== "radio") {
      item.classList.remove("border-red")
      item.classList.add("border-slate-500")
      item.nextElementSibling.classList.add("hidden")
      item.nextElementSibling.classList.remove("block")
      item.previousElementSibling.classList.add("bg-slate-100","text-slate-700")
      item.previousElementSibling.classList.remove("bg-red","text-slate-100")
      item.classList.remove("border-lime")
    }
       
   })
  }

  return(
    <main className="overflow-hidden font-custom-font lg:h-[130vh] h-[190vh]  bg-green-300 lg:grid lg:items-center">
      <section className=" shadow-lg lg:w-[80%]  lg:mx-auto lg:pl-6 lg:h-auto lg:min-h-[110vh] h-auto min-h-[180vh]  lg:rounded-3xl justify-between flex lg:flex-row flex-col w-full  items-center">
        <div ref={refi} className="h-auto   lg:min-h-[100vh]  lg:w-1/2 w-full">
         <div className="h-[80px] flex w-[90%] lg-h-[85%] mx-auto justify-between items-center">
           <h1 className="text-2xl text-slate-900 font-semibold">Mortgage Calculator</h1>
           <span onClick={clear} className="transition-all duration-200 hover:border-b-2 border-slate-300 ">Clear All</span>
         </div>
         <Form 
         isMortgage={isMortgage}
         setMortgage={setMortgage}
         result={result}
         setResult={setResult}
         setIsRepaid={setIsRepaid}
         isShow={isShow}
         setShow={setShow}
         />
        </div> 
      
        <Result
         result={result}
         setResult={setResult}
         isMortgage={isMortgage}
         isRepaid={isRepaid}
        
        />
      </section>  
    </main>
  )
}