// import React, { Component, PropTypes } from 'react';
// import {
//   Animated,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import { defaultStyles } from './styles';

// // Colors for smooth transition when user chosess an option
// const colorDefault = 'rgba(255, 255, 255, 1)',  // white
//   colorSelected = 'rgba(103,58,183, 1)';        // purple

// export default class Options extends Component {

//   static propTypes = {
//     // Value to display
//     value: PropTypes.string.isRequired,
//     // Wheter this values was chosen by user or not
//     isChosen: PropTypes.bool.isRequired,
//     // Gets called when user choses this value
//     onChoose: PropTypes.func.isRequired,
//   }

//   state = {
//     // Animate background color change when value gets chosen
//     background: new Animated.Value(0)
//   }

//   // Animate option selection if value was already chosen not by a user
//   componentWillMount() {
//     if (this.props.isChosen) {
//       this.animateSelect();
//     }
//   }

//   // Handle isChosen prop changes
//   componentWillReceiveProps(nextProps) {
//     if (!this.props.isChosen && nextProps.isChosen) {
//       this.animateSelect();
//     } else if (this.props.isChosen && !nextProps.isChosen) {
//       this.animateDeselect();
//     }
//   }

//   animateSelect() {
//     Animated.timing(this.state.background, {
//       toValue: 100,
//       duration: 200,
//     }).start();
//   }

//   animateDeselect() {
//     Animated.timing(this.state.background, {
//       toValue: 0,
//       duration: 200,
//     }).start();
//   }

//   render() {
//     const { value, isChosen, onChoose } = this.props;
//     const backgroundColorAnimation = this.state.background.interpolate({
//       inputRange: [0, 100],
//       outputRange: [colorDefault, colorSelected],
//     });
//     return (
//       <TouchableOpacity
//         activeOpacity={1}
//         onPress={onChoose}
//       >
//         <Animated.View
//           style={[styles.container, { backgroundColor: backgroundColorAnimation }]}
//         >
//           <Text style={{ color: isChosen ? colorDefault : colorSelected }}>
//             {value}
//           </Text>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     borderColor: colorSelected,
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 10,
//   },
//   text: {
//     ...defaultStyles.text,
//   }
// });

//2nd


import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Option from './Option';

const { width } = Dimensions.get('window');
const optionWith = (width - 0) / 3 - 10;

export default class Options extends Component {

  // static propTypes = {
  //   // Set of values to choose from
  //   values: PropTypes.array.isRequired,
  //   // Chosen value index
  //   chosen: PropTypes.number,
  //   // Gets called when user choses a value
  //   onChoose: PropTypes.func.isRequired,
  // }

  render() {
    const { values, chosen, onChoose } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          // Horizontall scrolling
          horizontal={true}
          // Decelerate fast after the user lifts their finger
          decelerationRate={0.1}
          // Hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // Do not adjust content automatically
          automaticallyAdjustContentInsets={false}
          // Snap interval to stop at option edges
          snapToInterval={optionWith}
          style={styles.options}
        >
          {values.map((value, index) =>
            <View style={{ width: optionWith }} key={index}>
              <Option
                value={value}
                isChosen={index === chosen}
                onChoose={() => onChoose(index)}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    marginRight: -10,
  },
});