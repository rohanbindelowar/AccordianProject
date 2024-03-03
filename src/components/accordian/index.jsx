import React, { useState } from "react";
import data from "./data";
import "./style.css";


export default function Accordian(){
    const[seleted,setSelected] = useState(null)
    const[multipleSelection, setMultiSelection] = useState(false);
    const[multiple,setMultiple]=useState([])
    const [openAll, setOpenAll] = useState(false)

    function handleSingleSelection(getCurrentId){
        setSelected(getCurrentId==seleted?null:getCurrentId)
    }

    function handleMultipleSelection(getCurrentId){
        const copyMultiple = [...multiple]
        const findIndexOfCurrId = copyMultiple.indexOf(getCurrentId);

        if(findIndexOfCurrId<0){
            copyMultiple.push(getCurrentId);
        }
        else{
            copyMultiple.splice(findIndexOfCurrId,1);
        }
        setMultiple(copyMultiple);
    }
    function handleOpenAll(){
        setOpenAll(prevOpenall=>!prevOpenall);
    }

    return(
        <div className="wrapper">
            <div className="accordian">
                {
                    data && data.length>0? (
                        data.map((dataitem)=>(
                            <div className="item">
                                <div className="title"
                                onClick={()=> multipleSelection? handleMultipleSelection(dataitem.id):handleSingleSelection(dataitem.id)}
                                >
                                    <h3>{dataitem.question}</h3>
                                </div>
                                {seleted===dataitem.id || multiple.indexOf(dataitem.id)!==-1 || openAll?
                                <div className="content">{dataitem.answer}</div>
                                :null
                                }
                            </div>
                        ))
                    )
                    : <div>Data Not Found</div>
                }
            </div>
            <div>
                <button onClick={()=>setMultiSelection(!multipleSelection)}>Enable Multiple Selection</button>
                <button onClick={()=> handleOpenAll()}>{openAll? "Close All" :"Open All"}</button>
            </div>
        </div>
    );
}