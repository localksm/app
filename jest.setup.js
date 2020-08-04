import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/google-signin', () => {});
jest.mock('react-native-image-picker', () => {});
jest.mock('react-native-fs', () => {});
jest.mock('@react-navigation/native', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return '';
      }),
    createDrawerNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createSwitchNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createBottomTabNavigator: jest.fn(),
    withNavigation: jest.fn().mockImplementation((component) => component),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/PUSH' })),
      replace: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/REPLACE' })),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
    ThemeColors: {
      light: {
        bodyContent: '',
      },
      dark: {
        bodyContent: '',
      },
    },
  };
});
jest.mock('@react-navigation/stack', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return '';
      }),
    createDrawerNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createSwitchNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createBottomTabNavigator: jest.fn(),
    withNavigation: jest.fn().mockImplementation((component) => component),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/PUSH' })),
      replace: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/REPLACE' })),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
    ThemeColors: {
      light: {
        bodyContent: '',
      },
      dark: {
        bodyContent: '',
      },
    },
  };
});
jest.mock('@react-navigation/drawer', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return '';
      }),
    createDrawerNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createSwitchNavigator: jest.fn().mockImplementation((nav) => {
      return {};
    }),
    createBottomTabNavigator: jest.fn(),
    withNavigation: jest.fn().mockImplementation((component) => component),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/PUSH' })),
      replace: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/REPLACE' })),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
    ThemeColors: {
      light: {
        bodyContent: '',
      },
      dark: {
        bodyContent: '',
      },
    },
  };
});

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document, navigator } = new JSDOM('').window;
global.document = document;
global.window = global;
global.navigator = navigator;
global.fetch = global;
