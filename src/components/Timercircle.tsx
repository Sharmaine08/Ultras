
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type TimerCircleProps = {
  totalSeconds: number;
  originalSeconds: number;
  mode: string;
  isPaused: boolean;
  currentTime: string;
};

export default function TimerCircle({
  totalSeconds,
  originalSeconds,
  mode,
  isPaused,
  currentTime,
}: TimerCircleProps) {
  const size = 260;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress =
    originalSeconds > 0
      ? totalSeconds / originalSeconds
      : 0;

  function formatTime(total: number) {
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#292D37"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#665FF2"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      <View style={styles.timeContainer}>
        <Text style={styles.mode}>{mode.toUpperCase()}</Text>
        <Text style={styles.label}>TIME REMAINING</Text>
        <Text style={styles.time}>
          {formatTime(Math.max(0, totalSeconds))}
        </Text>
        <Text style={styles.status}>
          {isPaused ? 'PAUSED' : 'IN PROGRESS'}
        </Text>
        <Text style={styles.clock}>{currentTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  timeContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  mode: {
    color: '#8B85FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  label: {
    color: '#A5A8B5',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: '700',
  },
  status: {
    color: '#A5A8B5',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 8,
  },
  clock: {
    color: '#A5A8B5',
    fontSize: 11,
    marginTop: 5,
  },
});
