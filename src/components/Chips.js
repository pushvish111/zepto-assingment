// HomeScreen.js
import React, { useState, useEffect } from 'react';
import './Chips.css';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=50&inc=name,picture,dob,location');
        const data = await response.json();
        setUsers(data.results);
        setFilteredUsers(data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setFilteredUsers((prevFilteredUsers) =>
      prevFilteredUsers.filter((filteredUser) => filteredUser !== user)
    );
    setDropdownOpen(false);
  };


  const handleUserRemove = (index) => {
    const removedUser = selectedUsers[index];
    const updatedUsers = selectedUsers.filter((user, i) => i !== index);
    setSelectedUsers(updatedUsers);
    updateFilteredUsers(removedUser);
  };

  const updateFilteredUsers = (removedUser) => {
    setFilteredUsers((prevFilteredUsers) => [
      ...prevFilteredUsers,
      { ...removedUser, selected: true },
    ]);
  };

  return (
    <div className="auto-complete-container">
      <h1 className="auto-complete-header">PICK USERS</h1>
      <div className="selected-users-container">
        {selectedUsers.map((selectedUser, index) => (
          <div key={index} className="selected-user">
            <img
              src={selectedUser.picture.thumbnail}
              alt="User Thumbnail"
              className="user-thumbnail"
            />
            <span>
              {`${selectedUser.name.first} ${selectedUser.name.last}`}
            </span>
            <span
              className="remove-icon"
              onClick={() => handleUserRemove(index)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div className="user-input-container">
        <input
          type="text"
          placeholder="Select a user..."
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="user-input"
        />
        <ul className="dropdown">
          {filteredUsers.map((user, index) => (
            <li key={index} onClick={() => handleUserSelect(user)}>
              <img
                src={user.picture.thumbnail}
                alt="User Thumbnail"
              />
              <div>
                <span>{`${user.name.first} ${user.name.last}`}</span>
                <div>
                  <div>{`Age: ${user.dob.age}`}</div>
                  <div>{`Location: ${user.location.city}, ${user.location.country}`}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;
