import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, urlToImage, newsUrl, url, author, date, source } =
      this.props; //destructuring
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem;" }}>
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {" "}
            {source}{" "}
          </span>
          <img
            src={
              urlToImage
                ? urlToImage
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
            }
            className="card-img-top"
            alt="..."
            height={"200px"}
            width={"200px"}
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 45) : ""}</h5>
            <p className="card-text">
              {description ? description.slice(0, 85) + "..." : ""}
            </p>
            <p className="card-text">
              <small class="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
