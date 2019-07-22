import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../../thunks/fetchCollection';
import { Card } from '../Card';
import { withRouter } from 'react-router';
import startCase from 'lodash/startCase'
const getDataKey = (pathname) => pathname.split('/').slice(-1)[0];
export class CardContainer extends Component {
  
  componentDidMount() {
    this.props.fetchCollection();
  }

  makeDynamicCard = () => {
    const { dataKey } = this.props;
    const data = this.props[dataKey];
    
    return Array.isArray(data) && data.map(item => {
      return <Card key={item.id} item={item}/>;
    });
  }

  componentDidUpdate(prevProps) {
    const {pathname: prevPathname} = prevProps.location;
    const {pathname} = this.props.location;
    
    if (prevPathname && prevPathname !== pathname) {
      this.props.fetchCollection();
    }
  }

  render () {
    const { dataKey } = this.props;

    return (
      <div>
        <div className='image-container'>
          <h1 className={dataKey}>{startCase(dataKey)}</h1>
        </div>
        <section className='card-container' >
          {this.makeDynamicCard()}
        </section>
      </div>  
    );
  }
}

export const mapStateToProps = (state, otherProps) => {
  const dataKey = getDataKey(otherProps.location.pathname);

  return {
    dataKey,
    [dataKey]: state[dataKey]  
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCollection: () => dispatch(fetchCollection(props.location.pathname))
  }
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CardContainer)
);