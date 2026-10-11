
import type { RefObject } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const ITEM_HEIGHT = 48;

type TimePickerProps = {
  hours: number;
  minutes: number;
  seconds: number;
  hoursRef: RefObject<ScrollView | null>;
  minutesRef: RefObject<ScrollView | null>;
  secondsRef: RefObject<ScrollView | null>;
  onHoursScroll: (event: any) => void;
  onMinutesScroll: (event: any) => void;
  onSecondsScroll: (event: any) => void;
};

export default function TimePicker({
  hours,
  minutes,
  seconds,
  hoursRef,
  minutesRef,
  secondsRef,
  onHoursScroll,
  onMinutesScroll,
  onSecondsScroll,
}: TimePickerProps) {
  function renderNumbers(
    count: number,
    selected: number,
    reference: RefObject<ScrollView | null>,
    onScrollEnd: (event: any) => void,
  ) {
    return (
      <ScrollView
        ref={reference}
        style={styles.wheel}
        contentContainerStyle={styles.wheelContent}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
      >
        {Array.from({ length: count }, (_, index) => (
          <View key={index} style={styles.item}>
            <Text
              style={[
                styles.number,
                selected === index && styles.selectedNumber,
              ]}
            >
              {String(index).padStart(2, '0')}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wheelGroup}>
        {renderNumbers(24, hours, hoursRef, onHoursScroll)}
        <Text style={styles.label}>HOURS</Text>
      </View>

      <Text style={styles.colon}>:</Text>

      <View style={styles.wheelGroup}>
        {renderNumbers(60, minutes, minutesRef, onMinutesScroll)}
        <Text style={styles.label}>MINUTES</Text>
      </View>

      <Text style={styles.colon}>:</Text>

      <View style={styles.wheelGroup}>
        {renderNumbers(60, seconds, secondsRef, onSecondsScroll)}
        <Text style={styles.label}>SECONDS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  wheelGroup: {
    flex: 1,
    alignItems: 'center',
  },
  wheel: {
    height: ITEM_HEIGHT * 3,
    width: '100%',
  },
  wheelContent: {
    paddingVertical: ITEM_HEIGHT,
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 25,
    fontWeight: '600',
    color: '#B8BDC7',
  },
  selectedNumber: {
    color: '#202638',
    fontSize: 30,
    fontWeight: '900',
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7F8797',
    marginTop: 5,
    letterSpacing: 1,
  },
  colon: {
    fontSize: 25,
    color: '#665FF2',
    marginHorizontal: 2,
    marginBottom: 22,
  },
});
