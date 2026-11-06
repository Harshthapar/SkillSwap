import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CURRENT_USER,
  INITIAL_STUDENTS,
  INITIAL_EXCHANGES,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const SkillSwapContext = createContext();

export function SkillSwapProvider({ children }) {
  // 1. Current user profile
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('skillswap_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // 2. Students & Skill offers pool
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('skillswap_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // 3. Exchanges
  const [exchanges, setExchanges] = useState(() => {
    const saved = localStorage.getItem('skillswap_exchanges');
    return saved ? JSON.parse(saved) : INITIAL_EXCHANGES;
  });

  // 4. Wallet Transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('skillswap_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // 5. Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('skillswap_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // 6. Toast System
  const [toasts, setToasts] = useState([]);

  // 7. Modal management
  const [activeModal, setActiveModal] = useState(null); // 'offer' | 'exchange' | null
  const [exchangePeer, setExchangePeer] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('skillswap_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('skillswap_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('skillswap_exchanges', JSON.stringify(exchanges));
  }, [exchanges]);

  useEffect(() => {
    localStorage.setItem('skillswap_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('skillswap_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Helper: Trigger Toast
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Action: Add Skill Offer
  const addSkillOffer = (offerData) => {
    // Add to user skills offered
    const newSkill = {
      name: offerData.skillName,
      category: offerData.category,
      level: offerData.experienceLevel,
      desc: offerData.description || offerData.canTeach
    };

    const newWanted = offerData.wantToLearn ? {
      name: offerData.wantToLearn,
      category: "General",
      level: "Beginner",
      desc: "Goal: acquire practical foundation"
    } : null;

    const updatedUser = {
      ...currentUser,
      skillsOffered: [...currentUser.skillsOffered, newSkill],
      skillsWanted: newWanted ? [...currentUser.skillsWanted, newWanted] : currentUser.skillsWanted,
      learningPreferences: {
        ...currentUser.learningPreferences,
        format: offerData.learningMode || currentUser.learningPreferences.format,
        availability: offerData.availability || currentUser.learningPreferences.availability
      }
    };

    setCurrentUser(updatedUser);

    // Also inject into students list or update existing
    showToast(`Skill Offer "${offerData.skillName}" created successfully!`, 'success');

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Skill Offer Live',
      message: `Your skill offer for "${offerData.skillName}" is now visible to peer learners.`,
      time: 'Just now',
      read: false,
      type: 'offer'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Action: Send Exchange Request
  const createExchangeRequest = ({ peer, teachSkill, learnSkill, format, duration, notes }) => {
    const newExchange = {
      id: `exc-${Date.now()}`,
      partnerId: peer.id,
      partnerName: peer.name,
      partnerAvatar: peer.avatar,
      department: peer.department,
      skillTeaching: teachSkill,
      skillLearning: learnSkill,
      status: 'Pending',
      duration: duration || '60 mins',
      learningFormat: format || peer.learningPreferences?.format || 'Hybrid',
      date: 'Next Scheduled Session',
      timestamp: Date.now(),
      creditsValue: duration === '30 mins' ? 10 : 20,
      notes: notes || 'Excited to collaborate on peer skill growth!'
    };

    setExchanges(prev => [newExchange, ...prev]);
    showToast(`Exchange request sent to ${peer.name}!`, 'success');

    // Notification
    const notif = {
      id: `notif-${Date.now()}`,
      title: 'Exchange Proposal Sent',
      message: `You proposed a swap (${teachSkill} ↔ ${learnSkill}) with ${peer.name}.`,
      time: 'Just now',
      read: false,
      type: 'exchange'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Action: Update Exchange Status
  const updateExchangeStatus = (exchangeId, newStatus) => {
    setExchanges(prev => prev.map(exc => {
      if (exc.id === exchangeId) {
        return { ...exc, status: newStatus };
      }
      return exc;
    }));

    const targetExc = exchanges.find(e => e.id === exchangeId);
    const partnerName = targetExc ? targetExc.partnerName : 'Peer';

    if (newStatus === 'Accepted') {
      showToast(`Exchange with ${partnerName} marked as Accepted!`, 'success');
      setNotifications(prev => [{
        id: `notif-${Date.now()}`,
        title: 'Exchange Confirmed',
        message: `Your exchange session with ${partnerName} is now confirmed.`,
        time: 'Just now',
        read: false,
        type: 'accepted'
      }, ...prev]);
    } else if (newStatus === 'Completed') {
      // Award credits!
      const creditsGained = targetExc ? (targetExc.creditsValue || 20) : 20;

      // Update User credits
      setCurrentUser(prev => ({
        ...prev,
        skillCredits: prev.skillCredits + creditsGained,
        completedExchanges: (prev.completedExchanges || 0) + 1
      }));

      // Add wallet transaction
      const newTx = {
        id: `tx-${Date.now()}`,
        type: 'earned',
        amount: creditsGained,
        description: `Completed peer teaching session with ${partnerName}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: Date.now()
      };
      setTransactions(prev => [newTx, ...prev]);

      showToast(`Session completed! You earned +${creditsGained} Skill Credits!`, 'wallet');

      setNotifications(prev => [{
        id: `notif-${Date.now()}`,
        title: 'Credits Credited',
        message: `+${creditsGained} Skill Credits have been deposited into your Skill Wallet.`,
        time: 'Just now',
        read: false,
        type: 'wallet'
      }, ...prev]);
    } else if (newStatus === 'Rejected') {
      showToast(`Exchange with ${partnerName} was declined.`, 'info');
    }
  };

  // Action: Update User Profile
  const updateUserProfile = (updatedProfile) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
    showToast('Profile updated successfully!', 'success');
  };

  // Mark all notifications as read
  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Open Connect / Exchange Modal
  const openExchangeModal = (peer) => {
    setExchangePeer(peer);
    setActiveModal('exchange');
  };

  const closeModals = () => {
    setActiveModal(null);
    setExchangePeer(null);
  };

  return (
    <SkillSwapContext.Provider value={{
      currentUser,
      students,
      exchanges,
      transactions,
      notifications,
      toasts,
      activeModal,
      exchangePeer,
      showToast,
      removeToast,
      addSkillOffer,
      createExchangeRequest,
      updateExchangeStatus,
      updateUserProfile,
      markNotificationsAsRead,
      openExchangeModal,
      setActiveModal,
      closeModals
    }}>
      {children}
    </SkillSwapContext.Provider>
  );
}

export function useSkillSwap() {
  return useContext(SkillSwapContext);
}

