import { useState } from "react";
import Form from "./Form";
import Result from "./Results";

export default function Main() {
  const [isMortgage, setMortgage] = useState({
    amount:"",
    term:"",
    interest:""
  })
  const [result, setResult] = useState({})
  const [isRepaid, setIsRepaid] = useState()

  function clear() {
    setMortgage(
      {amount:"",
      term:"",
      interest:"",
      repaid:""}
    )

    setIsRepaid(null)
    setResult({})
  }

  return(
    <main className="overflow-x-hidden font-custom-font lg:h-[130vh] h-[250vh] bg-slate-900   bg-green-300 lg:grid lg:items-center">
      <section className="bg-lime shadow-lg lg:w-[80%]  lg:mx-auto lg:pl-6 lg:h-auto lg:min-h-[110vh] h-auto min-h-[140vh]   lg:rounded-3xl justify-between flex lg:flex-row flex-col w-full  items-center">
        <div className="h-auto   lg:min-h-[100vh]   lg:w-1/2 w-full">
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