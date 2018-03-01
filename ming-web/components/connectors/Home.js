import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../pageComponents/Home';
import * as common_actions from '../../actions/common_actions';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(common_actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
