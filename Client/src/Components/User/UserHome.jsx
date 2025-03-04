import '../../assets/styles/UserHome.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Camera } from '../../assets/svg/svg';
import { editProfile } from '../../redux/User/userThunk';

function UserHome() {
  const userData = useSelector((state) => state.user.userData);
  const [username, setUsername] = useState('');
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const imageIcon = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setEdit(false)
  }, [userData])


  const saveData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userData._id);
    formData.append('username', username);
    if (image) {
      formData.append('image', image);
    }
    dispatch(editProfile({ formData, username, image, toast }));
  };

  return (
    <div>
      <ToastContainer />
      <div className="profile-div">
        <div className="profile-card">
          {edit ? (
            <>
              <form className="profileform" onSubmit={saveData}>
                <div
                  className="circle"
                  style={
                    image
                      ? { backgroundImage: `url(${URL.createObjectURL(image)})` }
                      : { backgroundImage: `url(../src/assets/images/${userData.profileURL})` }
                  }
                >
                  <input
                    type="file"
                    hidden
                    ref={imageIcon}
                    onChange={(e) => setImage(e.target.files[0])}
                    accept=".png, .jpeg, .jpg"
                  />
                  <div onClick={() => imageIcon.current.click()}>
                    <Camera />
                  </div>
                </div>
                <input
                  type="text"
                  className="profileinput"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={userData.username}
                />
                <div className="btn-div">
                  <button type="button" className="btn" onClick={() => { setEdit(false); setImage(null); }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn">
                    Save
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="image">
                <img src={`../src/assets/images/${userData.profileURL}`} />
              </div>
              <div className="text-left">
                <p><span>Name: </span>{userData.username}</p>
                <p><span>Email: </span>{userData.email}</p>
              </div>
              <button className="btn" onClick={() => { setEdit(true); setUsername(userData.username); }}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHome
