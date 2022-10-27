import { useEffect, useState } from 'react';

function News(props) {

    function getNews(){
        const query = `https://content.guardianapis.com/search?&q=${props.location}&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}&order-by=relevance&section=unitedkingdom`
        console.log(query)
        fetch(query)
        .then((response) => response.json())
        .then((data) => console.log(data))
    }

    useEffect(() => {
        getNews();
    }, []);

    return(
        <div> 
            News
        </div>
    )
};

export default News;