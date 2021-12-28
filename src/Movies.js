// import React, { Component } from 'react';
// import {
    
//   ScrollView,
//   Text,
//   View
// } from 'react-native';
// import { movies } from './data';

// import { SafeAreaView} from 'react-native'

// export default class Movies extends Component {
//   render() {
//     return (

//       <View>
//           <SafeAreaView>
//         <ScrollView>
//           {movies.map((movie, index) => <Text>{movie.title}</Text>)}
          	
//         </ScrollView>
//         </SafeAreaView>
//       </View>
//     );
//   }
// }

//2nd


// import React, { Component } from 'react';
// import {
    
//   ScrollView,
//   Text,
//   View
// } from 'react-native';
// import { movies } from './data';
// import MoviePoster from './MoviePoster';

// import { SafeAreaView} from 'react-native'

// export default class Movies extends Component {
//   render() {
//     return (

//       <View>
//           <SafeAreaView>
//         <ScrollView>
//         {movies.map((movie, index) => <MoviePoster
//   movie={movie}
//   onOpen={this.openMovie}
//   key={index}
// />)}
          	
//         </ScrollView>
//         </SafeAreaView>
//       </View>
//     );
//   }
// }

//3rd

// import React, { Component } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   View
// } from 'react-native';
// import { movies } from './data';
// import MoviePoster from './MoviePoster';

// export default class Movies extends Component {
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
// 		  // Hide all scroll indicators
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//         >
//           {movies.map((movie, index) => <MoviePoster
//             movie={movie}
//             onOpen={this.openMovie}
//             key={index}
//           />)}
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 20,         // start below status bar
//   },
//   scrollContent: {
//     flexDirection: 'row',   // arrange posters in rows
//     flexWrap: 'wrap',       // allow multiple rows
//   },
// });

//4th 

// import React, { Component } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   View
// } from 'react-native';
// import { movies } from './data';
// import MoviePoster from './MoviePoster';
// import MoviePopup from './MoviePopup';

// export default class Movies extends Component {
//   state = {
//     popupIsOpen: false,
//   }

//   openMovie = (movie) => {
//     this.setState({
//       popupIsOpen: true,
//       movie,	
//     });
//   }

//   closeMovie = () => {
//     this.setState({
//       popupIsOpen: false,
//     });
//   }
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
// 		  // Hide all scroll indicators
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//         >
//           {movies.map((movie, index) => <MoviePoster
//             movie={movie}
//             onOpen={this.openMovie}
//             key={index}
//           />)}
//         </ScrollView>

//         <MoviePopup
//           movie={this.state.movie}
//           isOpen={this.state.popupIsOpen}
//           onClose={this.closeMovie}
//         />

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 20,         // start below status bar
//   },
//   scrollContent: {
//     flexDirection: 'row',   // arrange posters in rows
//     flexWrap: 'wrap',       // allow multiple rows
//   },
// });

//5th

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { movies } from './data';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';

export default class Movies extends Component {

  state = {
    popupIsOpen: false,
    // Day chosen by user
    chosenDay: 0,       // choose first day by default
    // Time chosen by user
    chosenTime: null,
  }

  openMovie = (movie) => {
    this.setState({
      popupIsOpen: true,
      movie,	
    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      // Reset values to default ones
      chosenDay: 0,
      chosenTime: null,
    });
  }
  chooseDay = (day) => {
    this.setState({
      chosenDay: day,
    });
  }

  chooseTime = (time) => {
    this.setState({
      chosenTime: time,
    });
  }

  bookTicket = () => {
    // Make sure they selected time 
    if (!this.state.chosenTime) {
      alert('Please select show time');
    } else {
      // Close popup
      this.closeMovie();
      // Navigate away to Confirmation route
      this.props.navigator.push({
        name: 'confirmation',
        // Generate random string
        code: Math.random().toString(36).substring(6).toUpperCase(),
      });
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
		  // Hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {movies.map((movie, index) => <MoviePoster
            movie={movie}
            onOpen={this.openMovie}
            key={index}
          />)}
        </ScrollView>
        <MoviePopup
  // ... existing props
  onBook={this.bookTicket}
/>

        <MoviePopup
  movie={this.state.movie}
  isOpen={this.state.popupIsOpen}
  onClose={this.closeMovie}
  chosenDay={this.state.chosenDay}
  chosenTime={this.state.chosenTime}
  onChooseDay={this.chooseDay}
  onChooseTime={this.chooseTime}
/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});


