import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      price
      description
    }
  }
`;

export default class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: value});
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('updating item...', this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log('res', res);
  };
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}>
        {({data, loading}) => {
          if (loading) return <p> Laoding... </p>;
          if (!data.item)
            return <p>No item found with id: ${this.props.id}!</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, {loading, error}) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
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
                        defaultValue={data.item.title}
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
                        defaultValue={data.item.price}
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
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav
                      {loading ? 'ing' : 'e'} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export {UPDATE_ITEM_MUTATION};
