import React from "react";
import { useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import Masonry from 'react-masonry-css';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
 import { getNewsItems } from "../Store/Action/index";



const Home = ()=>{
         const newsItems= useSelector((state)=>{
            return state.news;
         });
        const dispatch = useDispatch();
        useEffect(
            ()=>{
                dispatch(getNewsItems());
            },
            [dispatch]
        );

    return(
    <React.Fragment>
       <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {
            newsItems.news?(
                newsItems.news.map((item)=>(
                    <div key={item._id}>
                        <img src={item.image} alt={item.image} style={{ width: '100%', height: '250px' }} />
							<div className="content">
								<div className="title">{item.title}</div>
								<div className="excerpt">{item.body}</div>
								<LinkContainer to={`/news/${item._id}`}>
									<Button variant="light" className="mt-3">
										Read More
									</Button>
								</LinkContainer>
							</div>
                    </div>
                ))
            ):null
        }

       </Masonry>
    </React.Fragment>
    )
}

export default Home;