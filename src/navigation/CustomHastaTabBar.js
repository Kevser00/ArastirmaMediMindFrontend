import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const CustomHastaTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const active = state.routes[state.index]?.name;

  const { hasta } = useAuth();

  const initials =
    `${hasta?.ad?.[0] || ''}${hasta?.soyad?.[0] || ''}`.toUpperCase();

  const go = (name) => {
    navigation.navigate(name);
  };

  const TabItem = ({ name, label, children }) => {
    const isActive = active === name;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => go(name)}
        style={styles.tabItem}
      >
        <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
          {children(isActive)}
        </View>
        <Text style={[styles.label, isActive && styles.labelActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(Number(insets.bottom) || 0, 10)
 }]}>
      <View style={styles.bar}>

        {/* Ana Sayfa */}
        <TabItem name="hastaAnaSayfa" label="Ana Sayfa">
          {(isActive) => (
            <Image
              source={require('../../assets/medilogo.png')}
              style={[styles.logoIcon, { opacity: isActive ? 1 : 0.75 }]}
              resizeMode="contain"
            />
          )}
        </TabItem>

        {/* Bildirim */}
        <TabItem name="hastaBildirimSayfa" label="İlaç Ekle">
          {(isActive) => (
            <Ionicons
              name="add"
              size={26}
              color="#fff"
              style={{ opacity: isActive ? 1 : 0.75 }}
            />
          )}
        </TabItem>

        {/* MediAI */}
        <TabItem name="mediAi" label="MediAI">
          {(isActive) => (
            <Ionicons
              name={isActive ? 'sparkles' : 'sparkles-outline'}
              size={24}
              color="#fff"
              style={{ opacity: isActive ? 1 : 0.75 }}
            />
          )}
        </TabItem>

        {/* Profil – Baş Harf */}
        <TabItem name="hastaBilgiSayfa" label={initials || 'Profil'}>
          {(isActive) => (
            <View
              style={[
                styles.initialCircle,
                isActive && styles.initialCircleActive,
              ]}
            >
              <Text style={styles.initialText}>
                {initials || '👤'}
              </Text>
            </View>
          )}
        </TabItem>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
  },
  bar: {
    height: 86,
    backgroundColor: '#1483C7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  label: {
    color: '#E6F3FF',
    fontSize: 11,
    marginTop: 4,
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  initialCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialCircleActive: {
    backgroundColor: '#FFFFFF',
  },
  initialText: {
    color: '#1483C7',
    fontWeight: '800',
    fontSize: 14,
  },
});

export default CustomHastaTabBar;
