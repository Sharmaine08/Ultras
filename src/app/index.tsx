import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import TimePicker from '../components/TimePicker';
import TimerCircle from '../components/TimerCircle';
import TimerControls from '../components/TimerControls';
import TimerHistory, { TimerRecord, } from '../components/TimerHistory';

const ITEM_HEIGHT = 48;

export default function HomeScreen() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState(300);
  const [originalSeconds, setOriginalSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [mode, setMode] = useState('Study');
  const [recentTimers, setRecentTimers] = useState<TimerRecord[]>([
    { hours: 0, minutes: 5, seconds: 0, mode: 'Study' },
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const hoursRef = useRef<ScrollView>(null);
  const minutesRef = useRef<ScrollView>(null);
  const secondsRef = useRef<ScrollView>(null);

  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      hoursRef.current?.scrollTo({ y: hours * ITEM_HEIGHT, animated: false });
      minutesRef.current?.scrollTo({ y: minutes * ITEM_HEIGHT, animated: false });
      secondsRef.current?.scrollTo({ y: seconds * ITEM_HEIGHT, animated: false });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused) return;
    const timer = setInterval(() => {
      setTotalSeconds((previous) => {
        if (previous <= 1) {
          setIsRunning(false);
          setIsPaused(false);
          setSessions((value) => value + 1);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, isPaused]);

  const formatNumber = (value: number) => String(value).padStart(2, '0');
  const getSelectedSeconds = () => hours * 3600 + minutes * 60 + seconds;
  const formatCurrentTime = () => currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  function startTimer() {
    const selectedSeconds = getSelectedSeconds();
    if (selectedSeconds <= 0) return;

    setTotalSeconds(selectedSeconds);
    setOriginalSeconds(selectedSeconds);
    setIsRunning(true);
    setIsPaused(false);

    const newTimer: TimerRecord = { hours, minutes, seconds, mode };
    setRecentTimers((previous) => {
      const filtered = previous.filter((item) => !(
        item.hours === newTimer.hours &&
        item.minutes === newTimer.minutes &&
        item.seconds === newTimer.seconds &&
        item.mode === newTimer.mode
      ));
      return [newTimer, ...filtered];
    });
  }

  function pauseTimer() { setIsPaused(true); }
  function resumeTimer() { setIsPaused(false); }

  function deleteTimer() {
    setIsRunning(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(5);
    setSeconds(0);
    setTotalSeconds(300);
    setOriginalSeconds(300);

    setTimeout(() => {
      hoursRef.current?.scrollTo({ y: 0, animated: false });
      minutesRef.current?.scrollTo({ y: 5 * ITEM_HEIGHT, animated: false });
      secondsRef.current?.scrollTo({ y: 0, animated: false });
    }, 100);
  }

  function useRecentTimer(record: TimerRecord) {
    setHours(record.hours);
    setMinutes(record.minutes);
    setSeconds(record.seconds);
    setMode(record.mode);

    hoursRef.current?.scrollTo({ y: record.hours * ITEM_HEIGHT, animated: true });
    minutesRef.current?.scrollTo({ y: record.minutes * ITEM_HEIGHT, animated: true });
    secondsRef.current?.scrollTo({ y: record.seconds * ITEM_HEIGHT, animated: true });
    setShowHistory(false);
  }

  function handleHoursScroll(event: any) {
    const value = Math.max(0, Math.min(23, Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)));
    setHours(value);
  }

  function handleMinutesScroll(event: any) {
    const value = Math.max(0, Math.min(59, Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)));
    setMinutes(value);
  }

  function handleSecondsScroll(event: any) {
    const value = Math.max(0, Math.min(59, Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)));
    setSeconds(value);
  }

  return isRunning ? (
    <View style={styles.runningScreen}>
      <TimerCircle
        totalSeconds={totalSeconds}
        originalSeconds={originalSeconds}
        mode={mode}
        isPaused={isPaused}
        currentTime={formatCurrentTime()}
      />
      <TimerControls
        isPaused={isPaused}
        onDelete={deleteTimer}
        onPause={pauseTimer}
        onResume={resumeTimer}
      />
    </View>
  ) : (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.smallTopText}>READY WHEN YOU ARE</Text>
            <Text style={styles.currentTime}>{formatCurrentTime()}</Text>
          </View>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.appTitle}>Focus Timer</Text>
          <Text style={styles.appSubtitle}>Choose your time and make it count.</Text>
        </View>

        <View style={styles.wheelCard}>
          <Text style={styles.chooseTitle}>CHOOSE YOUR TIME</Text>
          <TimePicker
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            hoursRef={hoursRef}
            minutesRef={minutesRef}
            secondsRef={secondsRef}
            onHoursScroll={handleHoursScroll}
            onMinutesScroll={handleMinutesScroll}
            onSecondsScroll={handleSecondsScroll}
          />
        </View>

        <View style={styles.modeSection}>
          <View style={styles.modeHeader}>
            <Text style={styles.sectionTitle}>TIMER MODE</Text>
            <Text style={styles.sectionHint}>Choose one</Text>
          </View>
          <View style={styles.modeCard}>
            {['Study', 'Break', 'Exercise'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.modeButton, mode === item && styles.activeModeButton]}
                onPress={() => setMode(item)}
              >
                <View style={[styles.modeDot, mode === item && styles.activeModeDot]} />
                <Text style={[styles.modeText, mode === item && styles.activeModeText]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={startTimer}>
          <Text style={styles.startText}>START TIMER</Text>
        </TouchableOpacity>

        <TimerHistory
          history={recentTimers}
          sessions={sessions}
          onSelect={useRecentTimer}
          onSeeMore={() => setShowHistory(true)}
        />

        <Text style={styles.footer}>Focus better • One session at a time</Text>
      </View>

      <Modal
        visible={showHistory}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.historyModal}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Recently Used</Text>
                <Text style={styles.modalSubtitle}>Your timer records</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowHistory(false)}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.historyList}>
              {recentTimers.map((item, index) => (
                <TouchableOpacity
                  key={`${item.hours}-${item.minutes}-${item.seconds}-${item.mode}-${index}`}
                  style={styles.modalHistoryCard}
                  onPress={() => useRecentTimer(item)}
                >
                  <View style={styles.modalHistoryIcon}>
                    <Text style={styles.modalHistoryIconText}>{item.mode === 'Study' ? 'S' : item.mode === 'Break' ? 'B' : 'E'}</Text>
                  </View>
                  <View style={styles.modalHistoryInfo}>
                    <Text style={styles.modalHistoryMode}>{item.mode}</Text>
                    <Text style={styles.modalHistoryTime}>{formatNumber(item.hours)}:{formatNumber(item.minutes)}:{formatNumber(item.seconds)}</Text>
                  </View>
                  <Text style={styles.useText}>Use</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 34, paddingBottom: 18 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallTopText: { fontSize: 9, fontWeight: '900', letterSpacing: 1.5, color: '#9299A8' },
  currentTime: { fontSize: 21, fontWeight: '900', color: '#181D2C', marginTop: 3 },
  dateBadge: { backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 9, shadowColor: '#1A1F2E', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  dateText: { fontSize: 10, fontWeight: '900', color: '#6D7585' },
  titleSection: { marginTop: 19, marginBottom: 14 },
  appTitle: { fontSize: 32, fontWeight: '900', color: '#171C2B', letterSpacing: -0.8 },
  appSubtitle: { fontSize: 12, color: '#858D9C', marginTop: 4 },
  wheelCard: { backgroundColor: '#FFFFFF', borderRadius: 25, paddingHorizontal: 13, paddingTop: 15, paddingBottom: 13, shadowColor: '#202638', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 14, elevation: 3 },
  chooseTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.4, color: '#7F8797', marginBottom: 8 },
  modeSection: { marginTop: 13 },
  modeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 },
  sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.4, color: '#7F8797' },
  sectionHint: { fontSize: 9, color: '#A3A9B5' },
  modeCard: { height: 48, backgroundColor: '#FFFFFF', borderRadius: 17, padding: 4, flexDirection: 'row', shadowColor: '#202638', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  modeButton: { flex: 1, height: 40, borderRadius: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  activeModeButton: { backgroundColor: '#202638' },
  modeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#B8BDC7', marginRight: 6 },
  activeModeDot: { backgroundColor: '#8B83FF' },
  modeText: { fontSize: 10, fontWeight: '800', color: '#7B8392' },
  activeModeText: { color: '#FFFFFF' },
  startButton: { height: 55, borderRadius: 18, backgroundColor: '#665FF2', marginTop: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#665FF2', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.22, shadowRadius: 10, elevation: 4 },
  startText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  startArrow: { color: '#FFFFFF', fontSize: 20, marginLeft: 9 },
  footer: { textAlign: 'center', fontSize: 8, color: '#A7ADB8', marginTop: 'auto' },
  runningScreen: { flex: 1, backgroundColor: '#10131C', alignItems: 'center', paddingHorizontal: 23, paddingTop: 50 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(15, 18, 28, 0.45)', justifyContent: 'flex-end' },
  historyModal: { width: '100%', maxHeight: '75%', backgroundColor: '#F5F6FA', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingTop: 22, paddingBottom: 28 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  modalTitle: { fontSize: 23, fontWeight: '900', color: '#171C2B' },
  modalSubtitle: { fontSize: 11, color: '#9299A8', marginTop: 3 },
  closeButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E7E8EE', justifyContent: 'center', alignItems: 'center' },
  closeText: { fontSize: 26, color: '#4B5261', marginTop: -2 },
  historyList: { width: '100%' },
  modalHistoryCard: { width: '100%', minHeight: 67, backgroundColor: '#FFFFFF', borderRadius: 18, marginBottom: 9, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  modalHistoryIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#ECEBFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  modalHistoryIconText: { fontSize: 15, fontWeight: '900', color: '#625DE0' },
  modalHistoryInfo: { flex: 1 },
  modalHistoryMode: { fontSize: 13, fontWeight: '900', color: '#252B3B' },
  modalHistoryTime: { fontSize: 10, color: '#939AA7', marginTop: 4 },
  useText: { fontSize: 10, fontWeight: '900', color: '#665FF2' },
});
