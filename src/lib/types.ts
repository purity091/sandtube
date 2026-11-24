export type UserRole = 
  | 'guest' 
  | 'user' 
  | 'creator' 
  | 'pro_creator' 
  | 'moderator' 
  | 'support' 
  | 'admin' 
  | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  country: string;
  role: UserRole;
  pointsBalance: number;
  level: number;
  tier: 'Free' | 'Starter' | 'Pro' | 'Creator';
  isVerified: boolean;
  createdAt: string;
}

export interface YouTubeChannel {
  id: string;
  userId: string;
  youtubeChannelId: string;
  title: string;
  customUrl?: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  category: string;
  language: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  watchTimeHours: number;
  avgViewDurationSeconds: number;
  retentionRate: number;
  isMonetized: boolean;
  yppSubscribersEligible: boolean;
  yppWatchHoursEligible: boolean;
  communityGuidelinesClean: boolean;
  twoStepVerificationActive: boolean;
  isPublic: boolean;
  lastSyncedAt: string;
}

export type CollabType = 
  | 'joint_video' 
  | 'guest_appearance' 
  | 'podcast_interview' 
  | 'cross_promotion' 
  | 'skill_exchange';

export type CollabStatus = 
  | 'pending' 
  | 'accepted' 
  | 'in_progress' 
  | 'completed' 
  | 'declined' 
  | 'cancelled';

export interface Collaboration {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterChannelTitle: string;
  requesterChannelAvatar: string;
  targetId: string;
  targetChannelTitle: string;
  targetChannelAvatar: string;
  collabType: CollabType;
  title: string;
  description: string;
  targetAudience: string;
  status: CollabStatus;
  createdAt: string;
  updatedAt: string;
}

export type ReviewType = 'thumbnail' | 'title_hook' | 'video_intro' | 'description_seo';

export interface ContentReview {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  channelTitle: string;
  title: string;
  reviewType: ReviewType;
  contentUrl?: string;
  thumbnailPreviewUrl?: string;
  notes: string;
  status: 'open' | 'completed' | 'closed';
  pointsReward: number;
  commentsCount: number;
  createdAt: string;
}

export interface ReviewFeedback {
  id: string;
  reviewId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  strengths: string;
  improvements: string;
  actionableTip: string;
  pointsAwarded: number;
  createdAt: string;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  amount: number;
  balanceAfter: number;
  transactionType: 
    | 'review_completed' 
    | 'feedback_given' 
    | 'collab_success' 
    | 'streak_bonus' 
    | 'review_requested' 
    | 'admin_adjustment' 
    | 'welcome_bonus';
  description: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  titleAr: string;
  descriptionAr: string;
  iconName: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelId: string;
  channelTitle: string;
  channelAvatar: string;
  channelVerified: boolean;
  views: number;
  viewsFormatted: string;
  publishedAt: string;
  duration: string;
  category: string;
  isShort?: boolean;
  likesCount?: string;
  isLive?: boolean;
  badgeText?: string;
  description?: string;
}

