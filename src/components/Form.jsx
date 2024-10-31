import cal from "../assets/images/icon-calculator.svg"
import { useRef,useState, useEffect } from "react";

export default function Form({isMortgage,setMortgage,setResult,setIsRepaid,isShow,setShow}) {
 
const spanRef = useRef(null)

const [checked,setChecked] = useState(false)
const divRef = useRef(null)

 useEffect(() => {
  setShow("hidden")
  divRef.current.querySelectorAll('input').forEach(item => {
    if (item.type == "radio") {
      item.classList.remove("h-[60px]")
      item.classList.add("h-5")
    }
  })
 }, [])

 function submit(e) {
   e.preventDefault();
   setIsRepaid(isMortgage.repaid)
   isMortgage.repaid ? setShow("hidden") : setShow("block")
   const re = divRef.current.querySelectorAll('input').forEach(item => {
     if (item.value == "" && item.type !== "radio") {
        item.classList.add("border-red")
        item.classList.remove("border-slate-500")
        item.nextElementSibling.classList.remove("hidden")
        item.classList.remove("border-lime")
        item.nextElementSibling.classList.add("block")
        item.previousElementSibling.classList.add("bg-red", "text-slate-100")
        item.previousElementSibling.classList.remove("bg-slate-100","text-slate-700")
        setResult({})
     } else if (item.value && item.type !== "radio") {
        item.classList.remove("border-red")
        item.classList.add("border-slate-500")
        item.nextElementSibling.classList.add("hidden")
        item.nextElementSibling.classList.remove("block")
        item.previousElementSibling.classList.add("bg-slate-100","text-slate-700")
        item.previousElementSibling.classList.remove("bg-red","text-slate-100")
        item.classList.remove("border-lime")
        const principle = isMortgage.amount
        const years = isMortgage.term
        const interestRate = isMortgage.interest
        function calculateMortgage(principle,years,interestRate) {
           const monthlyInt = (interestRate / 100) / 12
           const numYrs = years * 12
           const monthlyPayment = principle * monthlyInt * (1 + monthlyInt) ** numYrs / ((1 + monthlyInt) ** numYrs - 1)
           return monthlyPayment
        }
        const monthlyRepayment = calculateMortgage(principle,years,interestRate)
        function calculateTotal(years,monthlyRepayment) {
           const fullTerm = years * 12 * monthlyRepayment
           return fullTerm
        }
        const term = calculateTotal(years,monthlyRepayment)
        setResult({
          monthly:monthlyRepayment.toLocaleString('en-GB', {minimumFractionDigits:2,maximumFractionDigits:2}),
          term: term.toLocaleString('en-GB', {minimumFractionDigits:2,maximumFractionDigits:2})
        })
     }
     item.checked = false
    })
    
    setMortgage({
      amount:"",
      term:"",
      interest:""
    })
 }

 return(
    <form ref={divRef} onSubmit={submit} className=" w-[90%] lg:w-[85%] mx-auto h-auto min-h-[80vh] pb-10  lg:min-h-[85vh]   flex flex-col gap-4 lg:justify-between">
      <div className="  relative flex flex-col gap-2 mb-3 h-[120px] ">
        <label htmlFor="amount">Mortgage Amount</label> 
        <p className="absolute top-[28.3%]  w-[50px] left-[1px] bg-slate-100 rounded-l lg:h-[46px] h-[54.6px] text-2xl text-slate-700 flex items-center justify-center">£</p>
        <Input
          id="amount"
          name="amount"
          value={isMortgage.amount}
          setMortgage={setMortgage}
          width="w-full"
          checked={checked}
          setChecked={setChecked}
        />
        <span className={`text-red hidden`}>This field is required</span>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between mb-3 lg:min-h-[120px]  h-auto min-h-[230px]  gap-3">
        <div className="flex flex-col lg:w-[48%] w-full gap-1 relative h-auto min-h-[130px] lg:h-[120px]">
            <label htmlFor="term">Mortgage Term</label>
            <p className="absolute  top-[23%] lg:top-[23%]  w-[90px]  right-[0.5%] bg-slate-100 rounded-r lg:h-[46px] h-[56px] text-2xl text-slate-700 flex items-center justify-center">years</p>
            <Input
            id="term"
            name="term"
            value={isMortgage.term}
            setMortgage={setMortgage}
            width="w-full"
            checked={checked}
            setShow={setShow}
            />
             <span className={`text-red hidden`}>This field is required</span>
        </div>

        <div className="flex flex-col lg:w-[48%] w-full gap-1 relative h-auto min-h-[130px] lg:h-[120px]">
       
           <label htmlFor="interest">Morgage Interest</label>
           <p className="absolute  top-[23.2%] lg:top-[23%] w-[50px] right-[0.4%] bg-slate-100 rounded-r lg:h-[46px] h-[55.9px] text-2xl text-slate-700 flex items-center justify-center">%</p>
            <Input
             id="interest"
             name="interest"
             value={isMortgage.interest}
             setMortgage={setMortgage}
             width="w-full"
             checked={checked}
             setChecked={setChecked}
             setShow={setShow}
            />
             <span className={`text-red hidden`}>This field is required</span>
        </div>
      </div>

       <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="">Manage Type</label>
        <div className="transition-all duration-300 hover:bg-slate-100/20 flex items-center h-[60px] border-2 border-slate-500 hover:border-lime rounded-md gap-2 pl-5">
          <Input
            id="repayment"
            type="radio"
            name="repayment"
            value={isMortgage.repayment}
            setMortgage={setMortgage}
             checked={checked}
             setChecked={setChecked}
             setShow={setShow}
          />
          <label htmlFor="">Repayment</label>
        </div>

        <div className="transition-all duration-300 hover:bg-slate-100/20 flex items-center h-[60px] border-2 border-slate-500 rounded-md gap-2 pl-5 hover:border-lime">
          <Input
           type="radio"
            name="repayment"
            value={isMortgage.repayment}
            setMortgage={setMortgage}
            setShow={setShow}
          />
          <label htmlFor="">Interest Only</label>
        </div>
        <span ref={spanRef} className={`text-red ${isShow}`}>This field is required</span>
       </div>
       <Button/>
    </form>
  )
}


