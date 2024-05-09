import { useAuthContext } from '../contexts/AuthContext'
import './ProfilePage.css'; 
import userImage from '../assets/userImage.png'

const ProfilePage = () => {
  const {userDetails } = useAuthContext();
  const { email, name, role } = userDetails;

  return (
    <div className="user-details-container">
      <div className="user-avatar">
        <img src={userImage} alt="Profile" />
      </div>
      <div className="user-info">
        <div className="detail" >
          <span className="label">Email:</span>
          <span className="value">{email}</span>
        </div>
        <div className="detail">
          <span className="label">Name:</span>
          <span className="value">{name}</span>
        </div>
        <div className="detail">
          <span className="label">Role:</span>
          <span className="value">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
