
export const COLUMNS = [

    
    {
        Header:"QUESTION",
        accessor:"question",
        Cell:({row})=>{
            return row.original.question ? row.original.question.slice(0,1).toUpperCase() + row.original.question.slice(1) : null
         }
    },
    {
        Header:"ANSWER",
        accessor:"answer",
        Cell:({row})=>{
           return <span>{row.original.answer && row.original.answer.slice(0,40)}...</span>
        }
       
    },
    {
        Header:"STATUS", 
        accessor:"isActive",
        Cell:({row})=>{
            return row.original.isActive === true ? <span>Active</span> : <span>Block</span>
        }
    }


    
]

