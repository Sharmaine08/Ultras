
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TimerControlsProps = {
  isPaused: boolean;
  onDelete: () => void;
  onPause: () => void;
  onResume: () => void;
};

export default function TimerControls({
  isPaused,
  onDelete,
  onPause,
  onResume,
}: TimerControlsProps) {
  return (
    <View style={styles.runningButtons}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.deleteText}>
          Delete
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pauseButton}
        onPress={isPaused ? onResume : onPause}
      >
        <Text style={styles.pauseText}>
          {isPaused ? 'Resume' : 'Pause'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  runningButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 38,
  },
  deleteButton: {
    width: '47%',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#292D37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  pauseButton: {
    width: '47%',
    height: 55,
    borderRadius: 28,
    backgroundColor: '#665FF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
