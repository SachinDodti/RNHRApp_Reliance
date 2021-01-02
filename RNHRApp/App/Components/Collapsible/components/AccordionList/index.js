/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CollapseHeader from '../CollapseHeader';
import CollapseBody from '../CollapseBody';
import Collapse from '../Collapse';

type Props = {
    List:Array,
    header:Function,
    body:Function,
    onToggle:Function
};
export default class AccordionList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      selectedIndex: null,
    });
  }


  onToggle(index) {
    let selected = index;
    const { selectedIndex } = this.state;
    if (selected === selectedIndex) {
      selected = null;
    }
    this.setState({ selectedIndex: selected }, () => {
      const { onToggle } = this.props;
      if (onToggle) {
        onToggle(selected);
      }
    });
  }

    _renderItem = ({ item, index }) => {
      const { selectedIndex } = this.state;
      const { header, body } = this.props;
      return (
        <Collapse
          key={index}
          isCollapsed={selectedIndex === index}
          onToggle={isCollapsed => this.onToggle(index)}
        >
          <CollapseHeader>
            {header(item)}
          </CollapseHeader>
          <CollapseBody>
            {body(item)}
          </CollapseBody>
        </Collapse>
      );
    };

    render() {
      const { list } = this.props;
      return (
        list.map((item, index) => this._renderItem({ item, index }))
      );
    }
}

AccordionList.defaultProps = {
  List: [],
  header: item => undefined,
  body: item => undefined,
  onToggle: item => undefined,
};
