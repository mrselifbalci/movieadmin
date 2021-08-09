export const COLUMNS = [
    {
      Header: 'NO',
      accessor: 'id', 
      Cell: ({ row }) => {
        return <p>{row.index + 1}</p>
      }
    }, 
    {
      Header: 'TYPE',
      accessor: 'type', // accessor is the "key" in the data 
      Cell:({row})=>{
        return row.original.type ? row.original.type.slice(0,1).toUpperCase() + row.original.type.slice(1) : null
     }
    },
    {
      Header: 'NAME',
      accessor: 'title',
      Cell:({row})=>{
        return <span>{row.original.title && row.original.title.slice(0,25)}</span>  }
    },
    {
      Header: 'YEAR',
      accessor: 'createdAt',
      Cell:({row})=>{
        return <span>{row.original.createdAt.slice(0,10)}</span>
     }
    },
    {
      Header: 'IMDB',
      accessor: 'imdb', 
    
    },
    {
      Header: 'RATING',
      accessor: 'userRating',
      Cell:({row})=>{
        return row.original.userRating.length !==0 ? ((row.original.userRating.reduce((a,b)=> (a*1+b*1))/4+row.original.imdb*1)/2).toFixed(1) : null
     }
     
    },
  ];