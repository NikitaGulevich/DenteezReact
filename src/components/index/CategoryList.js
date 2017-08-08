import React, {Component} from 'react';
import CategoryItem from './CategoryItem';
import ErrorPopup from './ErrorPopup';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      error: false,
      errorDescription: ''
    };
  }
  componentDidMount() {
    fetch('http://504080.com/api/v1/services/categories',{
      method: "GET",
      //Раскомментируйте для показа категорий
      // headers: {
      //   "Authorization": "a094968dbd3d3d4f73059b32634b7968ea026830"
      // }
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          response.json()
            .then(response => {
              console.log(response.data);
              this.setState({
                categories: response.data
              })
            })
        } else {
          response.json()
            .then(response => {
              console.log(response.error.description);
              this.setState({
                error: true,
                errorDescription: response.error.description
              })
            })
        }
      })
  }
  render() {
    if(!this.state.error) {
      return (
        <section className="categories">
          {
            this.state.categories.map((item) =>  <div key={item.id}><CategoryItem icon={item.icon} title={item.title}/></div>
            )}
        </section>
      )
    } else {
      return <ErrorPopup description={this.state.errorDescription} />
    }
  }
}
export default CategoryList;