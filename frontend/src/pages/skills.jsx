import React, { useEffect, useRef, useState } from "react";
import MenuHeader from "../components/MenuHeader";
import ProfileSidebar, { parseJwt } from "../components/ProfileSidebar";
import ProfileCard from "../components/profile";
import "../style/skills.css";
import Chat from "./Chat";
import { getMentors } from "../services/userApi";
import SendRequestModal from "../components/SendRequestModal";
import { sendSkillRequest } from "../services/exchangeApi";

const Skills = () => {
  const scrollRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const [requestUser, setRequestUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setActiveUser(parseJwt(token));
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data = await getMentors();
        const formatted = data.map((u, index) => ({
          id: u.id,
          name: u.username || "Unknown",
          email: u.email,
          points: u.points || 0,
          avatar: `https://i.pravatar.cc/200?img=${index + 3}`,
          skills: u.skills || []
        }));

        setUsers(formatted);
        setFilteredMentors(formatted);
      } catch (err) {
        console.error("❌ Error loading mentors:", err);
      }
    };

    fetchMentors();
  }, []);

  const handleFilter = () => {
    let filtered = [...users];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        m =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(m =>
        m.skills?.some(skill =>
          skill.name.toLowerCase() === category.toLowerCase()
        )
      );
    }

    setFilteredMentors(filtered);
  };

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });

  const handleSendRequest = async (skill, message) => {
    try {
      await sendSkillRequest(requestUser.id, skill, message);
      alert("✅ Request sent!");
      setRequestUser(null);
    } catch (err) {
      alert("❌ Failed to send request");
      console.error(err);
    }
  };

  return (
    <div>
      <MenuHeader onProfileToggle={() => setProfileOpen(true)} />

      {profileOpen && (
        <ProfileSidebar active={profileOpen} onClose={() => setProfileOpen(false)} />
      )}

      <div className="skills-main">
        <div className="filter-bar">
          <h2>🎯 Find Mentors</h2>

          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All categories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
            </select>

            <button className="filter-btn" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={scrollLeft}>
            ◀
          </button>

          <div className="profiles-carousel" ref={scrollRef}>
            {filteredMentors
              .filter((mentor) => mentor.email !== activeUser?.sub)
              .map((user, index) => (
                <ProfileCard
                  key={index}
                  user={user}
                  onChatOpen={setActiveChatUser}
                  onSendRequest={() => setRequestUser(user)} 
                />
              ))}
          </div>

          <button className="carousel-btn right" onClick={scrollRight}>
            ▶
          </button>
        </div>
      </div>

      {/* Chat ✅ */}
      {activeChatUser && (
        <div className="chat-popup">
          <div className="chat-popup-header">
            <h3>Chat with {activeChatUser.name}</h3>
            <button onClick={() => setActiveChatUser(null)}>✖</button>
          </div>
          <Chat recipient={activeChatUser.name} />
        </div>
      )}

      
      {requestUser && (
        <SendRequestModal
          user={requestUser}
          onClose={() => setRequestUser(null)}
          onSend={handleSendRequest}
        />
      )}
    </div>
  );
};

export default Skills;
