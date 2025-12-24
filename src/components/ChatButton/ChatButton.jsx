// components/ChatButton/ChatButton.jsx
import styles from './ChatButton.module.scss';
import chatIcon from '../../assets/chat-icon.png'; // иконка чата
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {
  const { auth } = useContext(AuthContext);
  const token = auth?.token;
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat');
  };

  if (!token) return null;

  return (
    <button className={styles.chatButton} onClick={handleChatClick}>
      <img src={chatIcon} alt="Чат" className={styles.chatIcon} />
      <span className={styles.chatBadge}>3</span> {/* неактивные уведомления */}
    </button>
  );
};

export default ChatButton;
