import React, { useState, useEffect, useContext } from 'react';
import styles from './Chat.module.scss';
import AuthContext from '../../context/AuthProvider';

const API_BASE = 'https://recipes-api.poma.dev';

const MOCK_USERS = [
  { id: null, name: 'Групповой чат' },
  { id: 19, name: 'Админ' }, // временно жёстко id 19
];

const Chat = ({ isAdmin = false }) => {
  const { auth } = useContext(AuthContext);
  const token = auth?.token;
  const username = auth?.user;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState(
    isAdmin ? MOCK_USERS[0] : MOCK_USERS[1]
  );
  const [isLoading, setIsLoading] = useState(false);

  // ===== Загрузка истории =====
  const fetchHistory = async (chat) => {
    if (!token || !chat) return;

    let endpoint;
    if (chat.id === null) {
      endpoint = `${API_BASE}/chat/public`;
    } else {
      endpoint = `${API_BASE}/chat/private/${chat.id}`;
    }

    console.log('fetchHistory endpoint =', endpoint);

    try {
      setIsLoading(true);
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('HTTP error', response.status, text);
        throw new Error(`HTTP ${response.status}`);
      }

      const history = await response.json();

      const formattedHistory = history.map((msg) => ({
        id: msg.id,
        text: msg.content,
        sender: msg.senderUsername || msg.sender,
        isOutgoing: (msg.senderUsername || msg.sender) === username,
        timestamp: new Date(msg.sentAt).toLocaleTimeString().slice(0, 5),
      }));

      setMessages(formattedHistory);
    } catch (error) {
      console.error('Не удалось загрузить историю:', error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(activeChat);
  }, [activeChat, token]);

  // ===== Отправка сообщения через POST /chat =====
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage.trim() || !token) return;

    const isPublic = activeChat.id === null;

    const body = {
      content: newMessage.trim(),
      ...(isPublic ? {} : { recipientId: activeChat.id }), // 19 для приватного
    };

    console.log('POST /chat body =', body);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Ошибка отправки', response.status, text);
        return;
      }

      // Оптимистично добавляем своё сообщение
      const outgoingMessage = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'Я',
        isOutgoing: true,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
      };
      setMessages((prev) => [...prev, outgoingMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Сбой при отправке сообщения', error);
    }
  };

  const selectChat = (chat) => {
    setActiveChat(chat);
  };

  const chatAreaContent = (
    <main className={styles.chatArea}>
      <div className={styles.chatArea__messages}>
        {isLoading ? (
          <div className={styles.noMessages}>Загрузка...</div>
        ) : messages.length === 0 ? (
          <div className={styles.noMessages}>Нет сообщений</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.isOutgoing ? styles.message_outgoing : styles.message_incoming
              }`}
            >
              <div className={styles.message__bubble}>
                {!msg.isOutgoing && (
                  <span className={styles.message__sender}>{msg.sender}</span>
                )}
                <p className={styles.message__text}>{msg.text}</p>
                <span className={styles.message__timestamp}>{msg.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <form className={styles.chatArea__form} onSubmit={handleSendMessage}>
        <input
          type="text"
          className={styles.chatArea__input}
          placeholder="Написать сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className={styles.chatArea__sendBtn}
          disabled={!newMessage.trim()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </main>
  );

  const adminView = (
    <div className={`${styles.chatContainer} ${styles.adminView}`}>
      <h2 className={styles.chatPage__title}>Чат с клиентами</h2>
      <div className={styles.chatWindow}>
        <aside className={styles.chatSidebar}>
          <h3 className={styles.chatSidebar__title}>Все чаты</h3>
          <ul className={styles.chatSidebar__list}>
            {MOCK_USERS.map((user) => (
              <li
                key={user.id ?? 'public'}
                className={`${styles.chatSidebar__item} ${
                  activeChat.id === user.id
                    ? styles.chatSidebar__item_active
                    : ''
                }`}
                onClick={() => selectChat(user)}
              >
                <img
                  src={`https://via.placeholder.com/40?text=${user.name.charAt(
                    0
                  )}`}
                  alt="Аватар"
                  className={styles.chatSidebar__avatar}
                />
                <span className={styles.chatSidebar__name}>{user.name}</span>
              </li>
            ))}
          </ul>
        </aside>
          {chatAreaContent}
      </div>
    </div>
  );

  const userView = (
    <div className={`${styles.chatContainer} ${styles.userView}`}>
      <h2 className={styles.chatPage__title}>Чат с поддержкой</h2>
      <div className={styles.chatWindow}>{chatAreaContent}</div>
    </div>
  );

  if (!token) {
    return (
      <div className={styles.chatPage}>
        <h2>Необходима авторизация</h2>
      </div>
    );
  }

  return (
    <section className={styles.chatPage}>
      {isAdmin ? adminView : userView}
    </section>
  );
};

export default Chat;
