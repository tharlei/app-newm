import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Client from './pages/Client';

const Routes = createAppContainer(
	createStackNavigator({
		Main,
		Client
	}, {
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#0d47a1',
			},
			headerBackTitleVisible: false,
			headerTintColor: '#fff',
		},
	})
);

export default Routes;
