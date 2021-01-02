/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CollapseHeader from '../CollapseHeader';
import CollapseBody from '../CollapseBody';
import style from './collapseStyle';

const IMG_DEFAULT_OPEN_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAgCAYAAACrdt7+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTI0VDE0OjI3OjQwKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTI0VDE0OjI3OjQwKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0yNFQxNDoyNzo0MCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOGU1NTEwMS1lZmZlLWY1NGYtYTE4NS1hYWYwNDY4N2RhMTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNDM4NjRkZS1jYjczLTU5NDUtYWVlMy1lMTViMWUwYTE5NWQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3OTViZjJkNy0wODA2LWQ5NDItYmQ0NC00NmU0MzliMzljNzMiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OTViZjJkNy0wODA2LWQ5NDItYmQ0NC00NmU0MzliMzljNzMiIHN0RXZ0OndoZW49IjIwMTktMDYtMjRUMTQ6Mjc6NDArMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MThlNTUxMDEtZWZmZS1mNTRmLWExODUtYWFmMDQ2ODdkYTE4IiBzdEV2dDp3aGVuPSIyMDE5LTA2LTI0VDE0OjI3OjQwKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WjEkYwAAAjlJREFUaIHVmTFrFEEYhp/LoaBgioBFmqvELilMJ2IlqCB6VYr8gyDYnK3/wHRqsFWwUMRYCAdWoo1FmnRip0UiWKmcpDgei92ALHe7t3O7O3svvM3tzDffvOzwHDuoRHRXva9+NdEf9ZV6MVZPHZVIWgZeAtcnPPsNbALDRjsClppeMFUP+MTkMADOAe+A7cY6ShUjkA3gM7BWMG4JeALsAN26mzpR00emD7wAzpSc9xbYAkZVN5RVk2/IAHhN+TAA7gAfgdVKO5qgJgLpArvAw5z1joDLwPOcOpdIjtp6pd1lVTPGltWh+TpQe+n4jvqgYPwv9UZdPdcZRi/dbJ6GJqFl526pxznzxur2IgWyoR4WhLFr8sdsWo0r6s+CGjsFNVoRSF8d5WxirA5mrHVB/VIQyp56tq2BDNINT9PIJLAyNVfUDwWh7KurbQqka3IE8nRocpRC6p9WnxXU/6autyGQsiQJdSMEmjeMeUgS6loJNE9jVZAk1LURKLShvtWRJNS1ECikkTpIEurKCVRm8bpJEupKCTTrok2RJNSVEWiWxWKQJNRzE6hogZgkCfVcBMor3Dc+SUIdTKBpBdtEklAHEShbpK0kCXVpAv0/ue0kCXUpAp1MWiSShHoWAm2irrl4JAl1EYF+YP6b0WaShDqPQMcdddpN1V+Sy6G9Wj/7x9EK8Aa4mvn9UUd9D1zLPDgCbgH7DTQXS6eAe8BNYExyO/i0o54HHgO3SS6ShsBd4HukRqPqHwQK79FAzLZ4AAAAAElFTkSuQmCC';
const IMG_DEFAULT_CLOSED_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAgCAYAAACrdt7+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTI0VDE0OjI4OjMwKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTI0VDE0OjI4OjMwKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0yNFQxNDoyODozMCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxZTgyZTkxNC04OGIzLWQwNDgtODJjYy04YTg1NGY2ZGQ4NjIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjODQ0MDIyZS1lYTc2LTAwNDItYTcyNy0zMTk5OTI0NzFlYTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MmMwMjk0YS01MDU2LWJkNDYtODc1NC0xZGY1MTFlMjE5NmUiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MmMwMjk0YS01MDU2LWJkNDYtODc1NC0xZGY1MTFlMjE5NmUiIHN0RXZ0OndoZW49IjIwMTktMDYtMjRUMTQ6Mjg6MzArMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWU4MmU5MTQtODhiMy1kMDQ4LTgyY2MtOGE4NTRmNmRkODYyIiBzdEV2dDp3aGVuPSIyMDE5LTA2LTI0VDE0OjI4OjMwKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2GNhLwAAAjFJREFUaIHlmjFrFFEYRc8aFLTYImBhk8o2NrER1EpQUWRBSJF/IIrNYukfELRSgq2FhQhuwCJg5Q+IRTrBKharYBUxkmI9FrMDy5J5Ozv75s1EL3zN7Hxvvnv3Dad401HPAi+AO8AJYBu4D3zlP1RH/QBcm7r+DbgN7KQfKZlOAg+Bm8AI2AJedlQLGn4DG8AgyXhptQy8A65OXX+OumuxRmpf5R+q8+rnAr+HqKvqMBCK6qa61AIzi9Zl9UfA5/f8xhXDO0V1W+22wFTV2lAPA/5G6vpkQ3dsOqRds/CaNjdPddTHM3ztqzdUppuXzF6PkIbqWguMlqlT6qsZfvbUC3lP0UJ9sy1UpAO11wLDoVpWP84IY0c9N9kXWrA3Nl6kNhMoRJJcA/XMdO+shdc8fgSaRRLVp0Uzl3nAcSJQGZLcC61R9kFtJ9BcJIkRCLaXQHOTJFYgebWJQJVIEjsQbAeBKpOkjkCwWQItRJK6AsFmCLQwSeoMBNMRKBpJ6g4E6ydQVJKkCCSvOggUnSQpA8G4BKqFJKkDwTgEqo0kTQSCixGoVpI0FQjOT6AkJGkyECxPoEsmIkmoOlp0LBNdfeAJ2elgFX0iOzwbRpvoCKUMBKAHvAZOz9m3RXZodhB7oGlV/beqagBcITsqLatnwF0ShAHpd0iuFeA9sBq45w/wANhMMtFYTQUC0AXeANeP+O0nsE72JUJSpX5lJrUP3AIeAV/G134Bb4GLNBAGwF8MtwbYeaZehgAAAABJRU5ErkJggg==';
// type Props = {
//     isCollapsed: ?boolean,
//     disabled: ?boolean,
//     onToggle: ?Function,
//     handleLongPress: ?Function,
//     showIcons: ?boolean,
//     openIcon: ?String,
//     closedIcon: ?String,
//     iconBackgroundColor: ?String,
// };