function Input({type="text",value,name,setMortgage,width="w-5",checked,setShow}) {
    function getInputValue(e) {
      if (!isNaN(e.target.value)) {
        setMortgage(prev => {
          return {
           ...prev,
           [e.target.name]: e.target.value,
          }
          })
      
      
          if (e.target.type !== "radio") {
            e.target.classList.remove("border-slate-500")
            e.target.classList.add("border-lime")
            e.target.previousElementSibling.classList.remove("bg-slate-100","text-slate-100")
            e.target.previousElementSibling.classList.remove("bg-red")
            e.target.previousElementSibling.classList.add("bg-lime","text-slate-900")
          }
      
      
          if (e.target.type == "radio") {
              console.log(e.target.checked)
              e.target.classList.add("accent-lime")
              setMortgage(prev => {
                  return {
                    ...prev,
                   repaid:  e.target.checked 
                  }
              })
          }
      
      } else {
        if (e.target.type !== "radio") {
          e.target.classList.add("border-slate-500")
          e.target.classList.remove("border-lime")
          e.target.previousElementSibling.classList.add("bg-slate-100","text-slate-700")
          e.target.previousElementSibling.classList.remove("bg-red")
          e.target.previousElementSibling.classList.remove("bg-lime","text-slate-900")
        }
      }
   
  }
  return <input onChange={getInputValue}  className={`text-xl transition-all duration-300 hover:border-slate-900 pl-[15%] border-2 lg:h-[50px] h-[60px] ${width} rounded-md border-slate-500`} type={type} value={value} name={name}/>
}

function Button() {
    return <button className="transition-all duration-300 hover:bg-lime/60 lg:h-[52px] h-[52px] rounded-full flex items-center justify-center bg-lime lg:w-[70%] w-full gap-3 text-xl "><img src={cal} alt="calculator icon" /> Calculate Repayments</button>
}