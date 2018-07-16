import React, { Component } from "react";
import Panel from "../../components/Panel";
import Article from "../../components/Article";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";

class Saved extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles = () => {
    API.getSavedArticle()
      .then(res =>
        this.setState({
          articles: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleArticleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticles());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Panel title="Saved Articles" icon="download">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <Article
                      key={article._id}
                      _id={article._id}
                      title={article.title}
                      url={article.url}
                      date={article.date}
                      handleClick={this.handleArticleDelete}
                      buttonText="Delete Article"
                      saved
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Articles</h2>
              )}
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;