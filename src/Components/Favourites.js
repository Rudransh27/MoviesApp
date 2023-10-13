import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Favourites extends Component {
   constructor(){
    super()
    this.state={
        genres:[],
        currentGenre:'All Genres',
        movies:[],
        currentText:'',
        limit:5,
        currentPage:1
    }
   }

   componentDidMount(){
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let data=JSON.parse(localStorage.getItem("favMovies") || "[]")
    let temp=[]
    data .forEach((movieObj)=>{
        if(!temp.includes(genreids[movieObj.genre_ids[0]])){
            temp.push(genreids[movieObj.genre_ids[0]]);
        }
    })
    temp.unshift("All Genres")

    this.setState({
      genres:[...temp],
      movies:[...data]
    })
   }


   handleGenreChange=(genre)=>{
       this.setState({
         currentGenre:genre
       })
   }

   sortPopularityDesc=()=>{
      let temp=this.state.movies;
      temp.sort(function(objA, objB){
        return objB.popularity-objA.popularity;
      })

      this.setState({
        movies:[...temp]
      })
   }

   sortPopularityAsc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA, objB){
      return objA.popularity-objB.popularity;
    })

    this.setState({
      movies:[...temp]
    })
   }

   sortRatingDesc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA, objB){
      return objB.vote_average-objA.vote_average;
    })

    this.setState({
      movies:[...temp]
    })
   }

   sortRatingAsc=()=>{
    let temp=this.state.movies;
    temp.sort(function(objA, objB){
      return objA.vote_average-objB.vote_average;
    })

    this.setState({
      movies:[...temp]
    })
   }

   handlePageChange=(page)=>{
    this.setState({
      currentPage:page
    })
   }

   handleDelete=(id)=>{
    let newArr=[]
    newArr=this.state.movies.filter((movieObj)=>movieObj.id!=id)

    this.setState({
      movies:[...newArr]
    })
    localStorage.setItem("favMovies",JSON.stringify(newArr)) 
   }

  render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
    let genreArr=[]
    if(this.state.currentText===''){
      genreArr=this.state.movies
    }
    else{
      genreArr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLowerCase();
        return title.includes(this.state.currentText.toLowerCase())
      })
    }

    if(this.state.currentGenre!='All Genres'){
      genreArr=this.state.movies.filter((movieObj)=>
        genreids[movieObj.genre_ids[0]]==this.state.currentGenre
      )
    }

    let page=Math.ceil(genreArr.length/this.state.limit)
    let pagesarr=[]

    for(let i=1; i<=page; i++)
    {
      pagesarr.push(i);
    }

    let si=(this.state.currentPage-1)*this.state.limit;
    let ei=si+this.state.limit
    genreArr=genreArr.slice(si, ei)
    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul class="list-group favourites-geners">
                    {
                        this.state.genres.map((genre)=>(
                            this.state.currentGenre==genre?
                            <li class="list-group-item btn" style={{background:"orange", color:'black', fontWeight:'bold'}} >{genre}</li>:
                            <li class="list-group-item btn" onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                        ))
                    }
                </ul>
              </div>
              <div className="col-lg-9 favourites-table col-sm-12">
                <div className="row">
                  <input type="text" className="group-text col" placeholder="Search" value={this.state.currentText} onChange={(e)=>this.setState({currentText:e.target.value})}/>
                  <input type="number" className="group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                </div>
                <div className="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><i class="fa-solid fa-sort-up po" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down po" onClick={this.sortPopularityAsc}></i></th>
                        <th scope="col"><i class="fa-solid fa-sort-up po" onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down po" onClick={this.sortRatingAsc}></i></th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            genreArr.map((movieObj)=>(
                                <tr>
                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.original_title} style={{width:'6rem', marginRight:'1rem'}}/>{movieObj.original_title}</td>
                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                <td>{movieObj.popularity}</td>
                                <td>{movieObj.vote_average}</td>
                                <td><button type="button" class="btn btn-warning" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                              </tr>
                            ))
                        }
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                <ul class="pagination">
                  {
                    pagesarr.map((page)=>(
                      <li class="page-item">
                      <a class="page-link po" onClick={()=>this.handlePageChange(page)}>
                        {page}
                      </a>
                    </li>
                    ))
                    }
                </ul>
              </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
