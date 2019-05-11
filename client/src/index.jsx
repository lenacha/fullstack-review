import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  this.getData = this.getData.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:1128/repos',
      data: JSON.stringify({value: term}),
      success: ()=>{console.log('ok')},
      contentType: 'application/json'
    });
  }
  getData () {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:1128/repos',
      success: (response) => { 
        console.log(response);
        this.setState({
          repos: response
        });
      },
      contentType: 'application/json'
    });
  }
  componentDidMount(){
    this.getData()
  }
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <div className='entry'>{this.state.repos.map((repo) => {
        return <RepoListEntry repo={repo} key={repo.name}/>
      })}</div>
    </div>)
  } 
}
class RepoListEntry extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <br/>
        {`       name: ${this.props.repo.name}` }<br/>
        {`        url: ${this.props.repo.html_url} `}<br />
        {`forks count: ${this.props.repo.forks_count}`}<br />
        {` stargazers: ${this.props.repo.stargazers_count}`}<br/><br/>
    </div>
    )
  } 
}
ReactDOM.render(<App />, document.getElementById('app'));