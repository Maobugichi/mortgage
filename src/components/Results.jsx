import empty from "../assets/images/illustration-empty.svg"
import { useEffect } from "react"

export default function Result({result,isMortgage,isRepaid}) {

    useEffect(() => {
        console.log(isRepaid)
    }, [isRepaid])

    
   return(
    <div className="bg-slate-900 lg:w-[48%] w-full lg:h-auto lg:min-h-[115vh] h-auto min-h-[100vh] lg:rounded-bl-[100px] lg:rounded-tr-3xl lg:rounded-br-3xl grid items-center lg:block">
        {Object.values(result).length == 2 && isRepaid ?
        <div className="lg:h-[90vh]  mt-5 h-[90%] w-[90%] mx-auto flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-white ">Your results</h3>
          <p className="w-[95%] text-slate-500">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayment again"</p>
         <div className="h-[75%] border-t-4 border-lime rounded-lg flex items-center bg-slater">
            <div className=" h-[60%] w-[90%] mx-auto flex flex-col gap-5">
             <div className="border-b border-slate-500 h-[60%]">
              <p className="text-slate-500">Your monthly repayments</p>
              <p className="text-[70px] text-lime">£{result.monthly}</p>
             </div>

             <div className=" h-[40%] flex flex-col justify-center gap-1">
               <p className="text-slate-300 font-semibold">Total youll repay over the term</p>
               <p className="text-xl font-semibold text-white">£{result.term}</p>
             </div>
            </div>
          </div>
        </div>

        :
        <div className="h-[390px]  lg:h-[90vh]  flex flex-col items-center justify-center">
        <img className="lg:h-[200px] h-[180px]" src={empty} alt="empty illustration" />
        <h2 className="text-2xl text-center text-white font-semibold lg:mb-4">Results shown here</h2>
        <p className="w-[80%] text-slate-100 text-center mx-auto">Complete the form andclick "calculate repayments" to see what your monthly repayments would be</p>
        </div>}
    </div>
   ) 
   

}