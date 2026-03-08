import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Send, Shield, AlertTriangle, Paperclip, Smile, MoreVertical, Check, CheckCheck
} from 'lucide-react';

export const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [conversations] = useState(mockConversations);
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: 'Just now',
      status: 'sent' as const,
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' as const } : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)]">
        {/* Safety Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white dark:text-white light:text-zinc-950">
                Secure Chat - You're Protected
              </h3>
              <p className="text-xs text-zinc-400">
                All conversations are monitored for safety. Report any inappropriate behavior immediately.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-blue-600/30 text-blue-300 text-sm font-semibold hover:bg-blue-600/40"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
              Messages
            </h3>

            <div className="space-y-3">
              {conversations.map((convo) => (
                <motion.div
                  key={convo.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedConvo(convo)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    selectedConvo.id === convo.id
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                      : 'bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                        {convo.initials}
                      </div>
                      {convo.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-zinc-950 dark:border-zinc-950 light:border-white" />
                      )}
                      {convo.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center border-2 border-zinc-950 dark:border-zinc-950 light:border-white">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white dark:text-white light:text-zinc-950 truncate">
                          {convo.name}
                        </h4>
                        <span className="text-xs text-zinc-500">{convo.time}</span>
                      </div>
                      <p className="text-sm text-zinc-400 truncate">{convo.lastMessage}</p>
                      {convo.unread > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2 inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs text-white font-semibold"
                        >
                          {convo.unread} new
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-zinc-900/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                      {selectedConvo.initials}
                    </div>
                    {selectedConvo.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-zinc-950 dark:border-zinc-950 light:border-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white dark:text-white light:text-zinc-950">
                        {selectedConvo.name}
                      </h3>
                      {selectedConvo.verified && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400">
                      {selectedConvo.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-red-600/20 text-red-300 hover:bg-red-600/30"
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md p-4 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 dark:bg-white/10 light:bg-zinc-900/10 text-white dark:text-white light:text-zinc-950'
                      }`}
                    >
                      <p className="mb-2">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 text-xs opacity-70">
                        <span>{msg.time}</span>
                        {msg.sender === 'me' && (
                          <div>
                            {msg.status === 'sent' && <Check className="w-3 h-3" />}
                            {msg.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                            {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-400" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-white/10 dark:border-white/10 light:border-zinc-900/10">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </motion.button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 border border-white/10 dark:border-white/10 light:border-zinc-900/10 text-white dark:text-white light:text-zinc-950 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 flex items-center gap-2 text-xs text-zinc-500"
              >
                <Shield className="w-3 h-3" />
                <span>This conversation is monitored for safety and compliance</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const mockConversations = [
  {
    id: 1,
    name: 'Director Sarah Wilson',
    initials: 'SW',
    lastMessage: 'Looking forward to working with you!',
    time: '2m ago',
    unread: 2,
    online: true,
    verified: true,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    initials: 'MC',
    lastMessage: 'Can we schedule a callback?',
    time: '1h ago',
    unread: 0,
    online: false,
    verified: true,
  },
  {
    id: 3,
    name: 'Casting Director Jane',
    initials: 'JD',
    lastMessage: 'Great audition video!',
    time: '3h ago',
    unread: 1,
    online: true,
    verified: true,
  },
];

const mockMessages = [
  {
    id: 1,
    text: 'Hi! Congratulations on being selected for the role!',
    sender: 'them',
    time: '10:30 AM',
    status: 'read' as const,
  },
  {
    id: 2,
    text: 'Thank you so much! I\'m really excited about this opportunity.',
    sender: 'me',
    time: '10:32 AM',
    status: 'read' as const,
  },
  {
    id: 3,
    text: 'We\'d like to schedule a chemistry read next week. Would Monday at 2 PM work for you?',
    sender: 'them',
    time: '10:35 AM',
    status: 'read' as const,
  },
  {
    id: 4,
    text: 'Monday at 2 PM works perfectly! Should I prepare anything specific?',
    sender: 'me',
    time: '10:37 AM',
    status: 'delivered' as const,
  },
];
