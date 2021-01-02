import { Actions } from 'react-native-router-flux';
import getDashboard from '../Redux/Actions/Dashboard-Action';

const getDashboardView = () => (dispatch) => {
  dispatch(getDashboard());
  Actions.dashboard();
};

export default getDashboardView;
