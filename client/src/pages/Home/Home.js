import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Panel from "../../components/Panel";
import Form from "../../components/Form";
import Article from "../../components/Article";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import Saved from "../Saved";

class Home extends Component {
  state = {
    article: [],
    q: "",
    start_year: "",
    end_year: "",
    message: "Search For Articles To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getArticle = () => {
    API.getArticle({
      q: this.state.q,
      start_year: this.state.start_year,
      end_year: this.state.end_year
    })
      .then(res =>
        this.setState({
          articles: res.data,
          message: !res.data.length
            ? "No New Articles Found, Try a Different Query"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getArticle();
  };

  handleArticleSave = id => {
    const article = this.state.articles.find(article => article._id === id);
    API.saveArticle(article).then(res => this.getArticle());
  };

  getSavedArticle = () => {
    API.getSavedArticle()
      .then(res =>
        this.setState({
          articles: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleArticleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticle());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>New York Times Article Scrubber</strong>
              </h1>
              <h2 className="text-center">
                Search for and annotate articles of interest.
              </h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Panel title="Search" icon="newspaper-o">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
                start_year={this.state.start_year}
                end_year={this.state.end_year}
              />
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <Panel title="Results">
              {this.state.article.length ? (
                <List>
                  {this.state.article.map(article => (
                    <Article
                      key={article._id}
                      _id={article._id}
                      title={article.headline.main}
                      url={article.web_url}
                      date={article.pub_date}
                      handleClick={this.handleArticleSave}
                      buttonText="Save Article"
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Panel>
          </Col>
        </Row>

        <Row>
        <Col size="md-12">
        <Saved />
        </Col>
        </Row>
        <Footer />
        </Container>
      );
    }
  
  }
export default Home;

                  
         