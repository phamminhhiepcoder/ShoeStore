import React, { useEffect, useState } from "react";
import NavUser from "../components/NavUser";
import FooterUser from "../components/FooterUser";

const UserLayout = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
        const cssLinks = [
            "/assets/css/animate.css",
            "/assets/css/icomoon.css",
            "/assets/css/ionicons.min.css",
            "/assets/css/bootstrap.min.css",
            "/assets/css/magnific-popup.css",
            "/assets/css/flexslider.css",
            "/assets/css/owl.carousel.min.css",
            "/assets/css/owl.theme.default.min.css",
            "/assets/css/bootstrap-datepicker.css",
            "/assets/fonts/flaticon/font/flaticon.css",
            "/assets/css/style.css",
            "/assets/css/chatbot.css",
            "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700",
            "https://fonts.googleapis.com/css?family=Rokkitt:100,300,400,700",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ];

        cssLinks.forEach((href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        });

        return () => {
            document.querySelectorAll("link[rel='stylesheet']").forEach(el => el.remove());
        };
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    };

    const sendMessage = () => {
        if (!userMessage.trim()) return;

        setMessages(prev => [
            ...prev,
            { content: userMessage, type: "outgoing", time: getCurrentTime() }
        ]);

        fetch("http://localhost:3000/api/chatbot/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        })
            .then(res => res.json())
            .then(data => {
                if (data.recommendations) {
                    const cards = data.recommendations.map(p => `
    <div class="chat-product card">
        <img src="${p.image}" class="chat-product-img" />
        <div class="card-body">
            <a href="${p.link}" target="_blank" class="chat-product-name">
                ${p.name}
            </a>
            <div class="chat-product-price">
                ${p.price.toLocaleString()} đ
            </div>
        </div>
    </div>
`).join("");




                    setMessages(prev => [
                        ...prev,
                        {
                            content: cards,
                            type: "received",
                            time: getCurrentTime(),
                            isHtml: true
                        }
                    ]);
                }
            });

        setUserMessage("");
    };

    const deleteLastChat = () => {
        setMessages(prev => prev.slice(0, -2));
    };

    return (
        <div>
            <div id="page">
                <NavUser />
                {children}
                <FooterUser />
            </div>

            {isChatOpen && (
                <div className="chat-widget">
                    <div className="chat-header">
                        <div className="avatar"></div>
                        <div className="header-text">
                            <strong>Tư vấn Chatbot</strong><br />
                            Nhập đúng format để được gợi ý
                        </div>
                        <button className="close-chat" onClick={() => setIsChatOpen(false)}>×</button>
                    </div>

                    <div className="chat-hint">
                        💡 <strong>Nhập theo format:</strong><br />
                        Giới tính: nữ; Size: 40; Phong cách: năng động; Mục đích: đi chơi; Màu: trắng, hồng
                        <div
                            className="paste-format"
                            onClick={() =>
                                setUserMessage(
                                    "Giới tính: nữ; Size: 40; Phong cách: năng động; Mục đích: đi chơi; Màu: trắng, hồng"
                                )
                            }
                        >
                            Dán mẫu
                        </div>
                    </div>

                    <div className="chat-body">
                        {messages.map((msg, i) => (
                            <div className={msg.type === "outgoing" ? "outgoing-msg" : "received-msg"}>
                                {msg.isHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                                ) : (
                                    <pre>{msg.content}</pre>
                                )}
                                <span className="time">{msg.time}</span>
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="send-btn" onClick={sendMessage}>📨</button>
                        <button className="delete-btn" onClick={deleteLastChat}>🗑️</button>
                    </div>
                </div>
            )}

            {!isChatOpen && (
                <div className="chat-bubble" onClick={() => setIsChatOpen(true)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1827/1827392.png" alt="Chat" />
                    <span>Cần hỗ trợ?</span>
                </div>
            )}
        </div>
    );
};

export default UserLayout;
