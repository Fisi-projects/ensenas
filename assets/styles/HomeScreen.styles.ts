import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    color: '#374151',
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
    color: '#6B7280',
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  modulesContainer: {
    paddingBottom: 20,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 160,
  },
  illustrationSection: {
    backgroundColor: '#FFE8B3',
    width: 140,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 200,
    height: 200,
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
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
    marginBottom: 4,
  },
  moduleSubtitle: {
    fontSize: 13,
    color: '#6B7280',
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
