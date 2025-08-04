import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slider } from '@react-native-assets/slider'
import { useEffect, useState } from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const [groß, setgroß] = useState(140)
  const [masse, setMasse] = useState(35)
  const [BMIndex, setBMIndex] = useState(0)
  const [touch, setTouch] = useState(false)

  const getDataFromStorege = async () => {
    const data = await getData('my-key');
    setMasse(data.masse)
    setgroß(data.groß)
    setBMIndex(IndexCalculator(data.masse, data.groß))
  }
  useEffect(() => {
    getDataFromStorege();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.sliderBox}>
        <Slider
          value={masse}
          style={{ flex: 6 }}
          minimumValue={35}
          maximumValue={160}
          minimumTrackTintColor={MassSliderColorL(masse)}
          maximumTrackTintColor={MassSliderColorR(masse)}
          thumbTintColor='black'
          onValueChange={(a) => { setMasse(a); setBMIndex(IndexCalculator(a, groß)) }}
          step={1}
          trackStyle={{ height: 20, borderRadius: 20 }}  // bar kalınlığı ve sekli
          thumbStyle={{ height: 32, width: 24, borderRadius: 24 }} // imleç büyüklüğü ve sekli
          StepMarker={(a) => touch && MyCustomStepMarker(a.stepMarked, masse)}
          onTouchStart={() => setTouch(true)}
          onTouchEnd={() => setTouch(false)}
        />
        <Text style={{ flex: 1, marginLeft: 16 }}>kg: {masse}</Text></View>
      <View style={styles.sliderBox}>
        <Slider
          value={groß}
          style={{ flex: 6 }}
          minimumValue={140}
          maximumValue={210}
          minimumTrackTintColor="#00ffbbff"
          maximumTrackTintColor="#00d9ffff"
          thumbTintColor='black'
          onValueChange={(a) => { setgroß(a); setBMIndex(IndexCalculator(masse, a)) }}
          step={1}
          trackStyle={{ height: 20, borderRadius: 20 }}  // bar kalınlığı ve sekli
          thumbStyle={{ height: 32, width: 24, borderRadius: 24 }} // imleç büyüklüğü ve sekli
          StepMarker={(a) => touch && MyCustomStepMarker(a.stepMarked, groß)}
          onTouchStart={() => setTouch(true)}
          onTouchEnd={() => setTouch(false)}
        />
        <Text style={{ flex: 1, marginLeft: 16 }}>cm: {groß}</Text>
      </View>
      <View style={styles.sliderBox}>
        <Slider
          value={BMIndex}
          style={{ flex: 6 }}
          minimumValue={12}
          maximumValue={40}
          minimumTrackTintColor={IndexSliderColorL(BMIndex)}
          maximumTrackTintColor={IndexSliderColorR(BMIndex)}
          thumbTintColor={IndexSliderColor(BMIndex)}
          step={1}
          enabled={false}
          trackStyle={{ height: 8, borderRadius: 8 }}  // bar kalınlığı 
          thumbStyle={{ height: 32, width: 24, borderRadius: 24 }} // imleç büyüklüğü
          StepMarker={(a) => touch && MyCustomStepMarker(a.stepMarked, BMIndex)}
          onTouchStart={() => setTouch(true)}
          onTouchEnd={() => setTouch(false)}
        />
        <Text style={{ flex: 1, marginLeft: 16 }}>inx: {BMIndex}</Text>
      </View>
      <View style={styles.statusView}>
        <Text style={{
          fontSize: 40,
          fontWeight: "bold",
          color: IndexSliderColor(BMIndex)
        }}>{BMIStatus(BMIndex)}</Text>
      </View>
      <TouchableOpacity
        style={{ width: 200, height: 60, borderWidth: 0.8, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: "orange" }}
        onPress={async () => {
          storeData('my-key', { groß: groß, masse: masse })
        }}>
        <Text>speichern</Text>
      </TouchableOpacity>
    </View>
  );
}

const IndexCalculator = (kg, cm) => {
  const index = kg * 10000 / (cm * cm);
  return index.toFixed(1);
}

const MassSliderColorL = (masse) => {
  if (masse < 101) return "#00ffbbff"; else return "#00d9ffff";
}
const MassSliderColorR = (masse) => {
  if (masse < 101) return "#00d9ffff"; else return "#ff6600ff";
}
const IndexSliderColorL = (index) => {
  if (index < 17) return "#ff8800ff"
  else if (index < 18.5) return "#ffbb00ff"
  else if (index < 25) return "#00d9ffff"
  else if (index < 30) return "#00ffbbff"
  else if (index < 35) return "#ffbb00ff"
  else if (index < 40) return "#ff6600ff"
  else return "#ff0000ff"
}
const IndexSliderColor = (index) => {
  if (index < 16) return "#ff8800ff";
  else if (index < 17) return "#ffbb00ff"
  else if (index < 18.5) return "#00d9ffff"
  else if (index < 25) return "#00ffbbff"
  else if (index < 30) return "#ffbb00ff"
  else if (index < 35) return "#ff6600ff"
  else if (index < 40) return "#ff0000ff"
  else return "#810000ff"
}
const IndexSliderColorR = (index) => {
  if (index < 16) return "#ffbb00ff";
  else if (index < 17) return "#00d9ffff"
  else if (index < 18.5) return "#00ffbbff"
  else if (index < 25) return "#ffbb00ff"
  else if (index < 30) return "#ff6600ff"
  else if (index < 35) return "#ff0000ff"
  else return "#810000ff"
}
const BMIStatus = (index) => {
  if (index < 16) return "Untergewicht"//"#ff8800ff";
  else if (index < 17) return "Untergewicht"//"#ffbb00ff"
  else if (index < 18.5) return "Untergewicht"//"#00d9ffff"
  else if (index < 25) return "Normalgewicht"//"#00ffbbff"
  else if (index < 30) return "Präadipositas"//"#ffbb00ff"
  else if (index < 35) return "Adipositas Grad I"//"#ff6600ff"
  else if (index < 40) return "Adipositas Grad II"//"#ff0000ff"
  else return "Adipositas Grad III"//"#810000ff"
}
const MyCustomStepMarker = (stepMarked, value) => {
  if (stepMarked)

    return (
      <View style={styles.marker}>
        <View style={styles.markerbg}>
          <Text style={styles.markerText}>{value}</Text>
        </View>
      </View>
    );
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('key', jsonValue);
  } catch (e) {
    // saving error
  }
};
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem('key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderBox: {
    borderRadius: 16,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    paddingLeft: 16,
  },
  statusView: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
  },
  marker: {
    alignItems: 'center',
    //justifyContent: 'center',
    width: 90,
    height: 90,
  },
  markerText: {
    fontSize: 20,
    color: 'black',
  },
  markerbg: {
    backgroundColor: "lightgrey",
    padding: 3,
    borderRadius: 4
  }
});