export default class Collapse extends Component {
  constructor(props) {
    super(props);
    const { isCollapsed } = this.props;
    this.state = {
      show: isCollapsed,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isCollapsed } = this.props;
    if (nextProps.isCollapsed !== isCollapsed) {
      this.state.show = nextProps.isCollapsed;
    }
  }

  toggle() {
    const { show } = this.state;
    const { onToggle, refId } = this.props;
    this.setState({
      show: !show,
    }, () => onToggle(!show, refId));
  }

  render() {
    let header = null;
    let body = null;
    const {
      handleLongPress,
      children,
      disabled,
      showIcons,
      iconBackgroundColor,
      openIcon,
      closedIcon,

    } = this.props;
    const { show } = this.state;
    React.Children.forEach(children, (child) => {
      if (child.type === CollapseHeader) {
        header = (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => this.toggle()}
            onLongPress={handleLongPress}
          >
            <View style={[style.collapseHeaderContainer]}>
              <View style={[style.collapseHeaderChild]}>
                {child}
              </View>
              {
                showIcons ? (
                  <View style={[style.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                    {show ? (
                      <Image
                        style={[style.icon]}
                        source={{ uri: openIcon }}
                      />
                    ) : (
                      <Image
                        style={[style.icon]}
                        source={{ uri: closedIcon }}
                      />
                    )}

                  </View>
                ) : null
              }
            </View>

          </TouchableOpacity>
        );
      } else if (child.type === CollapseBody) {
        if (show) {
          body = child;
        }
      }
    });

    if (header === null) {
      // console.warn("header wasn't found to be rendered. Please make sure you have wrapped an CollapseHeader in the Collapse Component.");
      return null;
    }
    return (
      <View {...this.props}>
        {header}
        {body}
      </View>
    );
  }
}

Collapse.propTypes = {
  isCollapsed: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  handleLongPress: PropTypes.func,
  refId: PropTypes.string,
  showIcons: PropTypes.bool,
  openIcon: PropTypes.string,
  closedIcon: PropTypes.string,
  iconBackgroundColor: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
Collapse.defaultProps = {
  isCollapsed: false,
  disabled: false,
  onToggle: () => undefined,
  handleLongPress: undefined,
  refId: '',
  showIcons: false,
  openIcon: IMG_DEFAULT_OPEN_ICON,
  closedIcon: IMG_DEFAULT_CLOSED_ICON,
  iconBackgroundColor: '',
};
