import React from 'react';
import '../Style/Tabs.css';

function Tabs({ tabs, activeTab, setActiveTab }) {
    const handleTabClick = (index) => {
        setActiveTab(index); // Update the active tab in the parent component
    };

    return (
        <div className="tabs-container">
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`tab ${activeTab === index ? 'active' : ''}`}
                    onClick={() => handleTabClick(index)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
}

export default Tabs;
