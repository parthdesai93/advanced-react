import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export default class CreateItem extends Component {
  state = {
    title: 'this is a title',
    description: 'this is description',
    image: '',
    largeImage: '',
    price: 10
  };

  handleChange = e => {
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: value});
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, error}) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createItem();
              Router.push({
                pathname: '/item',
                query: {
                  id: res.data.createItem.id
                }
              });
            }}>
            <Error error={error} />
            <fieldset
              disable={loading.toString()}
              aria-busy={loading.toString()}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="Description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
export {CREATE_ITEM_MUTATION};
