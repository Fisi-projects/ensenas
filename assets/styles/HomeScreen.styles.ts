import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: '#F5F7FA', */
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
      borderColor: 'rgba(137, 137, 137, 0.2)',

  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  modulesContainer: {
    paddingBottom: 20,
  },
  moduleCard: {
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 160,
  },
  illustrationSection: {
    backgroundColor: '#E3B1D2',
    width: 140,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 220,
    height: 220,
    position: 'absolute',
    bottom: -60,
    resizeMode: 'contain',
  },
  contentSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 18,
    paddingLeft: 16,
    paddingRight: 12,
  },
  moduleInfo: {
    flex: 1,
    
  },
  badgesContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6,
  },

  badgeLight: {
    backgroundColor: '#E4ECF7',
  },
  badgeLightText: {
    color: '#19323C',
    fontSize: 10,
    fontWeight: '500',
  },

  badgeDark: {
    backgroundColor: '#6B7DF2',
  },
  badgeDarkText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  bookmarkButton: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  bookmarkIcon: {
    backgroundColor: '#6B7DF2',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
