import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  articles = []; //previously i add manully json data

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizedFirstLetter = (String) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("Hello i am a construcutor from news component");
    this.state = {
      //state values
      articles: this.articles,
      loading: false,
      page: 1, //2 pages in total
    };
    document.title = ` ${this.capitalizedFirstLetter(
      this.props.category
    )} - News `;
  }
  // ${this.props.apikey}
  async upDateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; //to fetch data
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    // console.log(data);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    //console.log(this);
    this.upDateNews();
  }
  //handling previous and next // 1 and 2 button
  handlePreviousClick = async () => {
    // console.log("1");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=766f4fe9e365416d8ea4d41f24c8fed8&page=${
    //   this.state.page - 1
    // }&pageSize = ${this.props.pageSize}`;
    // this.setState({ loading: true });
    // //to fetch data
    // let data = await fetch(url);
    // // console.log(data);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.upDateNews();
  };
  handleNextClick = async () => {
    // console.log("2");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=766f4fe9e365416d8ea4d41f24c8fed8&page=${
    //     this.state.page + 1
    //   }&pageSize = ${this.props.pageSize}`;

    //   //loader
    //   this.setState({ loading: true });

    //   //to fetch data
    //   let data = await fetch(url);
    //   // console.log(data);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.upDateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=766f4fe9e365416d8ea4d41f24c8fed8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedDate = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedDate.articles),
      totalResults: parsedDate.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center">
          Top News - {this.capitalizedFirstLetter(this.props.category)}
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<Spinner />}
          // style={{ overflow: hidden }}
        >
          {/* {this.state.loading && <Spinner />} */}
          {/* overflow hidden */}
          <div className="container my-3 ">
            <div className="row">
              {!this.state.loading && //false vayo vane load hune vayo
                this.state.articles.map((element) => {
                  /* 4*3 = 12  */
                  return (
                    <div className="col-md-4">
                      <NewsItem
                        key={element.url}
                        title={element.title}
                        description={element.description}
                        urlToImage={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          {/* <div
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="Toolbar with
        button groups"
        >
          <div className="btn-group me-2" role="group" aria-label="First group">
            <button
              disabled={this.state.page <= 1}
              onClick={this.handlePreviousClick}
              type="button"
              className="btn btn-outline-secondary"
            >
              Previous
            </button>
            <button
              onClick={this.handleNextClick}
              type="button"
              className="btn btn-outline-secondary"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next
            </button>
          </div>
        </div> */}
        </InfiniteScroll>
      </>
    );
  }
}
