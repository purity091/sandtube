'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserProfile, YouTubeChannel, Collaboration, ContentReview, PointsTransaction, Badge } from './types';
import { cache } from './cache';
import { 
  initialCurrentUser, 
  initialChannels, 
  initialCollaborations, 
  initialReviews, 
  initialTransactions, 
  initialBadges 
} from './mockData';

interface SanadTubeContextType {
  user: UserProfile;
  channels: YouTubeChannel[];
  activeChannel: YouTubeChannel | null;
  collaborations: Collaboration[];
  reviews: ContentReview[];
  transactions: PointsTransaction[];
  badges: Badge[];
  setActiveChannel: (channel: YouTubeChannel) => void;
  addCollaboration: (collab: Omit<Collaboration, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateCollabStatus: (id: string, status: Collaboration['status']) => void;
  addReview: (review: Omit<ContentReview, 'id' | 'createdAt' | 'status' | 'commentsCount'>) => void;
  submitReviewFeedback: (reviewId: string, feedback: { rating: number; strengths: string; improvements: string }) => void;
  connectNewChannel: (channelData: Partial<YouTubeChannel>) => void;
  refreshChannelSync: (channelId: string) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  updateChannel: (channelId: string, data: Partial<YouTubeChannel>) => void;
}

const SanadTubeContext = createContext<SanadTubeContextType | undefined>(undefined);

export const SanadTubeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialCurrentUser);
  const [channels, setChannels] = useState<YouTubeChannel[]>(initialChannels);
  const [activeChannel, setActiveChannel] = useState<YouTubeChannel | null>(initialChannels[0] || null);
  const [collaborations, setCollaborations] = useState<Collaboration[]>(initialCollaborations);
  const [reviews, setReviews] = useState<ContentReview[]>(initialReviews);
  const [transactions, setTransactions] = useState<PointsTransaction[]>(initialTransactions);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  // Load from Cache / LocalStorage in one batched frame
  useEffect(() => {
    try {
      const cached = cache.get<any>('store_snapshot');
      if (cached) {
        if (cached.user) setUser(cached.user);
        if (cached.channels?.length) {
          setChannels(cached.channels);
          setActiveChannel(cached.channels[0]);
        }
        if (cached.collabs) setCollaborations(cached.collabs);
        if (cached.reviews) setReviews(cached.reviews);
        if (cached.txs) setTransactions(cached.txs);
        return;
      }

      const savedUser = localStorage.getItem('sanadtube_user');
      const savedChannels = localStorage.getItem('sanadtube_channels');
      const savedCollabs = localStorage.getItem('sanadtube_collabs');
      const savedReviews = localStorage.getItem('sanadtube_reviews');
      const savedTxs = localStorage.getItem('sanadtube_txs');

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedChannels) {
        const parsed = JSON.parse(savedChannels);
        setChannels(parsed);
        if (parsed.length > 0) setActiveChannel(parsed[0]);
      }
      if (savedCollabs) setCollaborations(JSON.parse(savedCollabs));
      if (savedReviews) setReviews(JSON.parse(savedReviews));
      if (savedTxs) setTransactions(JSON.parse(savedTxs));
    } catch (e) {
      console.warn('Cache/Storage load error:', e);
    }
  }, []);

  // Save changes to storage & L1/L2 cache
  const saveState = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      // update cache snapshot
      cache.set(key, data, 120);
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  const addCollaboration = (collabData: Omit<Collaboration, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newCollab: Collaboration = {
      ...collabData,
      id: `collab-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newCollab, ...collaborations];
    setCollaborations(updated);
    saveState('sanadtube_collabs', updated);
  };

  const updateCollabStatus = (id: string, status: Collaboration['status']) => {
    const updated = collaborations.map(c => {
      if (c.id === id) {
        return { ...c, status, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    setCollaborations(updated);
    saveState('sanadtube_collabs', updated);

    if (status === 'completed') {
      awardPoints(50, 'collab_success', 'مكافأة إتمام وتوثيق تعاون ناجح مع صانع محتوى');
    }
  };

  const addReview = (reviewData: Omit<ContentReview, 'id' | 'createdAt' | 'status' | 'commentsCount'>) => {
    const newRev: ContentReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: 'open',
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    saveState('sanadtube_reviews', updated);
  };

  const submitReviewFeedback = (reviewId: string, feedback: { rating: number; strengths: string; improvements: string }) => {
    const updated = reviews.map(r => {
      if (r.id === reviewId) {
        return { ...r, commentsCount: r.commentsCount + 1 };
      }
      return r;
    });
    setReviews(updated);
    saveState('sanadtube_reviews', updated);

    // Reward points for giving thoughtful peer review
    awardPoints(25, 'feedback_given', 'مكافأة تقديم نقد وملاحظات بناءة لزميل في المجتمع');
  };

  const awardPoints = (amount: number, type: PointsTransaction['transactionType'], description: string) => {
    const newBalance = user.pointsBalance + amount;
    const newTx: PointsTransaction = {
      id: `tx-${Date.now()}`,
      userId: user.id,
      amount: +amount,
      balanceAfter: newBalance,
      transactionType: type,
      description,
      createdAt: new Date().toISOString(),
    };
    const updatedTxs = [newTx, ...transactions];
    const updatedUser = { ...user, pointsBalance: newBalance };

    setTransactions(updatedTxs);
    setUser(updatedUser);
    saveState('sanadtube_txs', updatedTxs);
    saveState('sanadtube_user', updatedUser);
  };

  const connectNewChannel = (channelData: Partial<YouTubeChannel>) => {
    const newChannel: YouTubeChannel = {
      id: `ch-${Date.now()}`,
      userId: user.id,
      youtubeChannelId: `UC_${Math.random().toString(36).substring(2, 9)}`,
      title: channelData.title || 'قناتي الجديدة',
      customUrl: channelData.customUrl || '@NewChannel',
      description: channelData.description || 'قناة جديدة متصلة بسندتيوب',
      thumbnailUrl: channelData.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      category: channelData.category || 'عام',
      language: 'ar',
      subscriberCount: channelData.subscriberCount || 120,
      videoCount: channelData.videoCount || 8,
      viewCount: channelData.viewCount || 5400,
      watchTimeHours: channelData.watchTimeHours || 210,
      avgViewDurationSeconds: 240,
      retentionRate: 42,
      isMonetized: false,
      yppSubscribersEligible: (channelData.subscriberCount || 120) >= 1000,
      yppWatchHoursEligible: (channelData.watchTimeHours || 210) >= 4000,
      communityGuidelinesClean: true,
      twoStepVerificationActive: true,
      isPublic: true,
      lastSyncedAt: 'الآن',
    };

    const updatedChannels = [newChannel, ...channels];
    setChannels(updatedChannels);
    setActiveChannel(newChannel);
    saveState('sanadtube_channels', updatedChannels);
    awardPoints(100, 'welcome_bonus', 'مكافأة ربط قناة يوتيوب إضافية بنجاح');
  };

  const refreshChannelSync = (channelId: string) => {
    const updated = channels.map(c => {
      if (c.id === channelId) {
        return {
          ...c,
          subscriberCount: c.subscriberCount + Math.floor(Math.random() * 5),
          viewCount: c.viewCount + Math.floor(Math.random() * 450),
          lastSyncedAt: 'الآن',
        };
      }
      return c;
    });
    setChannels(updated);
    if (activeChannel?.id === channelId) {
      setActiveChannel(updated.find(c => c.id === channelId) || null);
    }
    saveState('sanadtube_channels', updated);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      saveState('sanadtube_user', updated);
      return updated;
    });
  };

  const updateChannel = (channelId: string, data: Partial<YouTubeChannel>) => {
    setChannels(prev => {
      const updated = prev.map(ch => ch.id === channelId ? { ...ch, ...data } : ch);
      saveState('sanadtube_channels', updated);
      if (activeChannel?.id === channelId) {
        setActiveChannel({ ...activeChannel, ...data });
      }
      return updated;
    });
  };

  const contextValue = useMemo(
    () => ({
      user,
      channels,
      activeChannel,
      collaborations,
      reviews,
      transactions,
      badges,
      setActiveChannel,
      addCollaboration,
      updateCollabStatus,
      addReview,
      submitReviewFeedback,
      connectNewChannel,
      refreshChannelSync,
      updateUserProfile,
      updateChannel,
    }),
    [
      user,
      channels,
      activeChannel,
      collaborations,
      reviews,
      transactions,
      badges,
    ]
  );

  return (
    <SanadTubeContext.Provider value={contextValue}>
      {children}
    </SanadTubeContext.Provider>
  );
};

export const useSanadTube = () => {
  const context = useContext(SanadTubeContext);
  if (!context) {
    throw new Error('useSanadTube must be used within a SanadTubeProvider');
  }
  return context;
};
