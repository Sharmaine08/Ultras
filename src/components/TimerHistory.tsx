
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type TimerRecord = {
  hours: number;
  minutes: number;
  seconds: number;
  mode: string;
};

type TimerHistoryProps = {
  history: TimerRecord[];
  sessions: number;
  onSelect: (record: TimerRecord) => void;
  onSeeMore?: () => void;
};

export default function TimerHistory({
  history,
  sessions,
  onSelect,
  onSeeMore,
}: TimerHistoryProps) {
  function formatTime(record: TimerRecord) {
    return [
      String(record.hours).padStart(2, '0'),
      String(record.minutes).padStart(2, '0'),
      String(record.seconds).padStart(2, '0'),
    ].join(':');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Recent Timers</Text>
        <Text style={styles.sessions}>
          Completed: {sessions}
        </Text>
      </View>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>
          Your recent timers will appear here.
        </Text>
      ) : (
        history.slice(0, 2).map((record, index) => (
          <TouchableOpacity
            key={`${record.hours}-${record.minutes}-${record.seconds}-${record.mode}-${index}`}
            style={styles.historyItem}
            onPress={() => onSelect(record)}
          >
            <View>
              <Text style={styles.modeText}>
                {record.mode}
              </Text>
              <Text style={styles.timerText}>
                {formatTime(record)}
              </Text>
            </View>

            <Text style={styles.selectText}>Use timer →</Text>
          </TouchableOpacity>
        ))
      )}

      {history.length > 2 && onSeeMore && (
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={onSeeMore}
        >
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 18,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    color: '#202638',
    fontSize: 15,
    fontWeight: '800',
  },
  sessions: {
    color: '#7F8797',
    fontSize: 10,
    fontWeight: '700',
  },
  emptyText: {
    color: '#7F8797',
    fontSize: 12,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeText: {
    color: '#202638',
    fontSize: 12,
    fontWeight: '800',
  },
  timerText: {
    color: '#7F8797',
    fontSize: 12,
    marginTop: 4,
  },
  selectText: {
    color: '#665FF2',
    fontSize: 11,
    fontWeight: '700',
  },
  seeMoreButton: {
    alignSelf: 'center',
    padding: 8,
  },
  seeMoreText: {
    color: '#665FF2',
    fontSize: 12,
    fontWeight: '800',
  },
});
