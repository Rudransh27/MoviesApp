import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage:1,
      moviesArr:[],
      favourites:[]
    };
  }


  async componentDidMount(){
    // we will do here all the sideeffect work
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=65bcbf47255c0db59cf73691b458eec9&page=${this.state.currPage}`)
    let data=res.data
    console.log(data)
    console.log('moutning done')

    this.setState({
        moviesArr:[...data.results]
    })
  }

   changeMovies=async()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=65bcbf47255c0db59cf73691b458eec9&page=${this.state.currPage}`)
    let data=res.data
    console.log(data)

    this.setState({
        moviesArr:[...data.results]
    })
  }

  handleRight=()=>{
    let temparr=[]
    for(let i=1; i<=this.state.parr.length+1; i++){
       temparr.push(i);
    }
    this.setState({
        parr:[...temparr],
        currPage:this.state.currPage+1
    },this.changeMovies)
  }

  handleLeft=()=>{
    let temparr=[]
    if(this.state.currPage!=1){
        this.setState({
            currPage:this.state.currPage-1
        }, this.changeMovies)
    }
  }

  handleClick=(value)=>{
    if(value!=this.state.currPage){
        this.setState({
            currPage:value
        }, this.changeMovies)
    }
  }

  handleFavourites=(movie)=>{
     let oldData=JSON.parse(localStorage.getItem("favMovies") || "[]")
     if(this.state.favourites.includes(movie.id)){
      oldData=oldData.filter((m)=>m.id!=movie.id)
     }else{
       oldData.push(movie)
     }
     localStorage.setItem("favMovies", JSON.stringify(oldData))
     console.log(oldData)
     this.handleFavouritesState()
  }

  handleFavouritesState=()=>{
    let oldData=JSON.parse(localStorage.getItem("favMovies") || "[]")
    let temp=oldData.map((movie)=>movie.id);
    this.setState({
      favourites:[...temp]
    })
  }
  render() {
    // let moviesArr = movies.results;
    console.log("render")
    return (
      <div>
        <>
          {this.state.moviesArr.length == 0 ? (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div>
              <h3 className="text-center" style={{ marginTop: "1rem" }}>
                <strong>Trending</strong>
              </h3>
              <div className="movies-list">
                {this.state.moviesArr.map((movieObj) => (
                  <div
                    className="card movies-card"
                    onMouseEnter={() => this.setState({ hover: movieObj.id })}
                    onMouseLeave={() => this.setState({ hover: "" })}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                      alt={movieObj.title}
                      className="card-img-top movies-img"
                      style={{ height: "40vh" }}
                    />
                    <h5 className="card-title movies-title">
                      {movieObj.original_title}
                    </h5>
                    <div
                      className="button-wrapper movies-button"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.hover == movieObj.id && (
                        <a className="btn btn-primary" onClick={()=>this.handleFavourites(movieObj)}>
                          {this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                  <li class="page-item">
                      <a class="page-link po" onClick={this.handleLeft}>
                        Previous
                      </a>
                    </li>
                    {this.state.parr.map((value) => (
                      <li class="page-item po">
                        <a class="page-link" onClick={()=>this.handleClick(value)}>
                          {value}
                        </a>
                      </li>
                    ))}
                    <li class="page-item po">
                      <a class="page-link" onClick={this.handleRight}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </>
      </div>
    );
  }
}
