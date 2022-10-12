import React, { Fragment,useState, useEffect  } from "react";
import { Link } from "react-router-dom";

const BlogPosts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=>{
const dataget=async()=>{
  try {
   const response= await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2022-09-12&sortBy=publishedAt&apiKey=6c724583b6e74a349f7e512e42fa41a4`);
   if(!response.ok){
    throw new Error(
      `This is an HTTP error: The status is ${response.status}`
    );
   }
   let realdata= await response.json();
   setData(realdata);
   setError(null);
  } 
  catch (error) {
    setError(error.message);
    setData(null);
  }
  finally{
    setLoading(false)
  }
}
dataget()
  },[])
 

  return (
    <Fragment>
       {loading && <div>A moment please...</div>}
       {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
       {data &&
          data.articles.map(({ title,description,urlToImage,publishedAt}) => (
      <div className="col-lg-6 col-md-6 col-sm-12">
      
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
              <img
                src={urlToImage}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>publishedAt</li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    4 <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
               {title}
              </Link>
            </h4>
            <p>
             {description}
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       ))}
    </Fragment>
  );
};

export default BlogPosts;
